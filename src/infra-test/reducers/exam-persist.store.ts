import { QuestionCore } from "../core/question.model";
import { QuestionPersistOfTest } from "../commands/question.persist";
import { ExamCore } from "../core/test.model";
import { ExamConfigPersist } from "../commands/exam.persist";

const EMPTY_EXAM_CONFIG: ExamConfigPersist = {
	roomId: "",
	title: "",
	description: "",
	minutesToAnswer: 1,
	language: "English",
	password: null,
	numberOfAttemptsAllowed: 1,
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
	password = null,
}: {
	exam?: ExamCore;
	password?: string | null;
	questions?: QuestionCore[];
}): ExamPersistState => {
	return {
		config: exam != null ? {
			...exam,
			openDate: new Date(exam.openDate),
			closeDate: new Date(exam.closeDate),
			password: password ?? null,
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

