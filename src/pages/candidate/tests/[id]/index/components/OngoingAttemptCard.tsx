import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface OngoingAttemptCardProps {
	attempt: {
		id: string;
		createdAt: string;
		secondsSpent: number;
	};
	formatSeconds: (seconds: number) => string;
	onContinue: (attemptId: string) => void;
}

const OngoingAttemptCard: React.FC<OngoingAttemptCardProps> = ({ attempt, formatSeconds, onContinue }) => {
	return (
		<div className="mb-6">
			<h3 className="text-lg font-semibold mb-3">Ongoing Attempt</h3>
			<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-sm">
				<div className="flex justify-between items-center">
					<div>
						<p className="font-medium text-gray-800">
							Started {formatDistanceToNow(new Date(attempt.createdAt), { addSuffix: true })}
						</p>
						<p className="text-sm text-gray-600 mt-1">
							Time spent so far: {formatSeconds(attempt.secondsSpent)}
						</p>
					</div>
					<button
						className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
						onClick={() => onContinue(attempt.id)}
					>
						Continue Test
					</button>
				</div>
			</div>
		</div>
	);
};

export default OngoingAttemptCard;