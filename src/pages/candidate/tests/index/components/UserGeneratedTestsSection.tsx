import { useNavigate } from "react-router-dom";
import { PracticeCore } from "../../../../../features/tests/model/test.model";
import paths from "../../../../../router/paths";
import { DefaultTestPracticeCard } from "../../../../../features/tests/ui2/TestPracticeCard";
import MyPagination from "../../../../../components/ui/common/MyPagination";

type UserGeneratedTestsProps = {
	totalPages: number;
	total: number;
	tests: PracticeCore[];
	onManageTest: (testId: string) => void;
	onPageChange: (page: number) => void;
};

const UserGeneratedTestsSection = ({
	tests,
	totalPages,
	total,
	onManageTest,
	onPageChange,
}: UserGeneratedTestsProps) => {
	const navigate = useNavigate();

	return (
		<section className="border-b pb-6 border-primary-toned-200">
			<h2 className="text-2xl font-bold mb-4">Your Generated Tests</h2>
			<p className="text-primary-toned-700 mb-4">View and manage the practice tests you've generated.</p>

			{tests.length > 0 ? (
				<div className="flex flex-col gap-4">
					{tests.map(test => (
						<DefaultTestPracticeCard
							key={test.id}
							test={test}
							onTestClicked={onManageTest}
						/>
					))}

					<div className="self-center mt-4">
						<MyPagination
							totalPage={totalPages}
							initialPage={1}
							onPageChange={onPageChange}
						/>
					</div>

					<div className="italic text-gray-500 text-center mt-4">
						Showing {tests.length} of {total} tests
					</div>
				</div>
			) : (
				<div className="text-center p-8 bg-gray-50 rounded-lg">
					<p className="text-gray-500">You haven't generated any tests yet.</p>
					<button
						onClick={() => navigate(paths.candidate.tests.GENERATE)}
						className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
					>
						Create Your First Test
					</button>
				</div>
			)}
		</section>
	);
};

export default UserGeneratedTestsSection;