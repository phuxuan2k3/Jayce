import z from "zod";
import { DifficultiesAsConst, LanguagesAsConst } from "../../../manager/tests/new/common/base-schema";

const PracticeStep1Schema = z.object({
	title: z.string().min(1, 'validation_title_required'),
	description: z.string().min(1, 'validation_description_required'),
	language: z.enum(LanguagesAsConst),
	minutesToAnswer: z
		.number()
		.min(5, 'validation_minutes_min')
		.max(180, 'validation_minutes_max'),
});

const PracticeStep2Schema = z.object({
	difficulty: z.enum(DifficultiesAsConst),
	numberOfQuestions: z.number().min(1, 'validation_questions_min').max(40, 'validation_questions_max'),
	numberOfOptions: z.number().min(2, 'validation_options_min').max(6, 'validation_options_max'),
	tags: z.array(z.string()),
});

const PracticeStep3Schema = z.object({
	outlines: z.array(z.string()).min(1, 'validation_outlines_required'),
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