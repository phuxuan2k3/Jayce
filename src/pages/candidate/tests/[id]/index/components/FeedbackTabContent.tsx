import React, { useState } from 'react';
import { TestPractice } from '../../../../../../features/tests/model/test.model';
import { StarIcon, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';

interface FeedbackTabContentProps {
	isLoading: boolean;
	test: TestPractice | null;
	onFeedbackChange?: (feedback: TestPractice['feedback']) => void;
}

// Problem report options
const PROBLEM_OPTIONS = [
	{ value: 'inaccurate', label: 'Inaccurate Content' },
	{ value: 'un-related', label: 'Unrelated to Topic' },
	{ value: 'poor content', label: 'Poor Quality Content' },
	{ value: 'incomplete', label: 'Incomplete Content' },
	{ value: 'repeated', label: 'Repeated Questions' },
	{ value: 'error', label: 'Technical Error' },
	{ value: 'other', label: 'Other' }
];

const FeedbackTabContent: React.FC<FeedbackTabContentProps> = ({ isLoading, test, onFeedbackChange }) => {
	// Initialize feedback state from test or default values
	const [feedback, setFeedback] = useState<TestPractice['feedback']>(
		test?.feedback || { rating: 0 }
	);

	// Handle rating change
	const handleRatingChange = (rating: number) => {
		const updatedFeedback = { ...feedback, rating };
		setFeedback(updatedFeedback);
		if (onFeedbackChange) onFeedbackChange(updatedFeedback);
	};

	// Handle comment change
	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const updatedFeedback = { ...feedback, comment: e.target.value };
		setFeedback(updatedFeedback);
		if (onFeedbackChange) onFeedbackChange(updatedFeedback);
	};

	// Handle problem selection
	const handleProblemChange = (problem: string) => {
		const updatedFeedback = {
			...feedback,
			problems: problem as TestPractice['feedback']['problems']
		};
		setFeedback(updatedFeedback);
		if (onFeedbackChange) onFeedbackChange(updatedFeedback);
	};

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center p-8">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				<p className="mt-4 text-gray-600">Loading test feedback...</p>
			</div>
		);
	}

	if (!test) {
		return (
			<div className="bg-white rounded-lg shadow-md p-6">
				<p className="text-gray-600">No test information available.</p>
			</div>
		);
	}

	// Check if this is not a practice test (no feedback can be provided)
	if (test.mode !== 'practice') {
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
							<div key={option.value} className="flex items-center">
								<input
									type="radio"
									id={`problem-${option.value}`}
									name="problem"
									value={option.value}
									checked={feedback.problems === option.value}
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
								{test.difficulty}/5
							</li>
							<li className="flex items-center">
								<span className="font-semibold mr-2">Questions:</span>
								{test.numberOfQuestions}
							</li>
							<li className="flex items-center">
								<span className="font-semibold mr-2">Options per Question:</span>
								{test.numberOfOptions}
							</li>
							<li className="flex items-center">
								<span className="font-semibold mr-2">Duration:</span>
								{test.minutesToAnswer} minutes
							</li>
						</ul>
					</div>

					<div>
						<h4 className="font-medium text-gray-700 mb-2">Topics</h4>
						<div className="flex flex-wrap gap-2 mb-4">
							{test.tags.map((tag, index) => (
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
							{test.outlines.map((outline, index) => (
								<li key={index}>{outline}</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Submit Button */}
			<div className="flex justify-end">
				<button
					className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
					onClick={() => onFeedbackChange && onFeedbackChange(feedback)}
				>
					Submit Feedback
				</button>
			</div>
		</div>
	);
};

export default FeedbackTabContent;