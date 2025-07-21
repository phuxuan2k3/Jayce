import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { usePostTestsMutation } from '../../../features/tests/api/test.api-gen-v2';
import practiceGenSlice from '../../../features/tests/stores/practiceGenSlice';
import { parseQueryError } from '../../../helpers/fetchBaseQuery.error';

export default function usePracticeGenSaving() {
	const [createTest] = usePostTestsMutation();
	const responseData = useAppSelector(practiceGenSlice.selectors.selectResponseData);
	const requestData = useAppSelector(practiceGenSlice.selectors.selectRequestData);
	const genStatus = useAppSelector(practiceGenSlice.selectors.selectGenStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (genStatus === "saving") {
			if (responseData !== null && requestData !== null) {
				const saveGeneratedQuestions = async () => {
					try {
						const {
							title,
							description,
							language,
							minutesToAnswer,
							difficulty,
							numberOfOptions = 4, // Default value if not provided
							numberOfQuestions,
							outlines,
							tags,
						} = requestData;
						// Assuming createTest expects an array of questions
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
								questions: responseData,
							},
						}).unwrap();

						dispatch(practiceGenSlice.actions.savedResponse(testId));
					} catch (error) {
						const errorMessage = parseQueryError(error);
						dispatch(practiceGenSlice.actions.setApiError(errorMessage));
					}
				};
				// Call the function to save the generated questions
				saveGeneratedQuestions();
			} else {
				dispatch(practiceGenSlice.actions.acknowledgeGeneratedTest());
			}
		}
	}, [genStatus, responseData, createTest, requestData, dispatch]);
}


