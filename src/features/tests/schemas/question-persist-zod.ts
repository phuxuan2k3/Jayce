import z from "zod";
import { QuestionTypesAsConst } from "../ui-items/question/types";

export const QuestionPersistZodSchema = z.object({
	text: z.string().min(1, "Question text is required").max(1000, "Question text cannot exceed 1000 characters"),
	points: z.number().min(1).max(1000),
	type: z.enum(QuestionTypesAsConst),
	detail: z.discriminatedUnion("type", [
		// MCQDetail: Extract<QuestionDetailCommonSchema, { type: 'MCQ' }> & { correctOption: number }
		z.object({
			type: z.literal("MCQ"),
			options: z.array(z.string()).min(2, "At least 2 options are required").max(6, "No more than 6 options are allowed").superRefine((options, ctx) => {
				let index = 65; // ASCII code for 'A'
				for (const option of options) {
					if (option.trim() === "") {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: `Options ${String.fromCharCode(index)} cannot be empty`,
						});
					}
					index++;
				}
			}),
			correctOption: z.number(),
		}),
		// LongAnswerDetail: Extract<QuestionDetailCommonSchema, { type: 'LONG_ANSWER' }> & { correctAnswer: string }
		z.object({
			type: z.literal("LONG_ANSWER"),
			imageLinks: z.array(z.string()).nullable().optional(),
			extraText: z.string().nullable().optional(),
			correctAnswer: z.string().trim().min(1, "Correct answer is required"), // Required in QuestionPersistCoreSchema (not nullable)
		}),
	]),
});
