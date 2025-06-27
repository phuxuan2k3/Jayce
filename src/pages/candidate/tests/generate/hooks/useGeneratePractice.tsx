import { useNavigate } from 'react-router-dom';
import { PracticeGenerationActionTypes, PracticeGenerationReducer } from '../reducers/reducer-types';
import { useLazyGetSuggestQuestionsQuery } from '../../../../../infra-test/api/prompt.api-custom';
import paths from '../../../../../router/paths';
import { PracticeGenerationLoadingState } from '../types';
import usePracticeGenerationSelectors from '../reducers/practice-generation.selector';
import { parseQueryError } from '../../../../../helpers/fetchBaseQuery.error';
import { usePostTestsMutation } from '../../../../../infra-test/api/test.api-gen-v2';

export default function useGeneratePractice({
	state,
	dispatch,
}: PracticeGenerationReducer) {
	const navigate = useNavigate();
	const [createTest] = usePostTestsMutation();
	const [getGeneratedQuestions] = useLazyGetSuggestQuestionsQuery();

	const { finalData } = usePracticeGenerationSelectors({ state });

	const setLoadingState = (loadingState: PracticeGenerationLoadingState) => {
		dispatch({
			type: PracticeGenerationActionTypes.SET_LOADING_STATE,
			payload: loadingState,
		});
	}

	const setApiError = (error: string | null) => {
		dispatch({
			type: PracticeGenerationActionTypes.SET_API_ERROR,
			payload: error,
		});
	}

	const handleGeneratePractice = async () => {
		try {
			setLoadingState("generating");

			const generatedQuestions = await getGeneratedQuestions({
				...finalData,
			}).unwrap();

			if (generatedQuestions.questions.length === 0) {
				setLoadingState("none");
				setApiError("No questions generated. Please try again with different parameters.");
				return;
			}

			setLoadingState("saving");

			const createdTest = await createTest({
				body: {
					title: finalData.title,
					description: finalData.description,
					mode: "PRACTICE",
					language: finalData.language,
					minutesToAnswer: finalData.minutesToAnswer,
					detail: {
						mode: "PRACTICE",
						difficulty: finalData.difficulty,
						numberOfOptions: finalData.numberOfOptions,
						numberOfQuestions: finalData.numberOfQuestions,
						outlines: finalData.outlines,
						tags: finalData.tags,
					},
					questions: generatedQuestions.questions.map((q) => ({
						text: q.text,
						points: q.points,
						type: "MCQ",
						detail: {
							type: "MCQ",
							correctOption: q.correctOption,
							options: q.options,
						},
					})),
				},
			}).unwrap();

			setLoadingState("none");
			navigate(paths.candidate.tests.in(createdTest.testId).PRACTICE);

		} catch (error: any) {
			const errorMessage = parseQueryError(error);
			if (errorMessage) {
				setApiError(errorMessage);
			} else {
				setApiError("An unknown error occurred");
			}
		}
	};

	return {
		handleGeneratePractice,
	}
}
