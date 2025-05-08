import React from "react";
import OngoingAttemptCard from "./OngoingAttemptCard";
import CompletedAttemptsList from "./CompletedAttemptsList";
import AttemptPagination from "./AttemptPagination";

interface Attempt {
	id: string;
	order: number;
	hasEnded: boolean;
	secondsSpent: number;
	candidate: {
		id: string;
		name: string;
		avatar: string;
	};
	test: any; // Using any for simplicity, but you might want to define a proper type
	createdAt: string;
	updatedAt: string;
}

interface AttemptsTabContentProps {
	isLoading: boolean;
	attempts: {
		page: number;
		perPage: number;
		total: number;
		totalPages: number;
		data: Attempt[];
	} | null;
	page: number;
	perPage: number;
	formatSeconds: (seconds: number) => string;
	onViewAttempt: (attemptId: string) => void;
	onContinueAttempt: (attemptId: string) => void;
	onStartNewAttempt: () => void;
	setPage: (page: number) => void;
}

const AttemptsTabContent: React.FC<AttemptsTabContentProps> = ({
	isLoading,
	attempts,
	page,
	perPage,
	formatSeconds,
	onViewAttempt,
	onContinueAttempt,
	onStartNewAttempt,
	setPage,
}) => {
	// Find ongoing attempt (there can only be one)
	const ongoingAttempt = attempts?.data.find(attempt => !attempt.hasEnded);
	// Filter completed attempts
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
						onClick={onStartNewAttempt}
					>
						Start First Attempt
					</button>
				</div>
			) : (
				<>
					{/* Ongoing Attempt Section */}
					{ongoingAttempt && (
						<OngoingAttemptCard
							attempt={ongoingAttempt}
							formatSeconds={formatSeconds}
							onContinue={onContinueAttempt}
						/>
					)}

					{/* Completed Attempts Section */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Completed Attempts</h3>
						<CompletedAttemptsList
							attempts={completedAttempts}
							page={page}
							perPage={perPage}
							formatSeconds={formatSeconds}
							onViewAttempt={onViewAttempt}
						/>
					</div>
				</>
			)}

			{/* Pagination */}
			{attempts && attempts.totalPages > 1 && (
				<AttemptPagination
					currentPage={page}
					totalPages={attempts.totalPages}
					onPageChange={setPage}
				/>
			)}
		</>
	);
};

export default AttemptsTabContent;