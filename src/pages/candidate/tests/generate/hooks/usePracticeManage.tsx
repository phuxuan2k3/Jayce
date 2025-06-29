import { useState } from 'react'
import { PracticeStepAllData, PracticeStepAllSchemaContainer, PracticeSteps } from '../types';
import useDraftValue from '../../../../../features/tests/hooks/useDraftValue';
import { TemplateCoreSchema } from '../../../../../features/tests/api/test.api-gen-v2';
import { DifficultiesAsConst, DifficultyType, LanguagesAsConst, LanguageType } from '../../../../manager/tests/new/common/base-schema';

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

	const handleApplyTemplate = (template: TemplateCoreSchema) => {
		const templateLanguage = template.language as LanguageType;
		const templateDifficulty = template.difficulty as DifficultyType;
		setData({
			step1: {
				title: template.title,
				description: template.description,
				language: LanguagesAsConst.includes(templateLanguage) ? templateLanguage : "English",
				minutesToAnswer: template.minutesToAnswer,
			},
			step2: {
				difficulty: DifficultiesAsConst.includes(templateDifficulty) ? templateDifficulty : "Intern",
				numberOfQuestions: template.numberOfQuestions,
				numberOfOptions: template.numberOfOptions,
				tags: template.tags,
			},
			step3: {
				outlines: template.outlines,
			},
		})
	}

	const handleDataConfirm = (step: PracticeSteps) => {
		const currentSchema = PracticeStepAllSchemaContainer[step];
		if (!currentSchema) return false;
		const validationResult = currentSchema.safeParse(draftValue[step]);

		if (!validationResult.success) {
			setValidationErrorMessages(validationResult.error.issues.map(issue => issue.message));
			return false;
		} else {
			setValidationErrorMessages([]);
			confirmDraft();
			return true;
		}
	}

	return {
		handleDataChange,
		handleDataConfirm,
		handleApplyTemplate,
		validationErrorMessages,
		draftValue,
		value: data,
	}
}