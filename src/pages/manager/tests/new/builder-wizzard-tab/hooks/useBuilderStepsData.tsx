import { useState } from 'react'
import { BuilderStep1Schema, BuilderStep2Schema, BuilderStep3Schema } from '../../common/step-schema';
import { AllStepData, StepInfoKey } from '../../common/types';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function useBuilderStepsData({
	stepData,
	onStepDataChange,
}: {
	stepData: AllStepData;
	onStepDataChange: (data: AllStepData) => void;
}) {
	const { t } = useLanguage();
	
	const [step, setStep] = useState<StepInfoKey>(1);
	const [stepReached, setStepReached] = useState<StepInfoKey>(1);
	const [currentErrorMessages, setCurrentErrorMessages] = useState<string[]>([]);

	const handleValueChangeOfStep = (stepKey: keyof AllStepData, value: AllStepData[typeof stepKey]) => {
		onStepDataChange({
			...stepData,
			[stepKey]: {
				...stepData[stepKey],
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
				const validationResult = BuilderStep1Schema.safeParse(stepData.step1);
				if (!validationResult.success) {
					setCurrentErrorMessages(validationResult.error.errors.map(err => t(err.message)));
					return;
				}
			}
			if (step === 2) {
				const validationResult = BuilderStep2Schema.safeParse(stepData.step2);
				if (!validationResult.success) {
					setCurrentErrorMessages(validationResult.error.errors.map(err => t(err.message)));
					return;
				}
			}
			if (step === 3) {
				const validationResult = BuilderStep3Schema.safeParse(stepData.step3);
				if (!validationResult.success) {
					setCurrentErrorMessages(validationResult.error.errors.map(err => t(err.message)));
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
		mainValue: stepData,
		handleValueChangeOfStep,
		currentErrorMessages,
		step,
		handleNextStep,
		handlePrevStep,
		handleSetStep,
	}
}
