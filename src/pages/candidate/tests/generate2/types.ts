import z from "zod";
import { DifficultiesAsConst, LanguagesAsConst, QuestionTypesAsConst } from "../../../manager/tests/new/common/base-schema";

const PracticeStep1Schema = z.object({
	title: z.string().min(1, 'validation_title_required'),
	numberOfQuestions: z.number().min(1, 'validation_questions_min').max(40, 'validation_questions_max'),
	language: z.enum(LanguagesAsConst),
	minutesToAnswer: z
		.number()
		.min(5, 'validation_minutes_min')
		.max(180, 'validation_minutes_max'),
	questionType: z.enum(QuestionTypesAsConst).default('MCQ'),
});

const PracticeStep2Schema = z.object({
	description: z.string().default(''),
	difficulty: z.enum(DifficultiesAsConst),
	outlines: z.array(z.string()).max(10, 'validation_outlines_max'),
	tags: z.array(z.string()).max(20, 'validation_tags_max'),
});

const PracticeStep3Schema = z.object({
});

export type PracticeStep1Type = z.infer<typeof PracticeStep1Schema>;
export type PracticeStep2Type = z.infer<typeof PracticeStep2Schema>;
export type PracticeStep3Type = z.infer<typeof PracticeStep3Schema>;


export type PracticeStepAllData = {
	step1: PracticeStep1Type;
	step2: PracticeStep2Type;
	step3: PracticeStep3Type;
}

export type PracticeSteps = keyof PracticeStepAllData;

export const PracticeStepAllSchemaContainer = {
	step1: PracticeStep1Schema,
	step2: PracticeStep2Schema,
	step3: PracticeStep3Schema,
};
export const PracticeStepsValuesAsConst = [1, 2, 3] as const;
export type PracticeStepsValuesType = typeof PracticeStepsValuesAsConst[number];

export const PracticeGenStepInfo: Record<PracticeStepsValuesType, {
	title: string;
	description: string;
}> = {
	1: {
		title: "gen_step1_title",
		description: "gen_step1_description",
	},
	2: {
		title: "gen_step2_title",
		description: "gen_step2_description",
	},
	3: {
		title: "gen_step3_title",
		description: "gen_step3_description",
	},
};

export type PracticeStepErrorMessages = {
	step1: {
		title?: string;
		numberOfQuestions?: string;
		language?: string;
		minutesToAnswer?: string;
		questionType?: string;
	},
	step2: {
		description?: string;
		difficulty?: string;
		outlines?: string;
		tags?: string;
	},
	step3: {
		// Define any error messages for step 3 if needed
	},
} 
