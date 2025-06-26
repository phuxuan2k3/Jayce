import { useCallback, useState } from 'react'
import { LanguagesAsConst } from '../utils/base-schema';
import { BuilderStep1Schema, BuilderStep1Type, BuilderStep2Schema, BuilderStep2Type, BuilderStep3Schema, BuilderStep3Type } from '../utils/step-schema';
import useStepDraft from './useStepDraft';
import { AllStepData, StepInfoKey } from '../utils/types';

export default function useBuiderStepsData(initialStepData?: AllStepData) {
	const [step, setStep] = useState<StepInfoKey>(1);
	const [stepReached, setStepReached] = useState<StepInfoKey>(1);
	const [currentErrorMessages, setCurrentErrorMessages] = useState<string[]>([]);

	const [step1, setStep1] = useState<BuilderStep1Type>(initialStepData?.step1 || {
		title: '',
		description: '',
		language: LanguagesAsConst[0],
	});
	const [step2, setStep2] = useState<BuilderStep2Type>(initialStepData?.step2 || {
		topics: [],
	});
	const [step3, setStep3] = useState<BuilderStep3Type>({
		context: {
			files: [],
			links: [],
			text: '',
		},
		creativity: 5
	});

	const step1Draft = useStepDraft({
		data: step1,
		setData: setStep1,
		schema: BuilderStep1Schema,
	});

	const step2Draft = useStepDraft({
		data: step2,
		setData: setStep2,
		schema: BuilderStep2Schema,
	});

	const step3Draft = useStepDraft({
		data: step3,
		setData: setStep3,
		schema: BuilderStep3Schema,
	});

	const handleSetStep = useCallback((newStep: StepInfoKey) => {
		if (newStep >= 1 && newStep <= 4 && newStep <= stepReached + 1) {
			setCurrentErrorMessages([]);
			if (step === 1 && step1Draft.isValid() === false) {
				setCurrentErrorMessages(step1Draft.errorMessages);
			}
			else if (step === 2 && step2Draft.isValid() === false) {
				setCurrentErrorMessages(step2Draft.errorMessages);
			}
			else if (step === 3 && step3Draft.isValid() === false) {
				setCurrentErrorMessages(step3Draft.errorMessages);
			}
			if (currentErrorMessages.length === 0) {
				setStep(newStep);
				if (newStep > stepReached) {
					setStepReached(newStep);
				}
			}
		}
	}, []);

	const handleNextStep = useCallback(() => {
		handleSetStep((Number(step) + 1) as StepInfoKey);
	}, []);

	const handlePrevStep = useCallback(() => {
		handleSetStep((Number(step) - 1) as StepInfoKey);
	}, []);

	return {
		draftState: {
			step1Draft,
			step2Draft,
			step3Draft,
		},
		mainState: {
			step1,
			step2,
			step3,
		},
		currentErrorMessages,
		step,
		handleNextStep,
		handlePrevStep,
		handleSetStep,
	}
}
