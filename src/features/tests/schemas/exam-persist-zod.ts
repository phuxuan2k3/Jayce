import z from "zod";
import { LanguagesAsConst } from "../../../pages/manager/tests/new/common/base-schema";
import { QuestionPersistZodSchema } from "./question-persist-zod";

export const ExamPersistZodSchema = z.object({
	// From PostTestsApiArg["body"] excluding "detail" and "questions"
	title: z.string().trim().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
	description: z.string().trim().min(1, "Description is required").max(500, "Description cannot exceed 500 characters"),
	minutesToAnswer: z.number().min(1).max(720, "Minutes to answer must be between 1 and 720 minutes (12 hours)"),
	language: z.enum(LanguagesAsConst),
	mode: z.literal("EXAM"),

	// ExamPersistDetailSchema - Extract<PostTestsApiArg["body"]["detail"], { mode: "EXAM" }>
	detail: z.object({
		mode: z.literal("EXAM"),
		roomId: z.string().trim().min(1, "Room ID is required").max(100, "Room ID cannot exceed 100 characters"),
		password: z.string().nullable().optional(),
		numberOfAttemptsAllowed: z.number().min(1).optional(),
		numberOfParticipants: z.number().min(1).optional(),
		isAnswerVisible: z.boolean(),
		isAllowedToSeeOtherResults: z.boolean(),
		openDate: z.string().datetime().refine((date) => {
			const openDate = new Date(date);
			if (Date.now() > openDate.getTime()) {
				return false; // Open date must be in the future
			}
			return true;
		}, {
			message: "Open date must be in the future",
		}),
		closeDate: z.string().datetime().refine((date) => {
			const closeDate = new Date(date);
			if (Date.now() > closeDate.getTime()) {
				return false; // Close date must be in the future
			}
			return true;
		}, {
			message: "Close date must be in the future",
		}),
		isPublic: z.boolean().optional(),
	}).refine((data) => {
		const openDate = new Date(data.openDate);
		const closeDate = new Date(data.closeDate);
		if (openDate.getTime() >= closeDate.getTime()) {
			return false; // Open date must be before close date
		}
		return true;
	}, {
		message: "Open date must be before close date",
	}),

	// questions: QuestionPersistCoreSchema[]
	// Based on QuestionCoreSchema omitting "id", "testId", "_aggregate_test"
	questions: z.array(QuestionPersistZodSchema).min(1).max(1000),
});

export type ExamPersistZodSchemaType = z.infer<typeof ExamPersistZodSchema>;

