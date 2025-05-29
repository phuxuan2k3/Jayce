import { QuestionPersistOfTest } from "../../../infra-test/core/question.model";
import { ExamConfigPersist } from "../../../infra-test/core/test.model";

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
