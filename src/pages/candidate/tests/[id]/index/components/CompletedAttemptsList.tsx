import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';

interface Attempt {
	id: string;
	createdAt: string;
	secondsSpent: number;
}

interface CompletedAttemptsListProps {
	attempts: Attempt[];
	page: number;
	perPage: number;
	formatSeconds: (seconds: number) => string;
	onViewAttempt: (attemptId: string) => void;
}

const CompletedAttemptsList: React.FC<CompletedAttemptsListProps> = ({
	attempts,
	page,
	perPage,
	formatSeconds,
	onViewAttempt,
}) => {
	if (attempts.length === 0) {
		return (
			<div className="bg-white rounded-lg shadow-md p-6 text-center">
				<p className="text-gray-600 mb-4">You don't have any completed attempts yet.</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto">
			<table className="w-full bg-white rounded-lg shadow-md">
				<thead className="bg-gray-50 text-gray-700">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
						<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
						<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time Spent</th>
						<th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{attempts.map((attempt, idx) => (
						<tr key={attempt.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewAttempt(attempt.id)}>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								{idx + 1 + (page - 1) * perPage}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div>{format(new Date(attempt.createdAt), "MMM d, yyyy")}</div>
								<div className="text-xs">{formatDistanceToNow(new Date(attempt.createdAt), { addSuffix: true })}</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{formatSeconds(attempt.secondsSpent)}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
								<button className="text-primary hover:text-primary-toned-600 transition-colors">
									View Details
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CompletedAttemptsList;