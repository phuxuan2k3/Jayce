import { produce } from 'immer';
import { CreateTestParam } from '../types/crud';

export type TestFields = Omit<CreateTestParam, 'questions'>;

export type TestQuestion = CreateTestParam['questions'][number];

export type TestPersistState = {
	data: CreateTestParam;
	aiQuestionsThreshold: number;
}

// Initial state for the test creation
export const initialState: TestPersistState = {
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

// Define action types
export type TestPersistAction = | {
	type: 'UPDATE_TEST_FIELDS';
	payload: Partial<TestFields>;
} | {
	type: 'ADD_QUESTION';
	payload: TestQuestion;
} | {
	type: 'ADD_AI_QUESTIONS';
	payload: TestQuestion[];
} | {
	type: 'UPDATE_QUESTION';
	payload: {
		index: number;
		question: Partial<TestQuestion>;
	};
} | {
	type: 'REMOVE_QUESTION';
	payload: { index: number; };
} | {
	type: 'ADD_OPTION';
	payload: { questionIndex: number; option: string };
} | {
	type: 'UPDATE_OPTION';
	payload: { questionIndex: number; optionIndex: number; option: string };
} | {
	type: 'REMOVE_OPTION';
	payload: { questionIndex: number; optionIndex: number };
} | {
	type: 'RESET_TEST';
};

export const testCreateSelectors = {
	isAIQuestion: (state: TestPersistState, index: number) => {
		return index <= state.aiQuestionsThreshold;
	}
};

export const testPersistReducer = (state: TestPersistState, action: TestPersistAction): TestPersistState => {
	return produce(state, (draft) => {
		switch (action.type) {
			case 'UPDATE_TEST_FIELDS':
				Object.assign(draft.data, action.payload);
				break;

			case 'ADD_QUESTION':
				draft.data.questions.push(action.payload);
				break;

			case 'ADD_AI_QUESTIONS':
				console.log('Adding AI questions:', action.payload);
				draft.data.questions.unshift(...action.payload);
				draft.aiQuestionsThreshold += action.payload.length;
				break;

			case 'UPDATE_QUESTION':
				const { index, question } = action.payload;
				Object.assign(draft.data.questions[index], question);
				break;

			case 'REMOVE_QUESTION':
				if (testCreateSelectors.isAIQuestion(draft, action.payload.index)) {
					draft.aiQuestionsThreshold -= 1;
				}
				draft.data.questions.splice(action.payload.index, 1);
				break;

			case 'ADD_OPTION':
				draft.data.questions[action.payload.questionIndex].options.push(action.payload.option);
				break;

			case 'UPDATE_OPTION':
				const { questionIndex, optionIndex, option } = action.payload;
				draft.data.questions[questionIndex].options[optionIndex] = option;
				break;

			case 'REMOVE_OPTION':
				const { questionIndex: qIndex, optionIndex: oIndex } = action.payload;
				draft.data.questions[qIndex].options.splice(oIndex, 1);
				break;

			case 'RESET_TEST':
				return initialState;
		}
	});
};