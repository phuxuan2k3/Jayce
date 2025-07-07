import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AnswerType = {
	type: "MCQ";
	chosenOption: number;
} | {
	type: "LONG_ANSWER";
	answer: string;
};

type QuestionDoState = {
	answer: AnswerType | null;
	isFlagged: boolean;
	isSynced: boolean;
};

type TestDoState = {
	attempts: {
		[id: string]: {
			testId: string;
			minutesToAnswer: number;
			createdAt: string;
			currentQuestionIndex: number;
			indexedQuestionIds: number[];
			questions: {
				[id: number]: QuestionDoState;
			};
		};
	};
	errors: string[];
}

const initialState: TestDoState = {
	attempts: {},
	errors: [],
};

const testDoSlice = createSlice({
	name: 'testDo',
	initialState,
	reducers: {
		loadAttempt: (state, action: PayloadAction<{
			attemptId: string;
			testId: string;
			createdAt: string;
			minutesToAnswer: number;
			questionIds: number[];
			answers: {
				questionId: number;
				answer: AnswerType | null;
			}[];
		}>) => {
			const {
				testId,
				createdAt,
				minutesToAnswer,
				attemptId,
				questionIds,
				answers,
			} = action.payload;
			if (questionIds.length === 0) {
				state.errors.push(`Attempt ${attemptId} has no questions.`);
				return;
			}
			const answersMap = new Map<number, AnswerType | null>();
			for (const { questionId, answer } of answers) {
				answersMap.set(questionId, answer);
			}
			state.attempts[attemptId] = {
				testId,
				createdAt,
				minutesToAnswer,
				currentQuestionIndex: 0,
				indexedQuestionIds: questionIds,
				questions: questionIds.reduce((acc, id) => {
					acc[id] = {
						answer: answersMap.get(id) || null,
						isFlagged: false,
						isSynced: true,
					};
					return acc;
				}, {} as Record<number, QuestionDoState>),
			};
		},

		answer: (state, action: PayloadAction<{
			attemptId: string;
			answer: AnswerType | null;
		}>) => {
			const { attemptId, answer } = action.payload;
			const attempt = state.attempts[attemptId];
			if (attempt) {
				const questionId = attempt.indexedQuestionIds[attempt.currentQuestionIndex];
				if (questionId !== undefined) {
					attempt.questions[questionId].answer = answer;
					attempt.questions[questionId].isSynced = false; // Mark as unsynced
				}
			}
		},

		toggleFlagQuestion: (state, action: PayloadAction<{
			attemptId: string;
		}>) => {
			const { attemptId } = action.payload;
			const attempt = state.attempts[attemptId];
			if (attempt) {
				const questionId = attempt.indexedQuestionIds[attempt.currentQuestionIndex];
				if (questionId !== undefined) {
					attempt.questions[questionId].isFlagged = !attempt.questions[questionId].isFlagged;
				}
			}
		},

		setCurrentQuestionIndex: (state, action: PayloadAction<{
			attemptId: string;
			index: number;
		}>) => {
			const { attemptId, index } = action.payload;
			if (
				index < 0 ||
				index >= Object.keys(state.attempts[attemptId]?.questions || {}).length
			) {
				state.errors.push(`Invalid question index ${index} for attempt ${attemptId}.`);
				return;
			}
			const attempt = state.attempts[attemptId];
			if (attempt) {
				attempt.currentQuestionIndex = index;
			}
		},

		submittedAnswersToServer: (state, action: PayloadAction<{
			attemptId: string;
			questionIds: number[];
		}>) => {
			const { attemptId, questionIds } = action.payload;
			const attempt = state.attempts[attemptId];
			if (attempt) {
				for (const questionId of questionIds) {
					if (attempt.questions[questionId]) {
						attempt.questions[questionId].isSynced = true; // Mark as synced
					}
				}
			}
		},

		clearAttempt: (state, action: PayloadAction<string>) => {
			const attemptId = action.payload;
			if (state.attempts[attemptId]) {
				delete state.attempts[attemptId];
			}
		},

		clear: (state) => {
			state.attempts = {};
			state.errors = [];
		}
	},
	selectors: {
		selectAttempt: (state: TestDoState, attemptId: string) => {
			return state.attempts[attemptId] || null;
		},
		selectPendingQuestions: (state: TestDoState, attemptId: string) => {
			const attempt = state.attempts[attemptId];
			if (!attempt) return [];
			return attempt.indexedQuestionIds
				.map(id => attempt.questions[id])
				.filter(question => question && question.isSynced === false);
		},
		selectCurrentQuestion: (state: TestDoState, attemptId: string) => {
			const attempt = state.attempts[attemptId];
			if (!attempt) return null;
			const questionId = attempt.indexedQuestionIds[attempt.currentQuestionIndex];
			return attempt.questions[questionId] || null;
		},
	}
});

export default testDoSlice;