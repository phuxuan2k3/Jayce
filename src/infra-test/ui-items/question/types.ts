import { QuestionCoreSchema, QuestionDetailCommonSchema } from "../../api/test.api-gen-v2";

export type QuestionPersistCoreSchema = Omit<QuestionCoreSchema, "id" | "testId" | "_aggregate_test"> & ({
	detail: MCQDetail | LongAnswerDetail;
});

export type MCQDetail = Extract<QuestionDetailCommonSchema, { type: 'MCQ'; }> & {
	correctOption: number;
};

export type LongAnswerDetail = Extract<QuestionDetailCommonSchema, { type: 'LONG_ANSWER'; }> & {
	correctAnswer: string;
};

