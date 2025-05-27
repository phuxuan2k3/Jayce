import { ExamPersistState } from "./exam-persist.store";
import { ExamPersistAction } from "./exam-persist.action";

export const examPersistReducer = (state: ExamPersistState, action: ExamPersistAction): ExamPersistState => {
	switch (action.type) {
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