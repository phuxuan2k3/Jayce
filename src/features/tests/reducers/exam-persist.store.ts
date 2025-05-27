import { QuestionCore, QuestionPersistOfTest } from "../model/question.model";
import { ExamConfigPersist, ExamCore } from "../model/test.model";

const EMPTY_EXAM_CONFIG: ExamConfigPersist = {
	title: "",
	description: "",
	minutesToAnswer: 1,
	language: "English",
	password: null,
	numberOfAttemptsAllowed: null,
	isAnswerVisible: false,
	isAllowedToSeeOtherResults: false,
	openDate: new Date(),
	closeDate: new Date(),
};

export type ExamPersistState = {
	questions: {
		questions: QuestionPersistOfTest[];
	};
	config: ExamConfigPersist;
};

export const examPersistStateFactory = ({
	exam,
	questions,
}: {
	exam?: ExamCore;
	questions?: QuestionCore[];
}): ExamPersistState => {

	return {
		config: exam != null ? {
			...exam,
			openDate: new Date(exam.openDate),
			closeDate: new Date(exam.closeDate),
		} : EMPTY_EXAM_CONFIG,
		questions: questions != null ? {
			questions: questions.map((q) => ({
				...q
			})),
		} : {
			questions: []
		},
	};
};

