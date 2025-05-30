import MyPagination from "../../../../../../../components/ui/common/MyPagination";
import AttemptList from "./attmempts-list/AttemptsList";
import AttemptsAggregateSection from "./attmempts-list/AttemptsAggregateSection";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../../../router/paths";
import { useState } from "react";
import { mockAttemptCandidates } from "../../mockAttemptsData";
import { mockAttemptOfTestAggregateData } from "../../../../../../../infra-test/mocks/mockAttempts";

type Filter = {
	page: number;
	perPage: number;
	sort: string;
}

const AttemptsTab = () => {
	const navigate = useNavigate();

	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
		sort: "createdAt",
	});

	const data = mockAttemptCandidates;

	const isLoading = false; // Replace with actual loading state
	const totalPages = 10;

	const navigateToAttempt = (attemptId: string) => navigate(paths.manager.tests.attempts.in(attemptId).ROOT);

	return (
		<div className="flex flex-col gap-4 items-center justify-center [&>*]:w-full">
			{isLoading ? (
				<div className="flex justify-center items-center h-40">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
				</div>
			) : (data == null ? (
				<div className="bg-white rounded-lg shadow-md p-6 text-center">
					<p className="text-gray-600 mb-4">Not availible.</p>
				</div>) : (data.length === 0 ? (
					<div className="bg-white rounded-lg shadow-md p-6 text-center">
						<p className="text-gray-600 mb-4">No attempts found.</p>
					</div>
				) : (
					<>					{/* Attempts Summary Section */}
						<div>
							<h3 className="text-lg font-semibold mb-4">Test Attempts Overview</h3>
							<AttemptsAggregateSection aggregate={mockAttemptOfTestAggregateData} />
						</div>

						{/* Completed Attempts Section */}
						<div>
							<h3 className="text-lg font-semibold mb-3">Completed Attempts</h3>
							<AttemptList
								data={data}
								page={filter.page}
								perPage={filter.perPage}
								onViewAttempt={(id) => navigateToAttempt(id)}
							/>
						</div>
					</>
				)))}

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
	);
};

export default AttemptsTab;


