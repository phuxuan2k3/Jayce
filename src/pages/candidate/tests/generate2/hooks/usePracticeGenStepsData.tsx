import { useState } from 'react'
import { PracticeStepAllData, PracticeStepAllSchemaContainer, PracticeStepErrorMessages, PracticeStepsValuesType } from '../types';

export default function usePracticeGenStepsData({
	initialMainValue,
}: {
	initialMainValue?: PracticeStepAllData;
}) {
	const [step, setStep] = useState<PracticeStepsValuesType>(1);
	const [stepReached, setStepReached] = useState<PracticeStepsValuesType>(1);
	const [currentErrorMessages, setCurrentErrorMessages] = useState<string[]>([]);
	const [validationErrorMessages, setValidationErrorMessages] = useState<PracticeStepErrorMessages>({
		step1: {
		},
		step2: {
		},
		step3: {
		},
	});

	const [mainValue, setMainValue] = useState<PracticeStepAllData>(initialMainValue || {
		step1: {
			title: '',
			language: "English",
			minutesToAnswer: 30,
			numberOfQuestions: 10,
			questionType: "MIXED",
		},
		step2: {
			difficulty: "Intern",
			description: '',
			tags: [],
			outlines: [],
		},
		step3: {
		}
	});

	const handleSetStep = (_newStep: number) => {
		const newStep = _newStep as PracticeStepsValuesType;
		if (newStep == null || newStep === undefined) {
			return;
		}
		if (newStep >= 1 && newStep <= 3 && newStep <= stepReached + 1) {
			setCurrentErrorMessages([]);
			// Allow going back to previous steps without validation
			if (newStep < step) {
				setStep(newStep);
				return;
			}

			// Validate current step before moving to the next one
			if (step === 1) {
				const validationResult = PracticeStepAllSchemaContainer.step1.safeParse(mainValue.step1);
				if (!validationResult.success) {
					const errorMessages = validationResult.error.errors.map(err => err.message);

					setCurrentErrorMessages(errorMessages);
					setValidationErrorMessages(prev => ({
						step1: {
							...prev.step1,
							...Object.fromEntries(validationResult.error.errors.map(err => [err.path[0], err.message])),
						},
						step2: prev.step2,
						step3: prev.step3,
					}));
					return;
				}
			}
			if (step === 2) {
				const validationResult = PracticeStepAllSchemaContainer.step2.safeParse(mainValue.step2);
				if (!validationResult.success) {
					setCurrentErrorMessages(validationResult.error.errors.map(err => err.message));
					return;
				}
			}
			if (step === 3) {
				const validationResult = PracticeStepAllSchemaContainer.step3.safeParse(mainValue.step3);
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
	};

	const handleNextStep = () => {
		const stepAsNumber = Number(step);
		if (stepAsNumber < 3) {
			handleSetStep((Number(step) + 1) as PracticeStepsValuesType);
		}
	};

	const handlePrevStep = () => {
		const stepAsNumber = Number(step);
		if (stepAsNumber <= 1) {
			return;
		}
		handleSetStep((Number(step) - 1) as PracticeStepsValuesType);
	};

	return {
		step,
		currentErrorMessages,
		validationErrorMessages,
		mainValue,
		setMainValue,
		handleSetStep,
		handleNextStep,
		handlePrevStep,
	}
}
