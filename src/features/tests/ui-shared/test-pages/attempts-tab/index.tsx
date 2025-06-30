import { useState } from "react";
import { AttemptCoreSchema, useGetTestsByTestIdAttemptsQuery } from "../../../api/test.api-gen-v2";
import useGetTestIdParams from "../../../hooks/useGetTestIdParams";
import AttemptsTable from "../../../ui-items/attempt/AttemptsTable";
import FetchStateCover2 from "../../../ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../../ui/sections/MyPaginationSection";

type Filter = {
	page: number;
	perPage: number;
}

const AttemptsTab = ({
	candidateId = undefined,
	onAttemptClick = undefined,
}: {
	candidateId?: string | undefined;
	onAttemptClick?: (attempt: AttemptCoreSchema) => void;
}) => {
	const [filter, setFilter] = useState<Filter>({ page: 1, perPage: 10 });

	const testId = useGetTestIdParams();
	const attemptsQuery = useGetTestsByTestIdAttemptsQuery({
		testId,
		candidateId: candidateId,
		...filter
	});

	return (
		<FetchStateCover2
			fetchState={attemptsQuery}
			dataComponent={(paged) => {
				const { data, totalPages, total } = paged;
				if (data.length === 0) {
					return (
						<div className="bg-white rounded-lg shadow-md p-6 text-center">
							<p className="text-gray-600 mb-4">You haven't attempted this test yet.</p>
						</div>
					);
				}

				return (
					<div className="flex flex-col gap-4 items-center justify-center [&>*]:w-full">
						<div>
							<h3 className="text-lg font-semibold mb-3">Completed Attempts</h3>
							<AttemptsTable
								attempts={data}
								onItemClick={(data) => onAttemptClick?.(data)}
								baseIndex={filter.page < 1 ? 0 : (filter.page - 1) * filter.perPage}
							/>
						</div>

						<MyPaginationSection
							page={filter.page}
							perPage={filter.perPage}
							totalPages={totalPages}
							onPageChange={(page) => setFilter((prev) => ({ ...prev, page }))}
							total={total}
						/>
					</div>
				);
			}}
		/>

	);
};

export default AttemptsTab;


