import { z } from "zod";
import { TemplateCoreSchema } from "../../api/test.api-gen-v2";
import { DifficultiesAsConst } from "../../../../pages/manager/tests/new/common/base-schema";

export const TemplatePersistZodSchema = z.object({
	name: z.string().min(1, "Template name is required"),
	title: z.string().min(1, "Test title is required"),
	description: z.string().optional().default(''),
	numberOfQuestions: z.number().min(1, "At least one question is required").max(20, "Maximum 30 questions allowed"),
	difficulty: z.enum(DifficultiesAsConst),
	tags: z.array(z.string()).optional().default([]),
	numberOfOptions: z.number().min(2, "At least two options are required").max(10, "Maximum 10 options allowed"),
	outlines: z.array(z.string()).optional().default([]),
	minutesToAnswer: z.number().min(1, "At least one minute is required").max(720, "Maximum 12 hours allowed"),
	language: z.string().min(2, "Language is required"),
});

export type TemplatePersistCoreSchema = Omit<TemplateCoreSchema, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;

export const EMPTY_TEMPLATE_PERSIST: TemplatePersistCoreSchema = {
	name: '',
	title: '',
	description: '',
	numberOfQuestions: 5,
	difficulty: "Intern",
	tags: [],
	numberOfOptions: 4,
	outlines: [],
	minutesToAnswer: 10,
	language: "English",
};
