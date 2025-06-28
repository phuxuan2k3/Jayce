import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { AttemptCoreSchema } from '../../api/test.api-gen-v2';

interface Props {
	attempts: AttemptCoreSchema[];
	onItemClick?: (attempt: AttemptCoreSchema) => void;
	baseIndex?: number;
}

const AttemptsTable: React.FC<Props> = ({
	baseIndex,
	attempts,
	onItemClick,
}) => {

	if (attempts.length === 0) {
		return (
			<div className="bg-white rounded-lg shadow-md p-6 text-center">
				<p className="text-gray-600 mb-4">You don't have any completed attempts yet.</p>
			</div>
		);
	}

	return (
		<table className="w-full bg-white rounded-lg shadow-md">
			<thead className="bg-gray-50 text-gray-700">
				<tr>
					<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
					<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
					<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Score</th>
					<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time Spent</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200">
				{attempts.map((attempt, idx) => (
					<tr
						key={attempt.id}
						className="hover:bg-gray-50 cursor-pointer"
						onClick={() => onItemClick?.(attempt)}
					>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							{baseIndex ? baseIndex + idx + 1 : idx + 1}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							<div>{format(new Date(attempt.createdAt), "MMM d, yyyy")}</div>
							<div className="text-xs">{formatDistanceToNow(new Date(attempt.createdAt), { addSuffix: true })}</div>
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							{attempt.hasEnded ? (
								<span className="text-green-600 font-semibold">{attempt._aggregate.points}</span>
							) : (
								<span className="text-red-600 font-semibold">In Progress</span>
							)}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							{formatSeconds(attempt.secondsSpent)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default AttemptsTable;

const formatSeconds = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}m ${remainingSeconds}s`;
};