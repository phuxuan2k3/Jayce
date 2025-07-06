import { toast } from 'react-toastify';
import { usePatchAttemptsByAttemptIdSubmitMutation } from '../../../../../../../../features/tests/api/test.api-gen-v2';
import useActionStateWatch from '../../../../../../../../features/tests/hooks/useActionStateWatch';
import { parseQueryError } from '../../../../../../../../helpers/fetchBaseQuery.error';
import paths from '../../../../../../../../router/paths';
import { useNavigate } from 'react-router-dom';
import useGetTestIdParams from '../../../../../../../../features/tests/hooks/useGetTestIdParams';
import useHandleSubmitAnswers from './useHandleSubmitAnswers';
import testDoSlice from '../../../../../../../../features/tests/stores/testDoSlice';
import useGetAttemptIdParams from '../../../../../../../../features/tests/hooks/useGetAttemptIdParams';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import { useCallback, useState } from 'react';

export default function useSubmitAttempt() {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const attemptId = useGetAttemptIdParams();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const attemptState = useAppSelector((state) => testDoSlice.selectors.selectAttempt(state, attemptId));
	const dispatch = useAppDispatch();

	const { handleSubmitAnswers } = useHandleSubmitAnswers({
		// This will be called after the answers are submitted
		onSuccess: () => {
			// We are submitting the attempt now
			if (isSubmitting) {
				patchSubmit({ attemptId });
			}
		}
	});

	const [patchSubmit, submitState] = usePatchAttemptsByAttemptIdSubmitMutation();
	useActionStateWatch(submitState, {
		onSuccess: () => {
			toast.success("Attempt submitted successfully");
			navigate(paths.candidate.tests.in(testId).ROOT);
			setIsSubmitting(false);
			dispatch(testDoSlice.actions.clearAttempt(attemptId));
		},
		onError: (error) => {
			console.error("Failed to submit attempt:", error);
			const errorMessage = parseQueryError(error);
			toast.error("Failed to submit attempt: " + errorMessage);
		}
	});

	const handleSubmitAttempt = useCallback(() => {
		if (attemptState == null) {
			toast.error("Attempt not found");
			return;
		}

		// Handle submitting answers that are not yet sent to the server
		handleSubmitAnswers();
		setIsSubmitting(true);
	}, [attemptState]);

	return {
		handleSubmitAttempt,
		isSubmitting: isSubmitting || submitState.isLoading,
	}
}
