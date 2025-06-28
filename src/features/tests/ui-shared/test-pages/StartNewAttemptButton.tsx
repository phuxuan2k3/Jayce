import { useNavigate } from 'react-router-dom';
import { usePostAttemptsMutation } from '../../api/test.api-gen-v2';
import useGetTestIdParams from '../../hooks/useGetTestIdParams';
import MyButtonWithLoading from '../../ui/buttons/MyButtonWithLoading';
import useActionStateWatch from '../../hooks/useActionStateWatch';
import { toast } from 'react-toastify';
import { parseQueryError } from '../../../../helpers/fetchBaseQuery.error';
import paths from '../../../../router/paths';

export default function StartNewAttemptButton() {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();

	const [postAttempts, state] = usePostAttemptsMutation();
	useActionStateWatch(state, {
		onSuccess: ({ attemptId }) => {
			toast.success('New attempt started successfully');
			navigate(paths.candidate.tests.in(testId).attempts.in(attemptId).DO);
		},
		onError: (error) => {
			const errorMessage = parseQueryError(error);
			toast.error(`Error starting new attempt: ${errorMessage || 'Unknown error'}`);
			console.error('Error starting new attempt:', errorMessage);
		}
	});

	return (
		<MyButtonWithLoading
			loading={state.isLoading}
			onClick={() => postAttempts({ body: { testId } })}
		>
			Start New Attempt
		</MyButtonWithLoading>
	)
}
