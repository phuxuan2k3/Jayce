import { QuestionDoState, TestDoServerData } from "./types";

export type TestDoState = {
	questionsDo: QuestionDoState[];
	currentIndex: number;
}

export const initialState: TestDoState = {
	questionsDo: [],
	currentIndex: 0,
};

function initializeQuestionsDo(server: TestDoServerData): TestDoState {
	return {
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
	;

export function testDoReducer(state: TestDoState, action: Actions): TestDoState {
	switch (action.type) {
		case "INITIALIZE_STATE":
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

		default:
			throw new Error("Unknown action type");
	}
}