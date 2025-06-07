import { QuestionPersistOfTest } from "../commands/question.persist";
import { ExamConfigPersist } from "../commands/exam.persist";

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
} | {
	type: 'BULK_ADD_QUESTIONS';
	payload: {
		questions: QuestionPersistOfTest[];
	};
} | {
	type: 'REPLACE_QUESTIONS';
	payload: {
		questions: QuestionPersistOfTest[];
	};
};
