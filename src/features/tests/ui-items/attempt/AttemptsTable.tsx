import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { AttemptCoreSchema } from '../../api/test.api-gen-v2';
import { AttemptUtils } from './attempt-utils';
import { cn } from '../../../../app/cn';
import { useGetUsersQuery } from '../../../auth/api/auth-profile.api';
import FetchStateCover2 from '../../ui/fetch-states/FetchStateCover2';

interface Props {
	attempts: AttemptCoreSchema[];
	onItemClick?: (attempt: AttemptCoreSchema) => void;
	showCandidate?: boolean;
}

type AttemptCandidateMap = {
	[attemptId: string]: {
		candidateId: string;
		candidateName: string;
		candidateAvatar?: string;
	};
};

const AttemptsTable: React.FC<Props> = ({
	attempts,
	onItemClick,
	showCandidate = false,
}) => {
	const candidateIds = attempts.reduce((acc: Set<string>, attempt) => {
		if (attempt.candidateId) {
			acc.add(attempt.candidateId);
		}
		return acc;
	}, new Set<string>());

	const usersQuery = useGetUsersQuery({
		user_ids: Array.from(candidateIds),
	}, {
		skip: candidateIds.size === 0 || showCandidate === false,
	});

	if (attempts.length === 0) {
		return (
			<div className="bg-white rounded-lg shadow-md p-6 text-center">
				<p className="text-gray-600 mb-4">You don't have any completed attempts yet.</p>
			</div>
		);
	}

	if (showCandidate === false) {
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
	}

	return (
		<FetchStateCover2
			fetchState={usersQuery}
			dataComponent={({ users }) => {
				const userMap: AttemptCandidateMap = {};
				if (users) {
					users.forEach(user => {
						userMap[user.id] = {
							candidateId: user.id,
							candidateName: user.metadata.fullname || 'Unknown User',
							candidateAvatar: user.metadata.avatarPath || undefined,
						};
					});
				}
				return (
					<div className='overflow-x-auto w-full rounded-lg border border-primary-toned-200 shadow-md'>
						<table className="w-full bg-white">
							<thead className="bg-primary-toned-700 text-white font-bold">
								<tr>
									<th className="px-6 py-3 text-left tracking-wider">#</th>
									<th className="px-6 py-3 text-left tracking-wider">Candidate</th>
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
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className="flex flex-col items-start">
												{userMap[attempt.candidateId] ? (
													<UserInfo user={userMap[attempt.candidateId]} />
												) : (
													<span className="text-gray-500">Unknown User</span>
												)}
											</div>
										</td>
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
				)
			}}
		/>
	);
};

export default AttemptsTable;

const formatSeconds = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}m ${remainingSeconds}s`;
};

const UserInfo = ({ user }: { user: AttemptCandidateMap[string] }) => {
	return (
		<div className="flex items-center gap-2">
			<img
				src={user.candidateAvatar || '/default-avatar.png'}
				alt={user.candidateName}
				className="w-6 h-6 rounded-full"
			/>
			<span className="text-sm text-gray-600">
				{user.candidateName}
			</span>
		</div>
	);
}

