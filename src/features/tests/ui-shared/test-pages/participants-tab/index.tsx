import { useState } from "react";
import ParticipantsList from "./ParticipantsList";
import { ParticipantUser } from "./type";
import ParticipantsResult from "./ParticipantsResult";
import { useGetTestsByTestIdParticipantsQuery } from "../../../api/test.api-gen-v2";
import useGetTestIdParams from "../../../hooks/useGetTestIdParams";
import { PagingFilter, QuerySortValues } from "../../../types/query";
import FetchStateCover2 from "../../../ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../ui-sections/MyPaginationSection";

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
		<>
			<div className={`${selectedParticipant ? "" : "hidden"}`}>
				{selectedParticipant && <ParticipantsResult
					participantUser={selectedParticipant}
					onBack={() => setSelectedPaticipant(null)}
				/>}
			</div>

			<div className={`flex flex-col gap-4 h-full ${selectedParticipant ? "hidden" : ""}`}>
				<div className="flex-1 flex flex-col gap-4">
					<FetchStateCover2
						fetchState={participantsQuery}
						dataComponent={({ data }) => data.length > 0 ? (
							<ParticipantsList
								participants={data}
								onParticipantClicked={setSelectedPaticipant}
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center flex-col">
								<p className="text-gray-600 mb-4">There are no participants for this test yet.</p>
							</div>
						)}
					/>
				</div>

				<hr className="border-gray-200 mt-4" />

				<MyPaginationSection
					onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
					page={filter.page}
					perPage={filter.perPage}
					total={participantsQuery.data?.total}
					totalPages={participantsQuery.data?.totalPages}
				/>
			</div>
		</>
	)
}
