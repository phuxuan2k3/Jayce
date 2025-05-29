import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../../../../router/paths';
import { AttemptCandidate } from '../../../types/attempt-candidate';

interface Props {
	data: AttemptCandidate[];
	page: number;
	perPage: number;
	onViewAttempt?: (attemptId: string) => void;
}

const AttemptList: React.FC<Props> = ({
	data,
	page,
	perPage,
	onViewAttempt,
}) => {
	const navigate = useNavigate();
	const handleAttemptClick = (attemptId: string) => {
		if (onViewAttempt) {
			onViewAttempt(attemptId);
		}
		else {
			navigate(paths.candidate.tests.attempts.in(attemptId).ROOT);
		}
	}

	if (data.length === 0) {
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
					<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Candidate</th>
					<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
					<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Score</th>
					<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time Spent</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-200">
				{data.map(({ attempt, candidate }, idx) => {
					return (
						<tr
							key={idx}
							className="hover:bg-gray-50 cursor-pointer"
							onClick={() => handleAttemptClick(attempt.id)}
						>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								{idx + 1 + (page - 1) * perPage}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div className='flex items-center'>
									<img src={candidate.avatarPath} alt={candidate.fullname} className="w-8 h-8 rounded-full mr-2" />
									{candidate.fullname}
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div>{format(new Date(attempt.createdAt), "MMM d, yyyy")}</div>
								<div className="text-xs">{formatDistanceToNow(new Date(attempt.createdAt), { addSuffix: true })}</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{attempt.hasEnded ? (
									<span className="text-green-600 font-semibold">{attempt.score}</span>
								) : (
									<span className="text-red-600 font-semibold">In Progress</span>
								)}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{formatSeconds(attempt.secondsSpent)}
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	);
};

export default AttemptList;

const formatSeconds = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}m ${remainingSeconds}s`;
};