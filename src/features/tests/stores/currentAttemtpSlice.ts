import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CurrentAttemptState {
	isHavingTest: boolean;
	flaggedQuestionIndexes: Set<number>;
	currentQuestionIndex: number;
	isFlagged(): boolean;
}

const initialState: CurrentAttemptState = {
	isHavingTest: false,
	flaggedQuestionIndexes: new Set<number>(),
	currentQuestionIndex: 0,
	isFlagged() {
		return this.flaggedQuestionIndexes.has(this.currentQuestionIndex);
	}
};

const currentAttemptSlice = createSlice({
	name: 'currentAttempt',
	initialState,
	reducers: {
		startTest: (state) => {
			state.isHavingTest = true;
		},

		toggleFlagCurrentQuestion: (state) => {
			if (state.flaggedQuestionIndexes.has(state.currentQuestionIndex)) {
				state.flaggedQuestionIndexes.delete(state.currentQuestionIndex);
			}
			else {
				state.flaggedQuestionIndexes.add(state.currentQuestionIndex);
			}
		},

		setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
			state.currentQuestionIndex = action.payload;
		},

		endTest: () => initialState,
	},
	selectors: {
		selectCurrentAttempt: (state) => {
			return { ...state };
		},
	},
});

export const currentAttemptActions = currentAttemptSlice.actions;
export const curerntAttemptSelects = currentAttemptSlice.selectors;

export default currentAttemptSlice.reducer;