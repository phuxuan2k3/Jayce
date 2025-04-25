import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetCandidateCurrentAttemptDoApiResponse } from '../api/test.api-gen';

export interface TestState {
	currentAttempt: {
		currentQuestionIndex: number;
		questionById: {
			[questionId: number]: {
				index: number;
				isFlagged: boolean;
			};
		};
		questionIds: number[];
	} | null;
}

const initialState: TestState = {
	currentAttempt: null,
};

const testSlice = createSlice({
	name: 'test',
	initialState,
	reducers: {
		initialize: (state, action: PayloadAction<{
			questions: GetCandidateCurrentAttemptDoApiResponse['questions'];
		}>) => {
			const { questions } = action.payload;
			state.currentAttempt = {
				currentQuestionIndex: state.currentAttempt?.currentQuestionIndex ?? 0,
				questionById: questions.map((q, index) => ({
					[q.id]: {
						index,
						isFlagged: false,
					},
				})).reduce((acc, question) => ({ ...acc, ...question }), {}),
				questionIds: questions.map((q) => q.id),
			};
		},
		endTest: (state) => {
			state.currentAttempt = null;
		},
		toggleFlagCurrentQuestion: (state) => {
			if (!state.currentAttempt) return;
			const currentQuestionIndex = state.currentAttempt.currentQuestionIndex;
			const currentQuestionId = state.currentAttempt.questionIds[currentQuestionIndex];
			const currentQuestion = state.currentAttempt.questionById[currentQuestionId];
			if (!currentQuestion) return;
			currentQuestion.isFlagged = !currentQuestion.isFlagged;
		},
		setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
			if (!state.currentAttempt) return;
			if (
				action.payload < 0 ||
				action.payload >= state.currentAttempt.questionIds.length
			) {
				return;
			}
			state.currentAttempt.currentQuestionIndex = action.payload;
		},
	},
	selectors: {
		selectHasCurrentAttempt: (state: TestState) => !!state.currentAttempt,
		selectCurrentQuestionIndex: (state: TestState) => {
			if (!state.currentAttempt) return 0;
			return state.currentAttempt.currentQuestionIndex;
		},
		selectCurrentQuestionId: (state: TestState) => {
			if (!state.currentAttempt) return 0;
			return state.currentAttempt.questionById[state.currentAttempt.currentQuestionIndex];
		},
		selectCurrentQuestionIndexIsFlagged: (state: TestState) => {
			if (!state.currentAttempt) return false;
			const currentQuestionId = state.currentAttempt.questionIds[state.currentAttempt.currentQuestionIndex];
			const currentQuestion = state.currentAttempt.questionById[currentQuestionId];
			if (!currentQuestion) return false;
			return currentQuestion.isFlagged;
		},
		selectQuestionIdIsFlagged: (state: TestState, questionId: number) => {
			if (!state.currentAttempt) return false;
			const question = state.currentAttempt.questionById[questionId];
			if (!question) return false;
			return question.isFlagged;
		},
		selectQuestionsArray: (state: TestState): {
			id: number;
			isFlagged: boolean;
			index: number;
		}[] | null => {
			if (!state.currentAttempt) return null;
			return Object.entries(state.currentAttempt.questionById).map(([questionId, question]) => ({
				id: Number(questionId),
				...question,
			} as {
				id: number;
				isFlagged: boolean;
				index: number;
			}));
		}

	},
});

export const testActions = testSlice.actions;
export const testSelectors = {
	...testSlice.selectors
};


export default testSlice.reducer;