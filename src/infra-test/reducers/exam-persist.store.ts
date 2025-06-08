import { QuestionPersistOfTest } from "../commands/question.persist";
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
	isInitialized: boolean;
	questions: {
		questions: QuestionPersistOfTest[];
	};
	config: ExamConfigPersist;
};

export const initialState: ExamPersistState = {
	isInitialized: false,
	questions: {
		questions: [],
	},
	config: EMPTY_EXAM_CONFIG,
};