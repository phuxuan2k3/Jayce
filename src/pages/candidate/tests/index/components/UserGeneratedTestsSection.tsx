import { useNavigate } from "react-router-dom";
import { TestPractice } from "../../../../../features/tests/model/test.model";
import paths from "../../../../../router/paths";
import { DefaultTestPracticeCard } from "../../../../../features/tests/ui2/TestCard";
import MyPagination from "../../../../../components/ui/common/MyPagination";

type UserGeneratedTestsProps = {
	tests: TestPractice[];
	onManageTest: (testId: number) => void;
};

const UserGeneratedTestsSection = ({ tests, onManageTest }: UserGeneratedTestsProps) => {
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
							totalPage={Math.ceil(tests.length / 10)}
							initialPage={1}
							onPageChange={(page) => {
								console.log(`Page changed to: ${page}`);
							}}
						/>
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