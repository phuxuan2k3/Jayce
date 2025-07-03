import { useNavigate } from 'react-router-dom';
import { usePostTestsMutation } from '../../../../../features/tests/api/test.api-gen-v2';
import { useLazyGetSuggestQuestionsQuery } from '../../../../../features/tests/api/practice-generate.api';
import { useState } from 'react';
import { PracticeStepAllData } from '../types';
import paths from '../../../../../router/paths';
import { parseQueryError } from '../../../../../helpers/fetchBaseQuery.error';

export default function useGeneratePractice() {
	const navigate = useNavigate();
	const [generationError, setGenerationError] = useState<string | null>(null);
	const [loadingState, setLoadingState] = useState<"none" | "generating" | "saving">("none");

	const [getGeneratedQuestions] = useLazyGetSuggestQuestionsQuery();
	const [createTest] = usePostTestsMutation();

	const handleGeneratePractice = async (allStepData: PracticeStepAllData) => {
		try {
			const { title, description, language, minutesToAnswer } = allStepData.step1;
			const { difficulty, numberOfOptions, numberOfQuestions, tags } = allStepData.step2;
			const { outlines } = allStepData.step3;

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
				setGenerationError("No questions generated. Please try again with different parameters.");
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
				setGenerationError(errorMessage);
			} else {
				setGenerationError("An unknown error occurred");
			}
		}
	};

	return {
		handleGeneratePractice,
		generationError,
		loadingState,
	}
}
