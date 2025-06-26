import { useGetTestsByTestIdAttemptsQuery } from "../../api/test.api-gen-v2";
import useGetTestIdParams from "../../hooks/useGetTestIdParams";
import { useState } from "react";
import FetchStateCover2 from "../../ui/fetch-states/FetchStateCover2";
import MyPaginationSection from "../../ui/MyPaginationSection";
import AttemptsTable from "../../ui-items/attempt/AttemptsTable";
import { useNavigate } from "react-router-dom";
import paths from "../../../router/paths";

type Filter = {
	page: number;
	perPage: number;
}

const AttemptsTabContent = ({
	userId = undefined,
}: {
	userId?: string | undefined;
}) => {
	const navigate = useNavigate();
	const [filter, setFilter] = useState<Filter>({ page: 1, perPage: 10 });

	const testId = useGetTestIdParams();
	const attemptsQuery = useGetTestsByTestIdAttemptsQuery({ testId, candidateId: userId, ...filter });

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
								onItemClick={(attemptId) => {
									navigate(paths.candidate.tests.attempts.in(attemptId).ROOT);
								}}
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

export default AttemptsTabContent;


