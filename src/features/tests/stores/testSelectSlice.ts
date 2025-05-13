import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TestCore, TestPracticeCore } from '../model/test.model';
import { AttemptCore } from '../model/attempt.model';

interface TestSelectState {
	practiceTest?: TestPracticeCore;
	attempt?: AttemptCore;
};

const initialState: TestSelectState = {
};

const testSelectSlice = createSlice({
	name: 'testSelect',
	reducerPath: 'testSelect',
	initialState,
	reducers: {
		selectPracticeTest: (state, action: PayloadAction<TestPracticeCore>) => {
			state.practiceTest = action.payload;
		},
		deselectPracticeTest: (state) => {
			state.practiceTest = undefined;
		},
		selectAttempt: (state, action: PayloadAction<AttemptCore>) => {
			state.attempt = action.payload;
		},
		deselectAttempt: (state) => {
			state.attempt = undefined;
		},
	},
});

export default testSelectSlice;