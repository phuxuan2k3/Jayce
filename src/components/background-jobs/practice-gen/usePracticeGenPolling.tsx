import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import practiceGenSlice from '../../../features/tests/stores/practiceGenSlice';
import { useLazyGetSuggestQuestionsQuery } from '../../../features/tests/api/practice-generate.api';
import { parseQueryError } from '../../../helpers/fetchBaseQuery.error';

export default function usePracticeGenPolling() {
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const requestKey = useAppSelector(practiceGenSlice.selectors.selectRequestKey);
	const requestData = useAppSelector(practiceGenSlice.selectors.selectRequestData);
	const dispatch = useAppDispatch();
	const genStatus = useAppSelector(practiceGenSlice.selectors.selectGenStatus);

	// Create refs to hold current values
	const requestKeyRef = useRef(requestKey);
	const requestDataRef = useRef(requestData);
	const genStatusRef = useRef(genStatus);

	// Update refs when values change
	requestKeyRef.current = requestKey;
	requestDataRef.current = requestData;
	genStatusRef.current = genStatus;

	const [pollQuestions] = useLazyGetSuggestQuestionsQuery();

	// Function to clear interval safely
	const clearCurrentInterval = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	useEffect(() => {
		// Clear any existing interval first
		clearCurrentInterval();

		if (requestKey !== null && genStatus === "generating") {
			intervalRef.current = setInterval(async () => {
				if (
					requestKeyRef.current != null &&
					genStatusRef.current === "generating" &&
					requestDataRef.current != null
				) {
					try {
						console.log("Polling for questions with requestKey:", requestKeyRef.current, genStatusRef.current, requestDataRef.current);
						const response = await pollQuestions({
							...requestDataRef.current,
							requestKey: requestKeyRef.current,
						}).unwrap();
						if (response.questions.length > 0) {
							dispatch(practiceGenSlice.actions.donePolling(response.questions));
							clearCurrentInterval(); // Clear the interval properly
						}
					} catch (error) {
						const message = parseQueryError(error);
						dispatch(practiceGenSlice.actions.setApiError(message));
					}
				}
			}, 10000);
		}

		// Cleanup function
		return () => {
			clearCurrentInterval();
		};
	}, [requestKey, genStatus, dispatch, pollQuestions]);
}
