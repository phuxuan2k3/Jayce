import { UserInfo } from '../../../../../../features/auth/store/authSlice';
import { CandidateCoreSchema } from '../../../../../../infra-test/api/test.api-gen-v2';
import useMapUsers from '../../../../../../infra-test/hooks/useMapUsers';
import { getUserCore } from '../../../../../../infra-test/core/user.model';

export default function ParticipantsTable({
	participants,
	users,
	onUserClicked,
}: {
	participants: CandidateCoreSchema[];
	users: UserInfo[];
	onUserClicked?: (userId: string) => void;
}) {
	const data = useMapUsers({
		users,
		objects: participants,
		getUserIdFromObject: (participant) => participant.candidateId,
	});

	return (
		<table className="min-w-full divide-y divide-gray-200">
			<thead className="bg-gray-50">
				<tr>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						Rank
					</th>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						Profile
					</th>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						Highest Score
					</th>
					<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						Total Attempts
					</th>
				</tr>
			</thead>
			<tbody className="bg-white divide-y divide-gray-200">
				{data.map(({ user, object: { _aggregate } }) => (
					<tr
						key={user.id}
						className="hover:bg-gray-50 cursor-pointer"
						onClick={() => onUserClicked?.(user.id)}
					>
						<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
							{_aggregate.rank}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							<div className="flex items-center">
								<img src={user.avatarPath} alt={getUserCore(user).fullname} className="h-8 w-8 rounded-full mr-2" />
								<span>{getUserCore(user).fullname}</span>
							</div>
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							{_aggregate.highestScore}
						</td>
						<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
							{_aggregate.totalAttempts}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
