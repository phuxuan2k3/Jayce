import { ExamConfigPersist } from "../../../../../../../infra-test/core/test.model";
import { StepInfoKey } from "../common/step-info";
import { ExamGenerationModel, ExamGenerationState } from "./exam-generation.model";

export const initializeState: (examConfig: ExamConfigPersist) => ExamGenerationState = (examConfig) => ({
	step: 1,
	step1: {
		title: examConfig.title,
		description: examConfig.description,
		// TODO: sync with examConfig
		language: "English",
		seniority: "Intern",
	},
	step2: {
		topics: [],
	},
	step3: {
		creativity: 5,
		context: {
			text: '',
			files: [],
			links: [],
		},
	},
	errorMessages: [],
});

type ExamGenerationAction =
	| { type: 'SET_STEP'; payload: number }
	| { type: 'SET_STEP1'; payload: ExamGenerationState['step1'] }
	| { type: 'SET_STEP2'; payload: ExamGenerationState['step2'] }
	| { type: 'SET_STEP3'; payload: ExamGenerationState['step3'] }

export function examGenerationReducer(
	state: ExamGenerationState,
	action: ExamGenerationAction
): ExamGenerationState {
	switch (action.type) {
		case 'SET_STEP':
			const stepKey = action.payload as StepInfoKey;
			if (action.payload < 1 || action.payload > 4 || stepKey === undefined) {
				return state; // Invalid step, do nothing
			}
			if (action.payload <= state.step) {
				return {
					...state,
					errorMessages: [], // Clear error messages when going back
					step: stepKey,
				}; // Allow going back to previous steps
			}
			const model = ExamGenerationModel(state);
			const errorMessages = model.validateCurrentStep();
			if (errorMessages.length > 0) {
				return {
					...state,
					errorMessages
				};
			}
			// Clear error messages when moving to a valid step
			return {
				...state,
				errorMessages: [],
				step: stepKey,
			};

		case 'SET_STEP1':
			return {
				...state,
				step1: action.payload,
			};

		case 'SET_STEP2':
			return {
				...state,
				step2: action.payload,
			};

		case 'SET_STEP3':
			return {
				...state,
				step3: action.payload,
			};

		default:
			return state;
	}
}