import { GetSuggestQuestionsRequest, useLazyGetSuggestQuestionsQuery } from '../../../../../features/tests/api/practice-generate.api';
import { useState } from 'react';
import { PracticeStepAllData } from '../types';
import { parseQueryError } from '../../../../../helpers/fetchBaseQuery.error';
import practiceGenSlice from '../../../../../features/tests/stores/practiceGenSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useLanguage } from '../../../../../LanguageProvider';

export default function useGeneratePractice() {
	const { t } = useLanguage();

	const dispatch = useAppDispatch();

	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isInitializing, setIsInitializing] = useState(false);
	const genStatus = useAppSelector(practiceGenSlice.selectors.selectGenStatus);

	const [getGeneratedQuestions] = useLazyGetSuggestQuestionsQuery();

	const handleGeneratePractice = async (allStepData: PracticeStepAllData) => {
		setErrorMessage(null);
		// If already generating, do not start a new request
		if (genStatus !== "none") {
			setErrorMessage(t("generate_practice_hook_error"));
			return;
		}
		else {
			try {
				setIsInitializing(true);
				const request = stepDataToRequest(allStepData, null);
				const response = await getGeneratedQuestions(request).unwrap();

				dispatch(practiceGenSlice.actions.initializePolling({
					data: request,
					requestKey: response.requestKey,
				}));
			} catch (error: any) {
				const message = parseQueryError(error);
				dispatch(practiceGenSlice.actions.setApiError(message));
			} finally {
				setIsInitializing(false);
			}
		}
	}

	return {
		handleGeneratePractice,
		errorMessage,
		isInitializing,
	}
}

const stepDataToRequest = (
	allStepData: PracticeStepAllData,
	requestKey: string | null
): GetSuggestQuestionsRequest => {
	const { title, description, language, minutesToAnswer } = allStepData.step1;
	const { difficulty, numberOfOptions, numberOfQuestions, tags } = allStepData.step2;
	const { outlines } = allStepData.step3;

	return {
		title,
		description,
		language,
		minutesToAnswer,
		difficulty,
		numberOfOptions,
		numberOfQuestions,
		tags,
		outlines,
		requestKey,
	};
}