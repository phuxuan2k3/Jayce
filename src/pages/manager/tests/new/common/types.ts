import z from "zod";
import { BuilderStep1Schema, BuilderStep1Type, BuilderStep2Schema, BuilderStep2Type, BuilderStep3Schema, BuilderStep3Type } from "./step-schema"

export type AllStepData = {
	step1: BuilderStep1Type;
	step2: BuilderStep2Type;
	step3: BuilderStep3Type;
}

export const AllStepDataSchemaMap: Record<keyof AllStepData, z.ZodTypeAny> = {
	step1: BuilderStep1Schema,
	step2: BuilderStep2Schema,
	step3: BuilderStep3Schema,
};

export const StepInfo = {
	1: {
		title: "step1_title",
		description: "step1_description",
	},
	2: {
		title: "step2_title",
		description: "step2_description",
	},
	3: {
		title: "step3_title",
		description: "step3_description",
	},
	4: {
		title: "step4_title",
		description: "step4_description",
	},
} as const;

export type StepInfoType = typeof StepInfo[keyof typeof StepInfo];
export type StepInfoKey = keyof typeof StepInfo;

export const getStepInfo = (step: StepInfoKey): StepInfoType => {
	return StepInfo[step] || {
		title: "step_unknown_title",
		description: "step_unknown_description",
	};
};

export type CreateTab = "exam" | "generate" | "publish";
