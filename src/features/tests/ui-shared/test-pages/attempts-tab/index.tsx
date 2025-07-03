import { useState } from "react";
import { AttemptCoreSchema, useGetTestsByTestIdAttemptsQuery } from "../../../api/test.api-gen-v2";
import useGetTestIdParams from "../../../hooks/useGetTestIdParams";
import AttemptsTable from "../../../ui-items/attempt/AttemptsTable";
import FetchStateCover2 from "../../../ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../ui-sections/MyPaginationSection";
import { QuerySortValues } from "../../../types/query";
import MyButton from "../../../ui/buttons/MyButton";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import LoadingCover from "../../../ui/fetch-states/LoadingCover";

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
		sortByPoints: "desc",
		sortByCreatedAt: "desc",
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
								<div className="bg-white rounded-lg shadow-md p-6 text-center">
									<p className="text-gray-600 mb-4">You haven't attempted this test yet.</p>
								</div>
							);
						}

						return (
							<div className="flex flex-col gap-4 items-center justify-center [&>*]:w-full">
								<div className="flex w-full items-center justify-between">
									<div className="flex-1">
										<h3 className="text-lg font-semibold ">Completed Attempts</h3>
									</div>
									<FilterButtons filter={filter} onFilterChange={(newFilter) => setFilter(newFilter)} />

								</div>

								<div className="flex-1 flex relative p-4">
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
			<MyButton
				size={"medium"}
				onClick={() => onFilterChange({
					...filter,
					sortByCreatedAt: filter.sortByCreatedAt === "asc" ? "desc" : "asc",
				})}
				className="flex items-center gap-1"
			>
				{filter.sortByCreatedAt === "asc" ? (
					<ArrowUpNarrowWide size={16} className="mr-1" />
				) : (
					<ArrowDownNarrowWide size={16} className="mr-1" />
				)}
				Date
			</MyButton>

			<MyButton
				size={"medium"}
				onClick={() => onFilterChange({
					...filter,
					sortByPoints: filter.sortByPoints === "asc" ? "desc" : "asc",
				})}
				className="flex items-center gap-1"
			>
				{filter.sortByPoints === "asc" ? (
					<ArrowUpNarrowWide size={16} className="mr-1" />
				) : (
					<ArrowDownNarrowWide size={16} className="mr-1" />
				)}
				Points
			</MyButton>
		</div>
	);
}
