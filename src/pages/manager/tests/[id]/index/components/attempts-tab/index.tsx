import MyPagination from "../../../../../../../components/ui/common/MyPagination";
import AttemptList from "./components/AttemptsList";
import AttemptsAggregateSection from "./components/AttemptsAggregateSection";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../../../router/paths";
import { useCallback, useState } from "react";
import FetchStateCover from "../../../../../../../components/wrapper/FetchStateCover";
import { Filter } from "./type";
import useAttemptsTabData from "./hooks/useAttemptsTabData";

const AttemptsTab = ({
	testId,
}: {
	testId: string;
}) => {
	const navigate = useNavigate();
	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
		sort: "createdAt",
	});

	const {
		error,
		isLoading,
		model,
		totalPages,
	} = useAttemptsTabData(testId, filter);

	const { attemptsWithCandidates, attempsOfTestAggregate } = model;

	const navigateToAttempt = useCallback((attemptId: string) => navigate(paths.manager.tests.attempts.in(attemptId).ROOT), []);

	return (
		<FetchStateCover
			queryState={{
				isLoading,
				error,
				data: model,
			}}
		>
			<div className="flex flex-col gap-4 items-center justify-center [&>*]:w-full">
				{attemptsWithCandidates.length === 0 ? (
					<div className="bg-white rounded-lg shadow-md p-6 text-center">
						<p className="text-gray-600 mb-4">No attempts found.</p>
					</div>
				) : (
					<>
						{/* Attempts Summary Section */}
						<h3 className="text-lg font-semibold mb-4">Test Attempts Overview</h3>
						<AttemptsAggregateSection aggregate={attempsOfTestAggregate} />

						{/* Completed Attempts Section */}
						<h3 className="text-lg font-semibold mb-3">Completed Attempts</h3>
						<AttemptList
							data={attemptsWithCandidates}
							page={filter.page}
							perPage={filter.perPage}
							onViewAttempt={(id) => navigateToAttempt(id)}
						/>
					</>
				)}

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex justify-center mt-4 w-full">
						<MyPagination
							initialPage={filter.page}
							totalPage={totalPages}
							onPageChange={(newPage) => {
								setFilter((prev) => ({ ...prev, page: newPage }));
							}}
						/>
					</div>
				)}
			</div>
		</FetchStateCover>
	);
};

export default AttemptsTab;
