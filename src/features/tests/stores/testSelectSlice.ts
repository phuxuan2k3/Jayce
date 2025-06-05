import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PracticeCore } from '../../../infra-test/core/test.model';
import { AttemptCore } from '../../../infra-test/core/attempt.model';

interface TestSelectState {
	practiceTest?: PracticeCore;
	attempt?: AttemptCore;
};

const initialState: TestSelectState = {
};

const testSelectSlice = createSlice({
	name: 'testSelect',
	reducerPath: 'testSelect',
	initialState,
	reducers: {
		selectPracticeTest: (state, action: PayloadAction<PracticeCore>) => {
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