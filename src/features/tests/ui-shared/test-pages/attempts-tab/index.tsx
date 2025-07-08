import { useState } from "react";
import { AttemptCoreSchema, useGetTestsByTestIdAttemptsQuery } from "../../../api/test.api-gen-v2";
import useGetTestIdParams from "../../../hooks/useGetTestIdParams";
import FetchStateCover2 from "../../../ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../ui-sections/MyPaginationSection";
import { QuerySortValues } from "../../../types/query";
import LoadingCover from "../../../ui/fetch-states/LoadingCover";
import AttemptsTable from "../../../ui-items/attempt/AttemptsTable";
import MyButtonWithSort from "../../../ui/buttons/MyButtonWithSort";

type Filter = {
	page: number;
	perPage: number;
	sortByCreatedAt?: QuerySortValues;
	sortByPoints?: QuerySortValues;
}

const AttemptsTab = ({
	candidateId = undefined,
	onAttemptClick = undefined,
}: {
	candidateId?: string | undefined;
	onAttemptClick?: (attempt: AttemptCoreSchema) => void;
}) => {
	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
	});

	const testId = useGetTestIdParams();
	const attemptsQuery = useGetTestsByTestIdAttemptsQuery({
		testId,
		candidateId: candidateId,
		page: filter.page,
		perPage: filter.perPage,
		sortByCreatedAt: filter.sortByCreatedAt,
		sortByPoints: filter.sortByPoints,
	}, {
		refetchOnMountOrArgChange: true,
		pollingInterval: 30000,
	});

	return (
		<div className="flex-1 flex h-full flex-col gap-4">
			<div className="flex-1 flex flex-col">
				<FetchStateCover2
					fetchState={attemptsQuery}
					dataComponent={(paged) => {
						const { data } = paged;
						if (data.length === 0) {
							return (
								<div className="w-full h-full flex items-center justify-center flex-col">
									<p className="text-gray-600 mb-4">There are no attempts for this test yet.</p>
								</div>
							);
						}

						return (
							<div className="flex flex-col gap-6 items-center justify-center [&>*]:w-full p-4">
								<div className="flex w-full items-center justify-between">
									<div className="flex-1">
										<h3 className="text-lg font-semibold ">Completed Attempts</h3>
									</div>
									<FilterButtons
										filter={filter}
										onFilterChange={(newFilter) => setFilter(newFilter)}
									/>

								</div>

								<div className="flex-1 flex relative">
									<AttemptsTable
										attempts={data}
										onItemClick={(data) => onAttemptClick?.(data)}
									/>
									{attemptsQuery.isFetching && <div className="absolute inset-0 bg-white/50">
										<div className="flex items-center justify-center h-full">
											<LoadingCover />
										</div>
									</div>}
								</div>
							</div>
						);
					}}
				/>
			</div>

			<hr className="border-gray-200 mt-4" />

			<MyPaginationSection
				page={filter.page}
				perPage={filter.perPage}
				onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
				totalPages={attemptsQuery.data?.totalPages}
				total={attemptsQuery.data?.total}
			/>
		</div>
	);
};

export default AttemptsTab;


const FilterButtons = ({
	filter,
	onFilterChange,
}: {
	filter: Filter;
	onFilterChange: (newFilter: Filter) => void;
}) => {

	return (
		<div className="flex items-center gap-2">
			<MyButtonWithSort
				sort={filter.sortByCreatedAt}
				setSort={(sort) => onFilterChange({
					...filter,
					sortByCreatedAt: sort,
					sortByPoints: undefined, // Reset points sort when changing date sort
				})}
			>
				Date
			</MyButtonWithSort>
			<MyButtonWithSort
				sort={filter.sortByPoints}
				setSort={(sort) => onFilterChange({
					...filter,
					sortByPoints: sort,
					sortByCreatedAt: undefined, // Reset date sort when changing points sort
				})}
			>
				Score
			</MyButtonWithSort>
		</div>
	);
}
