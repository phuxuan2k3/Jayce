import React from 'react';
import { StarIcon, AlertCircle, MessageSquare } from 'lucide-react';
import { parseQueryError } from '../../../../../../helpers/fetchBaseQuery.error';
import { toast } from 'react-toastify';
import { usePostFeedbacksMutation } from '../../../../../../features/tests/api/test.api-gen-v2';
import useActionStateWatch from '../../../../../../features/tests/hooks/useActionStateWatch';
import useGetTestIdParams from '../../../../../../features/tests/hooks/useGetTestIdParams';
import MyButtonWithLoading from '../../../../../../features/tests/ui/buttons/MyButtonWithLoading';

export default function FeedbackTabContent() {
	const testId = useGetTestIdParams();

	const [rating, setRating] = React.useState(0);
	const [comment, setComment] = React.useState('');
	const [problems, setProblems] = React.useState<ProblemOption[]>([]);

	const [postFeedback, state] = usePostFeedbacksMutation();
	useActionStateWatch(state, {
		onSuccess: () => {
			toast.success('Feedback submitted successfully!');
			setRating(0);
			setComment('');
			setProblems([]);
		},
		onError: (error) => {
			toast.error(`Error submitting feedback: ${parseQueryError(error)}`);
			console.error('Error submitting feedback:', parseQueryError(error));
		}
	});

	return (
		<div className="flex flex-col gap-6">
			<div className='bg-white rounded-lg shadow-md p-6 mb-6'>
				<h2 className="text-2xl font-bold mb-4">Test Feedback</h2>
				<p className="text-gray-600 mb-4">
					We value your feedback on this test. Please provide your rating, comments, and any problems you encountered.
				</p>
				<p className="text-gray-600 mb-6">
					Let us know your feedback about this test. Your input helps us improve the quality of our tests and provide a better experience for all users.
				</p>
			</div>

			{/* Rating Section */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h3 className="text-lg font-semibold mb-4 flex items-center">
					<StarIcon className="mr-2 text-yellow-500" size={20} />
					Test Rating
				</h3>

				<div className="flex items-center mb-6">
					<div className="flex space-x-1">
						{[...Array(10)].map((_, index) => (
							<button
								key={index}
								onClick={() => setRating(index + 1)}
								className={`w-8 h-8 rounded-full focus:outline-none ${index < rating
									? 'bg-yellow-500 text-white'
									: 'bg-gray-200 text-gray-600'
									}`}
							>
								{index + 1}
							</button>
						))}
						<button
							onClick={() => setRating(0)}
							className={`w-8 h-8 rounded-full focus:outline-none ${rating === 0
								? 'bg-yellow-500 text-white'
								: 'bg-gray-200 text-gray-600'
								}`}
						>
							Clear
						</button>
					</div>
					<span className="ml-4 text-lg font-medium">
						{rating > 0 ? `${rating}/10` : 'Not rated'}
					</span>
				</div>

				<div className="mb-4">
					<label htmlFor="comment" className="mb-2 text-sm font-medium text-gray-700 flex items-center">
						<MessageSquare className="mr-2 text-primary" size={16} />
						Your Comments
					</label>
					<textarea
						id="comment"
						rows={4}
						className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
						placeholder="Share your thoughts about this test..."
						value={comment || ''}
						onChange={(e) => setComment(e.target.value)}
					/>
				</div>

				<div>
					<label className="mb-2 text-sm font-medium text-gray-700 flex items-center">
						<AlertCircle className="mr-2 text-red-500" size={16} />
						Report a Problem
					</label>
					<div className="grid grid-cols-2 gap-2">
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
									{option.label}
								</label>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="flex justify-between items-center">
				<p className="text-sm text-gray-500">
					Your feedback helps us improve the test experience.
				</p>
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
				>
					{state.isLoading ? 'Submitting...' : 'Submit Feedback'}
				</MyButtonWithLoading>
			</div>
		</div >
	);
};

const PROBLEM_OPTIONS = [
	{ value: 'inaccurate', label: 'Inaccurate Content' },
	{ value: 'un-related', label: 'Unrelated to Topic' },
	{ value: 'poor content', label: 'Poor Quality Content' },
	{ value: 'incomplete', label: 'Incomplete Content' },
	{ value: 'repeated', label: 'Repeated Questions' },
	{ value: 'error', label: 'Technical Error' },
	{ value: 'other', label: 'Other' }
] as const;

type ProblemOption = (typeof PROBLEM_OPTIONS)[number]['value'];
