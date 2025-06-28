import { BuilderStep1Type, BuilderStep2Type, BuilderStep3Type } from "./step-schema"

export type AllStepData = {
	step1: BuilderStep1Type;
	step2: BuilderStep2Type;
	step3: BuilderStep3Type;
}

export const StepInfo = {
	1: {
		title: "Step 1: Basic Information",
		description: "Provide the basic information for your test, including title, description, language and seniourity.",
	},
	2: {
		title: "Step 2: Exam's Blueprint",
		description: "Define the topics and their difficulty levels for your test.",
	},
	3: {
		title: "Step 3: Refinement",
		description: "Adjust the model's creativity and provide more contexts.",
	},
	4: {
		title: "Step 4: Review and Submit",
		description: "Review your test details and submit it for processing.",
	},
} as const;

export type StepInfoType = typeof StepInfo[keyof typeof StepInfo];
export type StepInfoKey = keyof typeof StepInfo;

export const getStepInfo = (step: StepInfoKey): StepInfoType => {
	return StepInfo[step] || {
		title: "Unknown Step",
		description: "No information available for this step.",
	};
};

export type CreateTab = "info" | "questions" | "generate" | "publish";
