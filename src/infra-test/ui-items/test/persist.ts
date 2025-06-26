import { PostTestsApiArg } from "../../api/test.api-gen-v2";

type ExamPersistDetailSchema = Extract<PostTestsApiArg["body"]["detail"], { mode: "EXAM" }>;

export type ExamPersistDetailBody = Omit<PostTestsApiArg["body"], "detail"> & {
	detail: ExamPersistDetailSchema;
};
