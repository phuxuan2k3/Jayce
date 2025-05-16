import React from "react";
import CompletedAttemptsList from "../ui/CompletedAttemptsList";
import useAttemptsTab from "../../hooks/attempts/useAttemptsTab";
import MyPagination from "../../../../../../../components/ui/common/MyPagination";
import useStartAttempt from "../../hooks/useStartAttempt";
import useNavigateToAttempt from "../../hooks/attempts/useNavigateToAttempt";

const AttemptsTabContent: React.FC = () => {
	const {
		data: attempts,
		isLoading,
		filter: { page, perPage },
		setFilter,
	} = useAttemptsTab();

	const navigateToAttempt = useNavigateToAttempt();
	const { startAttempt } = useStartAttempt();

	const completedAttempts = attempts?.data.filter(attempt => attempt.hasEnded) || [];

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center h-40">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
				</div>
			) : !attempts || attempts.data.length === 0 ? (
				<div className="bg-white rounded-lg shadow-md p-6 text-center">
					<p className="text-gray-600 mb-4">You haven't attempted this test yet.</p>
					<button
						className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
						onClick={startAttempt}
					>
						Start First Attempt
					</button>
				</div>
			) : (
				<>
					{/* Completed Attempts Section */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Completed Attempts</h3>
						<CompletedAttemptsList
							attempts={completedAttempts}
							page={page}
							perPage={perPage}
							onViewAttempt={(id) => navigateToAttempt(id)}
						/>
					</div>
				</>
			)}

			{/* Pagination */}
			{attempts && attempts.totalPages > 1 && (
				<MyPagination
					initialPage={page}
					totalPage={attempts.totalPages}
					onPageChange={(newPage) => {
						setFilter((prev) => ({ ...prev, page: newPage }));
					}}
				/>
			)}
		</>
	);
};

export default AttemptsTabContent;


