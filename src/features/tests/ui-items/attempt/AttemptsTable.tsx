import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { AttemptCoreSchema } from '../../api/test.api-gen-v2';
import { AttemptUtils } from './attempt-utils';
import { cn } from '../../../../app/cn';

interface Props {
	attempts: AttemptCoreSchema[];
	onItemClick?: (attempt: AttemptCoreSchema) => void;
}

const AttemptsTable: React.FC<Props> = ({
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
		<div className='overflow-x-auto w-full rounded-lg border border-primary-toned-200 shadow-md'>
			<table className="w-full bg-white">
				<thead className="bg-primary-toned-700 text-white font-bold">
					<tr>
						<th className="px-6 py-3 text-left tracking-wider">Order #</th>
						<th className="px-6 py-3 text-left tracking-wider">Date</th>
						<th className="px-6 py-3 text-left tracking-wider">Score</th>
						<th className="px-6 py-3 text-left tracking-wider">Time Spent</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{attempts.map((attempt) => (
						<tr
							key={attempt.id}
							className="hover:bg-gray-50 cursor-pointer"
							onClick={() => onItemClick?.(attempt)}
						>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								{attempt.order}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div>{format(new Date(attempt.createdAt), "MMM d, yyyy")}</div>
								<div className="text-xs">{formatDistanceToNow(new Date(attempt.createdAt), { addSuffix: true })}</div>
							</td>
							<td className={cn("px-6 py-4 whitespace-nowrap text-sm font-semibold", AttemptUtils.status(attempt.status).fontColor)}>
								{attempt.status === "GRADED" ? attempt._aggregate.points : AttemptUtils.status(attempt.status).text}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{formatSeconds(attempt.secondsSpent)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AttemptsTable;

const formatSeconds = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}m ${remainingSeconds}s`;
};