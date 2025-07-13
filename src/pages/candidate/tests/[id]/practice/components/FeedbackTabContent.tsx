import React from 'react';
import { StarIcon, AlertCircle, MessageSquare } from 'lucide-react';
import { parseQueryError } from '../../../../../../helpers/fetchBaseQuery.error';
import { toast } from 'react-toastify';
import { usePostFeedbacksMutation } from '../../../../../../features/tests/api/test.api-gen-v2';
import useActionStateWatch from '../../../../../../features/tests/hooks/useActionStateWatch';
import useGetTestIdParams from '../../../../../../features/tests/hooks/useGetTestIdParams';
import MyButtonWithLoading from '../../../../../../features/tests/ui/buttons/MyButtonWithLoading';
import { cn } from '../../../../../../app/cn';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import MyTextArea from '../../../../../../features/tests/ui/forms/MyTextArea';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function FeedbackTabContent() {
	const { t } = useLanguage();

	const testId = useGetTestIdParams();

	const [rating, setRating] = React.useState(0);
	const [comment, setComment] = React.useState('');
	const [problems, setProblems] = React.useState<ProblemOption[]>([]);

	const [postFeedback, state] = usePostFeedbacksMutation();
	useActionStateWatch(state, {
		onSuccess: () => {
			toast.success(t("feedback_submitted_successfully"));
			setRating(0);
			setComment('');
			setProblems([]);
		},
		onError: (error) => {
			toast.error(`Error submitting feedback: ${parseQueryError(error)}`);
			console.error(`${t("feedback_submitted_error")}:`, parseQueryError(error));
		}
	});

	return (
		<div className="flex flex-col gap-2 py-2 px-6">
			<h2 className="text-2xl font-bold text-primary">{t("feedback_title")}</h2>
			<div className='bg-primary-toned-50 border border-primary-toned-300 text-sm text-primary p-4 rounded-lg mb-4 flex flex-col gap-2 my-4'>
				<span>{t("feedback_note_1")}</span>
				<span>{t("feedback_note_2")}</span>
			</div>

			<h3 className="my-2 text-lg font-semibold flex items-center text-primary">
				<StarIcon className="mr-2" size={20} strokeWidth={2.5} />
				{t("feedback_rating_label")}
			</h3>

			<div className="flex flex-col items-start gap-2">
				<div className="flex items-center gap-1">
					{[...Array(10)].map((_, index) => {
						const starValue = index + 1;
						return (
							<button
								key={starValue}
								type="button"
								aria-label={`Rate ${starValue}`}
								onClick={() => setRating(starValue)}
								className={cn('group w-6 h-6 flex items-center justify-center focus:outline-none', {
									'text-yellow-500 scale-110': rating === starValue,
									'text-yellow-400': rating >= starValue,
									'text-gray-300': rating < starValue
								})}
							>
								<StarIcon
									fill={rating >= starValue ? '#facc15' : 'none'}
									stroke="#facc15"
									strokeWidth={2.2}
									size={28}
									className="transition-transform duration-100 group-hover:scale-125"
								/>
							</button>
						);
					})}
					<MyButton
						onClick={() => setRating(0)}
						type="button"
						variant={"gray"}
						size={"small"}
						className='ml-4'
					>
						{t("feedback_clear_rating")}
					</MyButton>
				</div>
				<span className="text-sm text-gray-700">
					{rating > 0 ? `${t("feedback_your_rating")}: ${rating}/10` : t("feedback_no_rating")}
				</span>
			</div>

			<h3 className="mt-4 text-lg font-semibold flex items-center text-primary">
				<MessageSquare className="mr-2" size={18} strokeWidth={2.5} />
				{t("feedback_comment_label")}
			</h3>
			<MyTextArea
				isAutoSized={false}
				rows={4}
				placeholder={t("feedback_comment_placeholder")}
				value={comment || ''}
				onChange={(e) => setComment(e.target.value)}
			/>

			<h3 className="mt-4 text-lg font-semibold flex items-center text-primary">
				<AlertCircle className="mr-2 text-red-500" size={18} strokeWidth={2.5} />
				{t("feedback_report_problem_label")}
			</h3>
			<div className="grid grid-cols-2 gap-x-2 gap-y-2 px-6 py-6 border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
				{PROBLEM_OPTIONS.map(option => (
					<div
						key={option.value}
						className="flex items-center"
					>
						<input
							type="checkbox"
							id={`problem-${option.value}`}
							name="problem"
							value={option.value}
							checked={problems.findIndex(problem => problem === option.value) !== -1}
							onChange={() => {
								setProblems(prev =>
									prev.includes(option.value)
										? prev.filter(p => p !== option.value)
										: [...prev, option.value]
								);
							}}
							className="h-4 w-4 border-gray-300 focus:ring-primary accent-primary"
						/>
						<label htmlFor={`problem-${option.value}`} className="ml-2 text-sm text-gray-700">
							{t(option.label)}
						</label>
					</div>
				))}
			</div>

			<hr className="my-2 border-gray-200" />

			<MyButtonWithLoading
				onClick={() => postFeedback({
					body: {
						testId,
						rating,
						comment,
						problems,
					}
				})}
				loading={state.isLoading}
				className='mt-4 w-1/3 self-end'
			>
				{state.isLoading ? t("feedback_submitting") : t("feedback_submit")}
			</MyButtonWithLoading>
		</div >
	);
};

const PROBLEM_OPTIONS = [
	{ value: 'inaccurate', label: 'feedback_problem_inaccurate' },
	{ value: 'un-related', label: 'feedback_problem_unrelated' },
	{ value: 'poor content', label: 'feedback_problem_poor_content' },
	{ value: 'incomplete', label: 'feedback_problem_incomplete' },
	{ value: 'repeated', label: 'feedback_problem_repeated' },
	{ value: 'error', label: 'feedback_problem_error' },
	{ value: 'other', label: 'feedback_problem_other' }
] as const;

type ProblemOption = (typeof PROBLEM_OPTIONS)[number]['value'];
