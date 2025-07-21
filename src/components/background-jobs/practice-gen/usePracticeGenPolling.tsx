import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import practiceGenSlice from '../../../features/tests/stores/practiceGenSlice';
import { useLazyGetSuggestQuestionsQuery } from '../../../features/tests/api/practice-generate.api';
import { parseQueryError } from '../../../helpers/fetchBaseQuery.error';

export default function usePracticeGenPolling() {
	const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null);

	const requestKey = useAppSelector(practiceGenSlice.selectors.selectRequestKey);
	const requestData = useAppSelector(practiceGenSlice.selectors.selectRequestData);
	const dispatch = useAppDispatch();

	const [pollQuestions] = useLazyGetSuggestQuestionsQuery();


	useEffect(() => {
		if (requestKey !== null && requestData !== null && intervalId === null) {
			setIntervalId((prevId) => {
				if (prevId) {
					clearInterval(prevId);
				}
				return setInterval(async () => {
					try {
						const response = await pollQuestions({
							...requestData,
							requestKey: requestKey,
						}).unwrap();

						if (response.questions) {
							dispatch(practiceGenSlice.actions.donePolling(response.questions));
							clearInterval(intervalId!);
							setIntervalId(null);
						}
					} catch (error) {
						const message = parseQueryError(error);
						dispatch(practiceGenSlice.actions.setApiError(message));
					}
				}, 10000); // Poll every 10 seconds
			});
		} else if (requestKey === null && intervalId !== null) {
			clearInterval(intervalId);
			setIntervalId(null);
		}
	}, [requestKey, requestData, intervalId, dispatch, pollQuestions]);
}

