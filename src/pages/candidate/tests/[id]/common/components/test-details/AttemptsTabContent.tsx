import MyPagination from "../../../../../../../components/ui/common/MyPagination";
import AttemptList from "./AttemptsList";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../../../router/paths";
import { AttemptCore } from "../../../../../../../features/tests/model/attempt.model";

type Filter = {
	page: number;
	perPage: number;
	sort: string;
}

const AttemptsTabContent = ({
	attempts,
	totalPages,
	isLoading,
	filter,
	setFilter,
	onStartAttempt,
}: {
	attempts?: AttemptCore[];
	totalPages: number;
	isLoading: boolean;
	filter: Filter;
	setFilter: React.Dispatch<React.SetStateAction<Filter>>;
	onStartAttempt: () => void;
}) => {
	const navigate = useNavigate();
	const { page, perPage } = filter;

	const navigateToAttempt = (attemptId: string) => navigate(paths.candidate.tests.attempts.in(attemptId).ROOT);

	return (
		<div className="flex flex-col gap-4 items-center justify-center [&>*]:w-full">
			{isLoading ? (
				<div className="flex justify-center items-center h-40">
					<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
				</div>
			) : (attempts == null ? (
				<div className="bg-white rounded-lg shadow-md p-6 text-center">
					<p className="text-gray-600 mb-4">Not availible.</p>
				</div>
			) : (attempts.length === 0 ? (
				<div className="bg-white rounded-lg shadow-md p-6 text-center">
					<p className="text-gray-600 mb-4">You haven't attempted this test yet.</p>
					<button
						className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
						onClick={onStartAttempt}
					>
						Start First Attempt
					</button>
				</div>
			) : (
				<>
					{/* Completed Attempts Section */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Completed Attempts</h3>
						<AttemptList
							attempts={attempts}
							page={page}
							perPage={perPage}
							onViewAttempt={(id) => navigateToAttempt(id)}
						/>
					</div>
				</>
			)))}

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center mt-4 w-full">
					<MyPagination
						initialPage={page}
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

export default AttemptsTabContent;


