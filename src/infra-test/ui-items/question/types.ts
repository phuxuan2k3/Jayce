import { QuestionCoreSchema, QuestionDetailCommonSchema } from "../../api/test.api-gen-v2";

export type QuestionPersistCoreSchema = Omit<QuestionCoreSchema, "testId" | "_aggregate_test">;

export type MCQDetail = Extract<QuestionDetailCommonSchema, { type: 'MCQ'; }>;

export type LongAnswerDetail = Extract<QuestionDetailCommonSchema, { type: 'LONG_ANSWER'; }>;

