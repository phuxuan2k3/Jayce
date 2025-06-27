import z from "zod";

// MCQ and Long Answer detail schemas
const McqDetailCommonSchema = z.object({
	type: z.literal("MCQ"),
	options: z.array(z.string()),
	correctOption: z.number().nullable(),
});

const LongAnswerDetailCommonSchema = z.object({
	type: z.literal("LONG_ANSWER"),
	imageLinks: z.array(z.string()).nullable().optional(),
	extraText: z.string().nullable().optional(),
	correctAnswer: z.string().nullable(),
});

// Question detail schema (union)
const QuestionDetailSchema = z.union([
	McqDetailCommonSchema.extend({ correctOption: z.number().optional() }),
	LongAnswerDetailCommonSchema.extend({ correctAnswer: z.string().optional() }),
]);

// Question schema
const QuestionSchema = z.object({
	text: z.string(),
	points: z.number(),
	type: z.enum(["MCQ", "LONG_ANSWER"]),
	detail: QuestionDetailSchema,
});

// Exam detail schema
const ExamDetailSchema = z.object({
	mode: z.literal("EXAM"),
	roomId: z.string(),
	password: z.string().nullable().optional(),
	numberOfAttemptsAllowed: z.number().optional(),
	numberOfParticipants: z.number().optional(),
	isAnswerVisible: z.boolean(),
	isAllowedToSeeOtherResults: z.boolean(),
	openDate: z.string().nullable(),
	closeDate: z.string().nullable(),
	isPublic: z.boolean().optional(),
});

// Main schema for EXAM mode
export const ExamPersistCoreZodSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().optional(),
	minutesToAnswer: z.number(),
	language: z.string(),
	mode: z.literal("EXAM"),
	detail: ExamDetailSchema,
	questions: z.array(QuestionSchema),
});