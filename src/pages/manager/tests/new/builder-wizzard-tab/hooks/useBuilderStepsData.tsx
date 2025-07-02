import { useState } from 'react'
import { LanguagesAsConst } from '../../common/base-schema';
import { BuilderStep1Schema, BuilderStep2Schema, BuilderStep3Schema } from '../../common/step-schema';
import { AllStepData, StepInfoKey } from '../../common/types';

export default function useBuiderStepsData(initialStepData?: AllStepData) {
	const [step, setStep] = useState<StepInfoKey>(1);
	const [stepReached, setStepReached] = useState<StepInfoKey>(1);
	const [currentErrorMessages, setCurrentErrorMessages] = useState<string[]>([]);

	const [mainValue, setMainValue] = useState<AllStepData>(initialStepData || {
		step1: {
			title: '',
			description: '',
			language: LanguagesAsConst[0],
		},
		step2: {
			topics: [],
		},
		step3: {
			context: {
				files: [],
				links: [],
				text: '',
			},
			creativity: 5
		}
	});

	const handleValueChangeOfStep = (stepKey: keyof AllStepData, value: AllStepData[typeof stepKey]) => {
		setMainValue({
			...mainValue,
			[stepKey]: {
				...mainValue[stepKey],
				...value,
			},
		});
	};

	const handleSetStep = (newStep: StepInfoKey) => {
		if (newStep >= 1 && newStep <= 4 && newStep <= stepReached + 1) {
			setCurrentErrorMessages([]);
			// Allow going back to previous steps without validation
			if (newStep < step) {
				setStep(newStep);
				return;
			}

			// Validate current step before moving to the next one
			if (step === 1) {
				const validationResult = BuilderStep1Schema.safeParse(mainValue.step1);
				if (!validationResult.success) {
					setCurrentErrorMessages(validationResult.error.errors.map(err => err.message));
					return;
				}
			}
			if (step === 2) {
				const validationResult = BuilderStep2Schema.safeParse(mainValue.step2);
				if (!validationResult.success) {
					setCurrentErrorMessages(validationResult.error.errors.map(err => err.message));
					return;
				}
			}
			if (step === 3) {
				const validationResult = BuilderStep3Schema.safeParse(mainValue.step3);
				if (!validationResult.success) {
					setCurrentErrorMessages(validationResult.error.errors.map(err => err.message));
					return;
				}
			}
			setStep(newStep);
			if (newStep > stepReached) {
				setStepReached(newStep);
			}
		}
	}

	const handleNextStep = () => {
		handleSetStep((Number(step) + 1) as StepInfoKey);
	};

	const handlePrevStep = () => {
		handleSetStep((Number(step) - 1) as StepInfoKey);
	};

	return {
		mainValue,
		handleValueChangeOfStep,
		currentErrorMessages,
		step,
		handleNextStep,
		handlePrevStep,
		handleSetStep,
	}
}
