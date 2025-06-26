import { useState } from "react";
import ParticipantsList from "./ParticipantsList";
import useGetTestIdParams from "../../../../../../infra-test/hooks/useGetTestIdParams";
import { useGetTestsByTestIdParticipantsQuery } from "../../../../../../infra-test/api/test.api-gen-v2";
import FetchStateCover2 from "../../../../../../infra-test/ui/fetch-states/FetchStateCover2";
import { PagingFilter } from "../../../../../../infra-test/types/query";
import { QuerySortValues } from "../../../../../../infra-test/types/query";
import MyPaginationSection from "../../../../../../infra-test/ui/MyPaginationSection";
import { ParticipantUser } from "./type";
import ParticipantsResult from "./ParticipantsResult";

type Filter = PagingFilter & {
	sortByRank: QuerySortValues;
}

export default function ParticipantsTabContent() {
	const testId = useGetTestIdParams();

	const [selectedParticipant, setSelectedPaticipant] = useState<ParticipantUser | null>(null);
	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
		sortByRank: "asc",
	});

	const participantsQuery = useGetTestsByTestIdParticipantsQuery({
		testId,
		...filter,
	});

	return (
		<FetchStateCover2
			fetchState={participantsQuery}
			dataComponent={(paged) => (
				<div className="border border-gray-200 rounded-lg p-4">
					<div className={`${selectedParticipant ? "hidden" : ""}`}>
						<ParticipantsList
							participants={paged.data}
							onParticipantClicked={setSelectedPaticipant}
						/>

						<MyPaginationSection
							onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
							page={filter.page}
							perPage={filter.perPage}
							total={paged.total}
							totalPages={paged.totalPages}
						/>
					</div>
					<div className={`${selectedParticipant ? "" : "hidden"}`}>
						{selectedParticipant && <ParticipantsResult
							participantUser={selectedParticipant}
							onBack={() => setSelectedPaticipant(null)}
						/>}
					</div>
				</div>
			)}
		/>
	)
}
