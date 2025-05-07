import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestPracticeState {
}

const initialState: TestPracticeState = {
};

const testPracticeSlice = createSlice({
	name: 'testPractice',
	initialState,
	reducers: {
	},
});

export default testPracticeSlice;