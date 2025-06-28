import { useState } from "react";
import ParticipantsList from "./ParticipantsList";
import { ParticipantUser } from "./type";
import ParticipantsResult from "./ParticipantsResult";
import { useGetTestsByTestIdParticipantsQuery } from "../../../api/test.api-gen-v2";
import useGetTestIdParams from "../../../hooks/useGetTestIdParams";
import { PagingFilter, QuerySortValues } from "../../../types/query";
import FetchStateCover2 from "../../../ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../ui/MyPaginationSection";

type Filter = PagingFilter & {
	sortByRank: QuerySortValues;
}

export default function ParticipantsTab() {
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
