import { UserInfo } from '../../../auth/store/authSlice';
import { getUserCore } from '../../../auth/types/profile';
import { CandidateCoreSchema } from '../../api/test.api-gen-v2';
import useMapUsers from '../../hooks/useMapUsers';

export default function ParticipantsTable({
	participants,
	users,
	onItemClicked,
}: {
	participants: CandidateCoreSchema[];
	users: UserInfo[];
	onItemClicked?: ({
		user,
		participant,
	}: {
		user: UserInfo;
		participant: CandidateCoreSchema;
	}) => void;
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
				{data.map(({ user, object }) => {
					const _aggregate = object._aggregate;
					return (
						<tr
							key={user.id}
							className="hover:bg-gray-50 cursor-pointer"
							onClick={() => onItemClicked?.({
								user,
								participant: object,
							})}
						>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								{_aggregate.rank}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div className="flex items-center">
									<img
										src={user.avatarPath || '/default-avatar.png'}
										alt={getUserCore(user).fullname}
										className="h-8 w-8 rounded-full mr-2"
									/>
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
					)
				})}
			</tbody>
		</table>
	);
}
