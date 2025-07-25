import { GetSuggestQuestionsRequest, useLazyGetSuggestQuestionsQuery } from '../../../../../features/tests/api/practice-generate.api';
import { useState } from 'react';
import { PracticeStepAllData } from '../types';
import { parseQueryError } from '../../../../../helpers/fetchBaseQuery.error';
import practiceGenSlice from '../../../../../features/tests/stores/practiceGenSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';

export default function useGeneratePractice() {
	const dispatch = useAppDispatch();

	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const genStatus = useAppSelector(practiceGenSlice.selectors.selectGenStatus);

	const [getGeneratedQuestions] = useLazyGetSuggestQuestionsQuery();

	const handleGeneratePractice = async (allStepData: PracticeStepAllData) => {
		setErrorMessage(null);
		// If already generating, do not start a new request
		if (genStatus !== "none") {
			setErrorMessage("There is already a generation in progress.");
			return;
		}
		else {
			try {
				const request = stepDataToRequest(allStepData, null);
				const response = await getGeneratedQuestions(request).unwrap();

				dispatch(practiceGenSlice.actions.initializePolling({
					data: request,
					requestKey: response.requestKey,
				}));
			} catch (error: any) {
				const message = parseQueryError(error);
				dispatch(practiceGenSlice.actions.setApiError(message));
			}
		}
	}

	return {
		handleGeneratePractice,
		errorMessage,
	}
}

const stepDataToRequest = (
	allStepData: PracticeStepAllData,
	requestKey: string | null
): GetSuggestQuestionsRequest => {
	const { title, language, minutesToAnswer, numberOfQuestions, questionType } = allStepData.step1;
	const { difficulty, description, outlines, tags } = allStepData.step2;

	return {
		title,
		description,
		language,
		minutesToAnswer,
		difficulty,
		numberOfOptions: 4,
		numberOfQuestions,
		tags,
		outlines,
		requestKey,
		questionType,
	};
}