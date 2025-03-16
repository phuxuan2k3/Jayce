import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AttemptAnswer } from '../types/current';

interface TestState {
	isOnGoing: boolean;
	isSocketConnected: boolean;
	secondsLeft: number;
	answers: AttemptAnswer[]; // Todo: use hashmap (questionId as key) instead of array
	flaggedQuestions: Set<number>;
	currentQuestionIndex: number;
	totalQuestions: number;
}

const initialState: TestState = {
	isOnGoing: false,
	isSocketConnected: false,
	secondsLeft: 0,
	answers: [],
	flaggedQuestions: new Set(),
	currentQuestionIndex: 0,
	totalQuestions: 0,
};

// Todo: Separate the query of getting answers from get the full test (getTestToDo api). Then use socket emit to initizlize the test's answers.
// Todo: Use RTK Query combined with Socket.io
// Ref: https://wanago.io/2022/01/03/websockets-redux-toolkit-query-typescript/

const testSlice = createSlice({
	name: 'test',
	initialState,
	reducers: {
		startTest: (state) => {
			state.isOnGoing = true;
		},

		socketEstablished: (state) => {
			state.isSocketConnected = true;
		},

		socketDisconnected: (state) => {
			state.isSocketConnected = false;
		},

		syncSecondsLeft: (state, action: PayloadAction<number>) => {
			state.secondsLeft = action.payload;
		},

		syncTest: (state, action: PayloadAction<{ attemptAnswers: AttemptAnswer[], totalQuestions: number }>) => {
			state.answers = action.payload.attemptAnswers;
			state.totalQuestions = action.payload.totalQuestions;
		},

		answerQuestion: (state, action: PayloadAction<AttemptAnswer>) => {
			if (action.payload.chosenOption === -1) {
				state.answers = state.answers.filter((answer) => answer.questionId !== action.payload.questionId);
			} else {
				const existingAnswer = state.answers.find((answer) => answer.questionId === action.payload.questionId);
				if (existingAnswer) {
					existingAnswer.chosenOption = action.payload.chosenOption;
				}
				else {
					state.answers.push(action.payload);
				}
			}
		},

		removeQuestionAnswer: (state, action: PayloadAction<number>) => {
			state.answers = state.answers.filter((answer) => answer.questionId !== action.payload);
		},

		toggleFlagCurrentQuestion: (state) => {
			if (state.flaggedQuestions.has(state.currentQuestionIndex)) {
				state.flaggedQuestions.delete(state.currentQuestionIndex);
			}
			else {
				state.flaggedQuestions.add(state.currentQuestionIndex);
			}
		},

		setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
			if (action.payload < 0 || action.payload >= state.totalQuestions) {
				return;
			}
			state.currentQuestionIndex = action.payload;
		},

		endTest: (state) => {
			state.isOnGoing = false;
			state.answers = [];
			state.flaggedQuestions.clear();
			state.currentQuestionIndex = 0;
			state.secondsLeft = 0;
			state.totalQuestions = 0;
		}
	},
	selectors: {
		selectIsOngoing: (state) => state.isOnGoing,
		selectCurrentIndex: (state) => state.currentQuestionIndex,
		selectTotalQuestions: (state) => state.totalQuestions,
		selectCurrentAnswer: (state) => (questionId: number) => {
			return state.answers.find((answer) => answer.questionId === questionId)?.chosenOption || null;
		},
		selectIsIndexFlagged: (state) => {
			return state.flaggedQuestions.has(state.currentQuestionIndex);
		},
		selectSecondsLeft: (state) => state.secondsLeft,
		selectAnswers: (state) => state.answers,
		selectFlaggedQuestions: (state) => state.flaggedQuestions,
	}
});

export const testSliceActions = testSlice.actions;
export const testSliceSelects = testSlice.selectors;

export default testSlice.reducer;