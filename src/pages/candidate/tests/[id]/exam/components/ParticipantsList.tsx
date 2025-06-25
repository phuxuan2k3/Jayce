import { useState } from "react";
import { useGetUsersQuery } from "../../../../../../features/auth/api/auth-profile.api";
import useGetTestIdParams from "../../../../../../infra-test/hooks/useGetTestIdParams";
import { useGetTestsByTestIdParticipantsQuery } from "../../../../../../infra-test/api/test.api-gen-v2";
import { PagedFilter, QuerySortValues } from "../../../../../../interfaces/paged.type";
import FetchStateCover2 from "../../../../../../infra-test/ui/fetch-states/FetchStateCover2";
import ParticipantsTable from "./ParticipantsTable";
import MyPaginationSection from "../../../../../../infra-test/ui/MyPaginationSection";

type Filter = PagedFilter & {
	sortByRank: QuerySortValues;
}

export default function ParticipantsList({
	onParticipantClicked,
}: {
	onParticipantClicked: (participantId: string) => void;
}) {
	const testId = useGetTestIdParams();
	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
		sortByRank: "asc",
	});

	const participantsQuery = useGetTestsByTestIdParticipantsQuery({
		testId,
		...filter,
	});
	const usersQuery = useGetUsersQuery({
		user_ids: participantsQuery.data?.data.map((p) => p.candidateId) || [],
	}, {
		skip: participantsQuery.data == null || !participantsQuery.data.data.length,
	});


	return (
		<FetchStateCover2
			fetchState={participantsQuery}
			dataComponent={(paged) => (
				<FetchStateCover2
					fetchState={usersQuery}
					dataComponent={(users) => (
						<div className="flex flex-col gap-4">
							<ParticipantsTable
								participants={paged.data}
								users={users.users}
								onUserClicked={(userId) => onParticipantClicked(userId)}
							/>

							<MyPaginationSection
								onPageChange={(page) => {
									setFilter((prev) => ({ ...prev, page }));
								}}
								page={filter.page}
								perPage={filter.perPage}
								total={paged.total}
								totalPages={paged.totalPages}
							/>
						</div>
					)}
				/>
			)}
		/>
	)
}
