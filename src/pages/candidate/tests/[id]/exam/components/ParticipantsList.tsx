import { useMemo, useState } from "react";
import MyPagination from "../../../../../../components/ui/common/MyPagination";
import { ParticipantWithUserInfo } from "./type"
import { Paging } from "../../../../../../features/tests/types/common";
import { useGetExamsByTestIdParticipantsAggregateQuery } from "../../../../../../features/tests/api/test.api-gen";
import { useGetUsersQuery } from "../../../../../../features/auth/api/auth-profile.api";
import { getUserCore } from "../../../../../../infra-test/core/user.model";
import useQueryState from "../../../../../../components/hooks/useQueryState";

export default function ParticipantsList({
	testId,
	onParticipantClicked,
}: {
	testId: string;
	onParticipantClicked: (participantId: string) => void;
}) {
	const [filter, setFilter] = useState<Paging>({
		page: 1,
		perPage: 10,
	});

	const participantsQuery = useGetExamsByTestIdParticipantsAggregateQuery({
		testId,
		page: filter.page,
		perPage: filter.perPage,
	});
	const participants = participantsQuery.data?.data;

	const candidateIds = useMemo(() => participants?.map((participant) => participant.candidateId) || [], [participants]);

	const usersQuery = useGetUsersQuery({ user_ids: candidateIds });
	const users = usersQuery.data?.users;

	const participantsWithInfo: ParticipantWithUserInfo[] = useMemo(() => {
		if (!participants || !users) return [];
		if (participants.length !== users.length) throw new Error("Participants and candidates info length mismatch");
		return participants.map((participant, index) => {
			const candidateCore = getUserCore(users[index]);
			return {
				...participant,
				...candidateCore,
			};
		});
	}, [participants, users]);

	const isLoading = useQueryState({
		queries: [
			participantsQuery,
			usersQuery,
		],
	});

	if (isLoading) return isLoading;

	return (
		<div className="flex flex-col gap-4">
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
					{participantsWithInfo.map((participant) => (
						<tr
							key={participant.id}
							className="hover:bg-gray-50 cursor-pointer"
							onClick={() => onParticipantClicked(participant.id)}
						>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								{participant.rank}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div className="flex items-center">
									<img src={participant.avatarPath} alt={participant.fullname} className="h-8 w-8 rounded-full mr-2" />
									<span>{participant.fullname}</span>
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{participant.highestScore}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{participant.totalAttempts}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<MyPagination
				initialPage={filter.page}
				onPageChange={(page) => setFilter({ ...filter, page })}
				totalPage={participantsQuery.data?.totalPages || 1}
			/>
		</div>
	)
}
