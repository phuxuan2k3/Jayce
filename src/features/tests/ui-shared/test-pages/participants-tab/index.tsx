import { useState } from "react";
import ParticipantsList from "./ParticipantsList";
import { ParticipantUser } from "./type";
import ParticipantsResult from "./ParticipantsResult";
import { AttemptCoreSchema, useGetTestsByTestIdParticipantsQuery } from "../../../api/test.api-gen-v2";
import useGetTestIdParams from "../../../hooks/useGetTestIdParams";
import { PagingFilter, QuerySortValues } from "../../../types/query";
import FetchStateCover2 from "../../../ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../ui-sections/MyPaginationSection";
import MyButtonWithSort from "../../../ui/buttons/MyButtonWithSort";

type Filter = PagingFilter & {
	sortByRank: QuerySortValues;
}

export default function ParticipantsTab({
	onAttemptClick,
}: {
	onAttemptClick: (attempt: AttemptCoreSchema) => void;
}) {
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
	}, {
		pollingInterval: 10000,
	});

	return (
		<>
			<div className={`${selectedParticipant ? "" : "hidden"}`}>
				{selectedParticipant && <ParticipantsResult
					onAttemptClick={onAttemptClick}
					participantUser={selectedParticipant}
					onBack={() => setSelectedPaticipant(null)}
				/>}
			</div>

			<div className={`flex flex-col gap-4 h-full ${selectedParticipant ? "hidden" : ""}`}>
				<div className="flex-1 flex flex-col gap-4">
					<FetchStateCover2
						fetchState={participantsQuery}
						dataComponent={({ data }) => data.length > 0 ? (
							<div className="flex flex-col">
								<div className="flex items-center justify-end pb-2 border-b border-gray-200 mb-4">
									<MyButtonWithSort
										sort={filter.sortByRank}
										setSort={(sort) => setFilter((prev) => ({ ...prev, sortByRank: sort }))}
									>
										Sort by Rank
									</MyButtonWithSort>
								</div>
								<div className="flex-1">
									<ParticipantsList
										participants={data}
										onParticipantClicked={setSelectedPaticipant}
									/>
								</div>
							</div>

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
