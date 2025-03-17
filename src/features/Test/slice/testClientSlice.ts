import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TestClientState {
	flaggedQuestionIndexes: Set<number>;
	currentQuestionIndex: number;
	hasOnGoingTest: boolean;
	isFlagged(): boolean;
}

const initialState: TestClientState = {
	flaggedQuestionIndexes: new Set<number>(),
	currentQuestionIndex: 0,
	hasOnGoingTest: false,
	isFlagged() {
		return this.flaggedQuestionIndexes.has(this.currentQuestionIndex);
	}
};

const testClientSlice = createSlice({
	name: 'testClient',
	initialState,
	reducers: {
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

		setHasOnGoingTest: (state, action: PayloadAction<boolean>) => {
			state.hasOnGoingTest = action.payload;
		}
	},
	selectors: {
		selectClientState: (state) => {
			return { ...state };
		},
	},
});

export const testClientSliceActions = testClientSlice.actions;
export const testClientSliceSelects = testClientSlice.selectors;

export default testClientSlice.reducer;