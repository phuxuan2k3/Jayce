import { Step1Data, Step2Data, Step3Data } from "../common/model-types";
import { StepInfo, StepInfoKey, StepInfoType } from "../common/step-info";
import { validateStep1, validateStep2, validateStep3 } from "./validation";

export type ExamGenerationState = {
	step: StepInfoKey;
	step1: Step1Data;
	step2: Step2Data;
	step3: Step3Data;
	errorMessages: string[];
};

function checkStateValidationForCurrentStep(state: ExamGenerationState): string[] {
	switch (state.step) {
		case 1:
			return validateStep1(state.step1);
		case 2:
			return validateStep2(state.step2);
		case 3:
			return validateStep3(state.step3);
		case 4:
			// Step 4 is just review, no additional validation needed
			return [];
		default:
			return ["Invalid step number"];
	}
}

function checkStateAllValidation(state: ExamGenerationState): string[] {
	const errors: string[] = [];
	errors.push(...validateStep1(state.step1));
	errors.push(...validateStep2(state.step2));
	errors.push(...validateStep3(state.step3));
	return errors;
}

function getStepInfo(step: number): StepInfoType {
	const stepKey = step as keyof typeof StepInfo;
	if (step < 1 || step > 4 || stepKey === undefined || !StepInfo[stepKey]) {
		return StepInfo[1]; // Default to step 1 info if invalid step
	}
	return StepInfo[stepKey]
}

export function ExamGenerationModel(state: ExamGenerationState) {
	return {
		validateCurrentStep: () => checkStateValidationForCurrentStep(state),
		validateAllSteps: () => checkStateAllValidation(state),
		getStepInfo: () => getStepInfo(state.step),
	};
}