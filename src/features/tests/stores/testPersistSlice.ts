import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateTestParam } from '../types/crud';

// Type definitions
export type TestFields = Omit<CreateTestParam, 'questions'>;
export type TestQuestion = CreateTestParam['questions'][number];

export interface TestPersistState {
	data: CreateTestParam;
	aiQuestionsThreshold: number;
}

// Define the initial state
const initialState: TestPersistState = {
	data: {
		tagIds: [],
		title: '',
		description: '',
		difficulty: 'easy',
		minutesToAnswer: 10,
		questions: [],
	},
	aiQuestionsThreshold: -1,
};

// Create the slice
const testPersistSlice = createSlice({
	name: 'testPersist',
	initialState,
	reducers: {
		updateTestFields: (state, action: PayloadAction<Partial<TestFields>>) => {
			Object.assign(state.data, action.payload);
		},

		addQuestion: (state, action: PayloadAction<TestQuestion>) => {
			state.data.questions.push(action.payload);
		},

		addAIQuestions: (state, action: PayloadAction<TestQuestion[]>) => {
			console.log('Adding AI questions:', action.payload);
			state.data.questions.unshift(...action.payload);
			state.aiQuestionsThreshold += action.payload.length;
		},

		updateQuestion: (state, action: PayloadAction<{
			index: number;
			question: Partial<TestQuestion>;
		}>) => {
			const { index, question } = action.payload;
			Object.assign(state.data.questions[index], question);
		},

		removeQuestion: (state, action: PayloadAction<{ index: number }>) => {
			const { index } = action.payload;
			if (isAIQuestion(state, index)) {
				state.aiQuestionsThreshold -= 1;
			}
			state.data.questions.splice(index, 1);
		},

		addOption: (state, action: PayloadAction<{
			questionIndex: number;
			option: string
		}>) => {
			const { questionIndex, option } = action.payload;
			state.data.questions[questionIndex].options.push(option);
		},

		updateOption: (state, action: PayloadAction<{
			questionIndex: number;
			optionIndex: number;
			option: string;
		}>) => {
			const { questionIndex, optionIndex, option } = action.payload;
			state.data.questions[questionIndex].options[optionIndex] = option;
		},

		removeOption: (state, action: PayloadAction<{
			questionIndex: number;
			optionIndex: number;
		}>) => {
			const { questionIndex, optionIndex } = action.payload;
			state.data.questions[questionIndex].options.splice(optionIndex, 1);
		},

		resetTest: () => initialState,
	},
});

// Selectors
export const isAIQuestion = (state: TestPersistState, index: number): boolean => {
	return index <= state.aiQuestionsThreshold;
};

// Export actions and reducer
export const {
	updateTestFields,
	addQuestion,
	addAIQuestions,
	updateQuestion,
	removeQuestion,
	addOption,
	updateOption,
	removeOption,
	resetTest
} = testPersistSlice.actions;

export default testPersistSlice.reducer;

// For accessing in store
export const testPersistReducer = testPersistSlice.reducer;