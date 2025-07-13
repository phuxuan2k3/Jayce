import { useLanguage } from '../../../../LanguageProvider';
import { UserInfo } from '../../../auth/store/authSlice';
import { getUserCore } from '../../../auth/types/profile';
import { CandidateCoreSchema } from '../../api/test.api-gen-v2';
import useMapUsers from '../../hooks/useMapUsers';
import defaultAvatar from '/avatar/default.png';

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
	const { t } = useLanguage();

	const data = useMapUsers({
		users,
		objects: participants,
		getUserIdFromObject: (participant) => participant.candidateId,
	});

	return (
		<div className='overflow-x-auto w-full rounded-lg border border-primary-toned-200 shadow-md'>
			<table className="w-full bg-white">
				<thead className="bg-primary-toned-700 text-white font-bold">
					<tr>
						<th scope="col" className="px-6 py-3 text-left tracking-wider">
							{t("participant_table_rank")}
						</th>
						<th scope="col" className="px-6 py-3 text-left tracking-wider">
							{t("participant_table_profile")}
						</th>
						<th scope="col" className="px-6 py-3 text-left tracking-wider">
							{t("participant_table_highest_score")}
						</th>
						<th scope="col" className="px-6 py-3 text-left tracking-wider">
							{t("participant_table_total_attempts")}
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
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
											src={user.metadata.avatarPath || defaultAvatar}
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
		</div>
	);
}
