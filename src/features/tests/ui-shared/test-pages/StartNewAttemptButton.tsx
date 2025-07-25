import { useNavigate } from 'react-router-dom';
import { usePostAttemptsMutation } from '../../api/test.api-gen-v2';
import useGetTestIdParams from '../../hooks/useGetTestIdParams';
import MyButtonWithLoading from '../../ui/buttons/MyButtonWithLoading';
import useActionStateWatch from '../../hooks/useActionStateWatch';
import { toast } from 'react-toastify';
import { parseQueryError } from '../../../../helpers/fetchBaseQuery.error';
import paths from '../../../../router/paths';
import { cn } from '../../../../app/cn';
import { useLanguage } from '../../../../LanguageProvider';

export default function StartNewAttemptButton({
	className = '',
}: {
	className?: string;
}) {
	const { t } = useLanguage();
	
	const testId = useGetTestIdParams();
	const navigate = useNavigate();

	const [postAttempts, state] = usePostAttemptsMutation();
	useActionStateWatch(state, {
		onSuccess: ({ attemptId }) => {
			toast.success(t("start_attempt_success"));
			navigate(paths.candidate.tests.in(testId).attempts.in(attemptId).DO);
		},
		onError: (error) => {
			const errorMessage = parseQueryError(error);
			toast.error(`${errorMessage || t("unknown_error")}`);
			console.error('Error starting new attempt:', errorMessage);
		}
	});

	return (
		<MyButtonWithLoading
			className={cn(`w-full`, className)}
			loading={state.isLoading}
			onClick={() => postAttempts({ body: { testId } })}
		>
			{t("start_attempt_button")}
		</MyButtonWithLoading>
	)
}
