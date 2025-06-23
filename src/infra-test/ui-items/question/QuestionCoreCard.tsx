import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { QuestionCoreSchema } from '../../api/test.api-gen-v2';
import Question from './QuestionPrimitives';
import { cn } from '../../../app/cn';

interface QuestionCoreCardProps {
	question: QuestionCoreSchema;
	showCorrectAnswer?: boolean;
	className?: string;
}

/**
 * Displays brief information about a question with expandable details.
 */
export default function QuestionCoreCard({
	question,
	showCorrectAnswer = false,
	className = ""
}: QuestionCoreCardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className={cn(`bg-white border border-primary-toned-200 rounded-lg shadow-sm hover:shadow-md transition-shadow`, className)}>
			{/* Brief Information - Always Visible */}
			<div className="p-4">
				<div className="flex items-start justify-between gap-3">
					{/* Question Info */}
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-2">
							<span className="bg-primary-toned-100 text-primary-toned-700 px-2 py-1 rounded text-xs font-medium">
								{question.points} {question.points === 1 ? 'point' : 'points'}
							</span>
							<span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
								{question.type}
							</span>
						</div>

						<h4 className="text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed">
							{question.text}
						</h4>

						{/* Brief preview for MCQ */}
						{question.type === 'MCQ' && question.detail.type === "MCQ" && !isExpanded && (
							<p className="text-xs text-gray-500 mt-2">
								{question.detail.options.length} options available
							</p>
						)}

						{/* Brief preview for Long Answer */}
						{question.type === 'LONG_ANSWER' && question.detail.type === "LONG_ANSWER" && !isExpanded && (
							<div className="mt-2">
								{question.detail.extraText && (
									<p className="text-xs text-gray-500">Has additional instructions</p>
								)}
								{question.detail.imageLinks && question.detail.imageLinks.length > 0 && (
									<p className="text-xs text-gray-500">
										Has {question.detail.imageLinks.length} image(s) attached
									</p>
								)}
							</div>
						)}
					</div>

					{/* Expand/Collapse Button */}
					<button
						onClick={toggleExpanded}
						className="flex-shrink-0 p-2 rounded-md hover:bg-gray-100 transition-colors"
						aria-label={isExpanded ? 'Show less' : 'Show more'}
					>
						{isExpanded ? (
							<ChevronUpIcon className="w-4 h-4 text-gray-500" />
						) : (
							<ChevronDownIcon className="w-4 h-4 text-gray-500" />
						)}
					</button>
				</div>
			</div>

			{/* Expanded Details */}
			{isExpanded && (
				<div className="border-t border-gray-200">
					<Question
						question={question}
						mode="review"
						showCorrectAnswer={showCorrectAnswer}
					>
						<Question.Text />
						<Question.Images />
						<Question.ExtraText />
						<Question.Options />
						<Question.LongAnswerDisplay />
					</Question>
				</div>
			)}
		</div>
	);
}
