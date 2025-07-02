import { PostTestsApiArg } from "../../api/test.api-gen-v2";
import { QuestionPersistCoreSchema } from "../question/types";

type ExamPersistDetailSchema = Extract<PostTestsApiArg["body"]["detail"], { mode: "EXAM" }> & {
	openDate: string;
	closeDate: string;
};

export type ExamPersistCoreSchema = Omit<PostTestsApiArg["body"], "detail" | "questions"> & {
	detail: ExamPersistDetailSchema;
	questions: QuestionPersistCoreSchema[];
};

