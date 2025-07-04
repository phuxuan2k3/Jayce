import { useNavigate } from 'react-router-dom';
import { usePostAttemptsMutation } from '../../api/test.api-gen-v2';
import useGetTestIdParams from '../../hooks/useGetTestIdParams';
import MyButtonWithLoading from '../../ui/buttons/MyButtonWithLoading';
import useActionStateWatch from '../../hooks/useActionStateWatch';
import { toast } from 'react-toastify';
import { parseQueryError } from '../../../../helpers/fetchBaseQuery.error';
import paths from '../../../../router/paths';
import { cn } from '../../../../app/cn';

export default function StartNewAttemptButton({
	className = '',
}: {
	className?: string;
}) {
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
			toast.error(`${errorMessage || 'Unknown error'}`);
			console.error('Error starting new attempt:', errorMessage);
		}
	});

	return (
		<MyButtonWithLoading
			className={cn(`w-full`, className)}
			loading={state.isLoading}
			onClick={() => postAttempts({ body: { testId } })}
		>
			Start New Attempt
		</MyButtonWithLoading>
	)
}
