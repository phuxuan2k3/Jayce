import { AnswerCoreSchema } from "../../../../../../../features/tests/api/test.api-gen-v2";
import { QuestionDoState, TestDoServerData } from "./types";

export type TestDoState = {
	isInitialized: boolean;
	questionsDo: QuestionDoState[];
	currentIndex: number;
}

export const initialState: TestDoState = {
	isInitialized: false,
	questionsDo: [],
	currentIndex: 0,
};

function initializeQuestionsDo(server: TestDoServerData): TestDoState {
	return {
		isInitialized: true,
		questionsDo: server.questions.map((q, index) => ({
			question: q,
			index,
			isCurrent: index === 0,
			isFlagged: false,
			answer: server.attemptAnswers.find((a) => a.questionId === q.id)?.child || null,
		})),
		currentIndex: 0,
	};
}

type Actions =
	| { type: "INITIALIZE_STATE"; payload: TestDoServerData }
	| { type: "NEXT_INDEX"; payload: null }
	| { type: "PREVIOUS_INDEX"; payload: null }
	| { type: "SET_INDEX"; payload: number }
	| { type: "SET_FLAG"; payload: boolean }
	| { type: "UPDATE_ANSWERS"; payload: AnswerCoreSchema[] }
	;

export function testDoReducer(state: TestDoState, action: Actions): TestDoState {
	switch (action.type) {
		case "INITIALIZE_STATE":
			if (state.isInitialized) {
				return state; // Prevent re-initialization
			}
			return initializeQuestionsDo(action.payload);
		case "NEXT_INDEX":
			return {
				...state,
				currentIndex: Math.min(state.currentIndex + 1, state.questionsDo.length - 1),
			};
		case "PREVIOUS_INDEX":
			return {
				...state,
				currentIndex: Math.max(state.currentIndex - 1, 0),
			};
		case "SET_INDEX":
			return {
				...state,
				currentIndex: action.payload,
			};
		case "SET_FLAG":
			const updatedQuestions = state.questionsDo.map((q, index) => {
				if (index === state.currentIndex) {
					return { ...q, isFlagged: action.payload };
				}
				return q;
			});
			return {
				...state,
				questionsDo: updatedQuestions,
			};

		case "UPDATE_ANSWERS":
			if (!state.isInitialized) {
				return state; // Prevent updates if not initialized
			}
			const answersOfQuestions = new Map<number, AnswerCoreSchema>();
			action.payload.forEach((answer) => {
				answersOfQuestions.set(answer.questionId, answer);
			});
			const updatedQuestionsWithAnswers = state.questionsDo.map((q) => {
				const answer = answersOfQuestions.get(q.question.id);
				return {
					...q,
					answer: answer ? answer.child : null,
				};
			});
			return {
				...state,
				questionsDo: updatedQuestionsWithAnswers,
			};

		default:
			throw new Error("Unknown action type");
	}
}