import { QuestionPersistOfTest } from "../model/question.model";
import { ExamConfigPersist } from "../model/test.model";

export type ExamPersistAction = {
	type: 'UPDATE_CONFIG';
	payload: Partial<ExamConfigPersist>;
} | {
	type: 'ADD_QUESTION';
	payload: {
		question: QuestionPersistOfTest;
	};
} | {
	type: 'UPDATE_QUESTION';
	payload: {
		index: number;
		question: Partial<QuestionPersistOfTest>;
	};
} | {
	type: 'REMOVE_QUESTION';
	payload: { index: number; };
};
