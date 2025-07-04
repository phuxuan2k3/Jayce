import z from "zod";
import { DifficultiesAsConst, LanguagesAsConst } from "../../../manager/tests/new/common/base-schema";

const PracticeStep1Schema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	language: z.enum(LanguagesAsConst),
	minutesToAnswer: z.number().min(5, 'Minimum 5 minutes').max(180, 'Maximum 180 minutes'),
});

const PracticeStep2Schema = z.object({
	difficulty: z.enum(DifficultiesAsConst),
	numberOfQuestions: z.number().min(1).max(50),
	numberOfOptions: z.number().min(2).max(6),
	tags: z.array(z.string()),
})

const PracticeStep3Schema = z.object({
	outlines: z.array(z.string()).min(1, 'At least one outline is required'),
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
		title: "Step 1: General Information",
		description: "This is the first step where you provide general information about the test."
	},
	2: {
		title: "Step 2: Prompt Configuration",
		description: "Configure how the AI will generate questions for your test."
	},
	3: {
		title: "Step 3: Add Outlines & Generate",
		description: "Add specific outlines to guide the AI in generating your questions. More detailed outlines will result in better questions."
	}
};