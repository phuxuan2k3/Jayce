import { ExamPersistState } from "./exam-persist.store";
import { ExamPersistAction } from "./exam-persist.action";

export const examPersistReducer = (state: ExamPersistState, action: ExamPersistAction): ExamPersistState => {
	switch (action.type) {
		case 'INITIALIZE':
			if (state.isInitialized === true) return state;
			return {
				...state,
				config: action.payload.config,
				questions: {
					questions: [...action.payload.questions],
				},
				isInitialized: true,
			};

		case 'UPDATE_CONFIG':
			return {
				...state,
				config: {
					...state.config,
					...action.payload,
				},
			};

		case 'ADD_QUESTION':
			return {
				...state,
				questions: {
					...state.questions,
					questions: [...state.questions.questions, action.payload.question],
				},
			};

		case 'BULK_ADD_QUESTIONS':
			return {
				...state,
				questions: {
					...state.questions,
					questions: [...state.questions.questions, ...action.payload.questions],
				},
			};

		case 'REPLACE_QUESTIONS':
			return {
				...state,
				questions: {
					...state.questions,
					questions: action.payload.questions,
				},
			};

		case 'UPDATE_QUESTION':
			const { index, question } = action.payload;
			const updatedQuestions = state.questions.questions.map((q, i) => (i === index
				? {
					...q,
					...question
				}
				: q
			));
			return {
				...state,
				questions: {
					...state.questions,
					questions: updatedQuestions,
				},
			};

		case 'REMOVE_QUESTION':
			const filteredQuestions = state.questions.questions.filter((_, i) => i !== action.payload.index);
			return {
				...state,
				questions: {
					...state.questions,
					questions: filteredQuestions,
				},
			};

		default:
			return state;
	}
};