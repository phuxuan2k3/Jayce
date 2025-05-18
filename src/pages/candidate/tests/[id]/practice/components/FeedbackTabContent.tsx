import React from 'react';
import { StarIcon, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import useFeedbackTab from '../hooks/useFeedbackTab';
import { parseQueryError } from '../../../../../../helpers/fetchBaseQuery.error';

const FeedbackTabContent: React.FC = () => {
	const {
		data: { practice },
		isLoading,
		feedback,
		setFeedback,
		submitFeedback,
		postFeedbackState,
	} = useFeedbackTab();

	// Handle rating change
	const handleRatingChange = (rating: number) => {
		const updatedFeedback = { ...feedback, rating };
		setFeedback(updatedFeedback);
	};

	// Handle comment change
	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const updatedFeedback = { ...feedback, comment: e.target.value };
		setFeedback(updatedFeedback);
	};

	// Handle problem selection
	const handleProblemChange = (problem: string) => {
		const updatedProblems = feedback.problems.includes(problem)
			? feedback.problems.filter(p => p !== problem)
			: [...feedback.problems, problem];
		const updatedFeedback = {
			...feedback,
			problems: updatedProblems,
		};
		setFeedback(updatedFeedback);
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center p-8">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				<p className="mt-4 text-gray-600">Loading test feedback...</p>
			</div>
		);
	}

	if (!practice) {
		return (
			<div className="bg-white rounded-lg shadow-md p-6">
				<p className="text-gray-600">No test information available.</p>
			</div>
		);
	}

	// Check if this is not a practice test (no feedback can be provided)
	if (practice.mode !== 'practice') {
		return (
			<div className="bg-white rounded-lg shadow-md p-6">
				<p className="text-gray-600 italic">Feedback is only available for practice tests.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
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
								onClick={() => handleRatingChange(index + 1)}
								className={`w-8 h-8 rounded-full focus:outline-none ${index < feedback.rating
									? 'bg-yellow-500 text-white'
									: 'bg-gray-200 text-gray-600'
									}`}
							>
								{index + 1}
							</button>
						))}
					</div>
					<span className="ml-4 text-lg font-medium">
						{feedback.rating > 0 ? `${feedback.rating}/10` : 'Not rated'}
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
						value={feedback.comment || ''}
						onChange={handleCommentChange}
					></textarea>
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
									checked={feedback.problems.findIndex(problem => problem === option.value) !== -1}
									onChange={() => handleProblemChange(option.value)}
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

			{/* Prompt Information Section */}
			<div className="bg-white rounded-lg shadow-md p-6">
				<h3 className="text-lg font-semibold mb-4 flex items-center">
					<Sparkles className="mr-2 text-primary" size={20} />
					Test Generation Information
				</h3>

				<div className="grid grid-cols-2 gap-6">
					<div>
						<h4 className="font-medium text-gray-700 mb-2">Test Parameters</h4>
						<ul className="space-y-2 text-gray-600">
							<li className="flex items-center">
								<span className="font-semibold mr-2">Difficulty:</span>
								{practice.difficulty}
							</li>
							<li className="flex items-center">
								<span className="font-semibold mr-2">Questions:</span>
								{practice.numberOfQuestions}
							</li>
							<li className="flex items-center">
								<span className="font-semibold mr-2">Options per Question:</span>
								{practice.numberOfOptions}
							</li>
							<li className="flex items-center">
								<span className="font-semibold mr-2">Duration:</span>
								{practice.minutesToAnswer} minutes
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-medium text-gray-700 mb-2">Topics</h4>
						<div className="flex flex-wrap gap-2 mb-4">
							{practice.tags.map((tag, index) => (
								<span
									key={index}
									className="px-2 py-1 bg-primary-toned-100 text-primary-toned-700 rounded-full text-sm"
								>
									{tag}
								</span>
							))}
						</div>

						<h4 className="font-medium text-gray-700 mb-2 mt-4">Outlines</h4>
						<ul className="list-disc list-inside space-y-1 text-gray-600">
							{practice.outlines.map((outline, index) => (
								<li key={index}>{outline}</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Submit Button */}
			<div className="flex justify-between items-center">
				<p className="text-sm text-gray-500">
					Your feedback helps us improve the test experience.
				</p>
				{postFeedbackState.isSuccess && (
					<p className="text-sm text-green-500">
						Feedback submitted successfully!
					</p>
				)}
				<button
					className={`px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors ${postFeedbackState.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
					onClick={submitFeedback}
				>
					{postFeedbackState.isLoading ? "Loading..." : "Submit Feedback"}
				</button>
			</div>

			{postFeedbackState.error != null && (
				<div className="fixed bottom-0 left-0 right-0 p-4 bg-red-500 text-white text-center">
					<p className="text-sm">
						{parseQueryError(postFeedbackState.error) || 'An error occurred while submitting feedback.'}
					</p>
					<button
						className="mt-2 px-4 py-2 bg-red-700 rounded-lg text-sm font-semibold hover:bg-red-800 transition-colors"
						onClick={() => postFeedbackState.reset()}
					>
						Try Again
					</button>
				</div>
			)}
		</div >
	);
};

export default FeedbackTabContent;

const PROBLEM_OPTIONS = [
	{ value: 'inaccurate', label: 'Inaccurate Content' },
	{ value: 'un-related', label: 'Unrelated to Topic' },
	{ value: 'poor content', label: 'Poor Quality Content' },
	{ value: 'incomplete', label: 'Incomplete Content' },
	{ value: 'repeated', label: 'Repeated Questions' },
	{ value: 'error', label: 'Technical Error' },
	{ value: 'other', label: 'Other' }
];