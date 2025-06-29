import { useState } from 'react'
import { PracticeStepAllData, PracticeStepAllSchemaContainer, PracticeSteps } from '../types';
import useDraftValue from '../../../../../features/tests/hooks/useDraftValue';

export default function usePracticeGenerationStepManage() {
	const [validationErrorMessages, setValidationErrorMessages] = useState<string[]>([]);
	const [data, setData] = useState<PracticeStepAllData>({
		step1: {
			title: '',
			description: '',
			language: "English",
			minutesToAnswer: 30,
		},
		step2: {
			difficulty: "Intern",
			numberOfQuestions: 10,
			numberOfOptions: 4,
			tags: [],
		},
		step3: {
			outlines: [],
		},
	});

	const { draftValue, setDraftValue, confirmDraft } = useDraftValue({
		value: data,
		onValueConfirm: (value) => {
			setData(value);
		},
	});

	const handleDataChange = (step: PracticeSteps, newData: Partial<PracticeStepAllData[PracticeSteps]>) => {
		setDraftValue({
			...draftValue,
			[step]: {
				...draftValue[step],
				...newData,
			},
		});
	};

	const handleDataConfirm = (step: PracticeSteps) => {
		const currentSchema = PracticeStepAllSchemaContainer[step];
		if (!currentSchema) return;
		const validationResult = currentSchema.safeParse(draftValue[step]);

		if (!validationResult.success) {
			setValidationErrorMessages(validationResult.error.flatten().formErrors);
		} else {
			setValidationErrorMessages([]);
			confirmDraft();
		}
	}

	return {
		handleDataChange,
		handleDataConfirm,
		validationErrorMessages,
		draftValue,
		value: data,
	}
}