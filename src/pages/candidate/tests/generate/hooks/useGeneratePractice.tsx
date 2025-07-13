import { useNavigate } from 'react-router-dom';
import { usePostTestsMutation } from '../../../../../features/tests/api/test.api-gen-v2';
import { useLazyGetSuggestQuestionsQuery } from '../../../../../features/tests/api/practice-generate.api';
import { useState } from 'react';
import { PracticeStepAllData } from '../types';
import paths from '../../../../../router/paths';
import { parseQueryError } from '../../../../../helpers/fetchBaseQuery.error';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useLanguage } from '../../../../../LanguageProvider';

export default function useGeneratePractice() {
	const { t } = useLanguage();
	
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [loadingState, setLoadingState] = useState<"none" | "generating" | "saving">("none");
	const [error, setError] = useState<FetchBaseQueryError | SerializedError | undefined>(undefined);

	const [getGeneratedQuestions] = useLazyGetSuggestQuestionsQuery();
	const [createTest] = usePostTestsMutation();

	const handleGeneratePractice = async (allStepData: PracticeStepAllData) => {
		try {
			const { title, description, language, minutesToAnswer } = allStepData.step1;
			const { difficulty, numberOfOptions, numberOfQuestions, tags } = allStepData.step2;
			const { outlines } = allStepData.step3;

			setErrorMessage(null);
			setError(undefined);
			setLoadingState("generating");

			const { questions } = await getGeneratedQuestions({
				title,
				description,
				language,
				minutesToAnswer,
				difficulty,
				numberOfOptions,
				numberOfQuestions,
				tags,
				outlines,
			}).unwrap();

			if (questions.length === 0) {
				setLoadingState("none");
				setErrorMessage(t("use_generate_practice_error_no_questions"));
				return;
			}

			setLoadingState("saving");

			const { testId } = await createTest({
				body: {
					title,
					description,
					language,
					minutesToAnswer,
					mode: "PRACTICE",
					detail: {
						mode: "PRACTICE",
						difficulty,
						numberOfOptions,
						numberOfQuestions,
						outlines,
						tags,
					},
					questions,
				},
			}).unwrap();

			setLoadingState("none");
			navigate(paths.candidate.tests.in(testId).PRACTICE);
		} catch (error: any) {
			const errorMessage = parseQueryError(error);
			if (errorMessage) {
				setErrorMessage(errorMessage);
			} else {
				setErrorMessage(t("use_generate_practice_error_unknown"));
			}
			setError(error as FetchBaseQueryError | SerializedError);
			setLoadingState("none");
		}
	};

	return {
		handleGeneratePractice,
		errorMessage,
		loadingState,
		error,
	}
}
