import z from "zod";
import { LanguagesAsConst } from "../../../pages/manager/tests/new/common/base-schema";
import { QuestionPersistZodSchema } from "./question-persist-zod";

export const ExamPersistZodSchema = z.object({
	// From PostTestsApiArg["body"] excluding "detail" and "questions"
	title: z.string().trim().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
	description: z.string().max(500, "Description cannot exceed 500 characters"),
	minutesToAnswer: z.number().min(1).max(720, "Minutes to answer must be between 1 and 720 minutes (12 hours)"),
	language: z.enum(LanguagesAsConst),
	mode: z.literal("EXAM"),

	// ExamPersistDetailSchema - Extract<PostTestsApiArg["body"]["detail"], { mode: "EXAM" }>
	detail: z.object({
		mode: z.literal("EXAM"),
		roomId: z.string().trim().min(1, "Room ID is required").max(100, "Room ID cannot exceed 100 characters"),
		password: z.string().nullable().optional(),
		numberOfAttemptsAllowed: z.number().min(0).optional(),
		numberOfParticipants: z.number().min(0).optional(),
		isAnswerVisible: z.boolean(),
		isAllowedToSeeOtherResults: z.boolean(),
		openDate: z.string().datetime(),
		closeDate: z.string().datetime(),
		isPublic: z.boolean().optional(),
	}).superRefine((data, ctx) => {
		const openDate = new Date(data.openDate);
		const closeDate = new Date(data.closeDate);
		if (openDate.getTime() >= closeDate.getTime()) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Open date must be before close date",
				path: ["detail", "openDate", "closeDate"],
			});
		}
		const distance = closeDate.getTime() - openDate.getTime();
		if (distance > 1000 * 60 * 60 * 24 * 60) { // 60 days in milliseconds
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "The exam duration cannot exceed 60 days",
				path: ["detail", "openDate", "closeDate"],
			});
		}
	}),

	// questions: QuestionPersistCoreSchema[]
	// Based on QuestionCoreSchema omitting "id", "testId", "_aggregate_test"
	questions: z.array(QuestionPersistZodSchema).min(1, "You must have at least 1 question in an exam").max(100, "You must have at least 1 question and at most 100 questions in an exam"),
});

export type ExamPersistZodSchemaType = z.infer<typeof ExamPersistZodSchema>;

