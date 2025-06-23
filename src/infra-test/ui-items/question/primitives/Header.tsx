import React from 'react';
import { useQuestion } from './context';

const Header: React.FC = () => {
	const {
		question,
		questionIndex,
		totalQuestions,
		mode,
		onToggleFlag,
		isFlagged,
	} = useQuestion();

	return (
		<div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
			<div className="flex items-center gap-3">
				{questionIndex !== undefined && (
					<div className="bg-primary-toned-100 text-primary-toned-700 font-semibold px-3 py-1 rounded-full text-sm">
						{totalQuestions ? `${questionIndex + 1} of ${totalQuestions}` : `Question ${questionIndex + 1}`}
					</div>
				)}
				<div className="bg-primary-toned-50 text-primary-toned-600 px-3 py-1 rounded-lg text-sm font-medium">
					{question.points} {question.points === 1 ? 'point' : 'points'}
				</div>
			</div>

			<div className="flex items-center gap-2">
				{mode === 'exam' && onToggleFlag && (
					<button
						onClick={onToggleFlag}
						className={`p-2 rounded-md transition-colors ${isFlagged
							? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
							: 'bg-gray-100 text-gray-500 hover:bg-gray-200'
							}`}
						title={isFlagged ? 'Remove flag' : 'Flag question'}
					>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 01.8 1.6l-3.5 4.4 3.5 4.4A1 1 0 0116 16H4a1 1 0 01-1-1V5z" clipRule="evenodd" />
						</svg>
					</button>
				)}
			</div>
		</div>
	);
};

export default Header;
