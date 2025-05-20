import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import TestExamList from "./components/TestExamList";
import CommonButton from "../../../../components/ui/CommonButton";
import { mockExams } from "./components/mockExams";
import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";

const ManagerTestsPage = () => {
	const navigate = useNavigate();
	const handleClickEditTest = (testId: string) => {
		navigate(paths.manager.tests.in(testId).EDIT);
	};

	const handleClickDeleteTest = (_: string) => {
		// deleteTest({ testId });
	};

	const handleClickCreateTest = () => {
		navigate(paths.manager.tests.CREATE);
	};

	const handleExamView = (testId: string) => {
		navigate(paths.manager.tests.in(testId).ATTEMPTS);
	};

	const tests = mockExams;

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title="Exams Management"
					description="Manage all your exams."
				/>
			}
			left={
				<div className="lg:sticky lg:top-[2vh] flex flex-col gap-4 shadow-primary rounded-lg p-4 bg-white">
					<div className="flex flex-col gap-2 mb-4">
						<h2 className="text-lg font-bold">Actions</h2>
						<p className="text-sm text-primary-toned-500">You can create, edit or delete your tests.</p>
					</div>
					<CommonButton
						variant="secondary"
					>
						Avtive Tests
					</CommonButton>
					<CommonButton
						onClick={handleClickCreateTest}
					>
						Create Test
					</CommonButton>
				</div>
			}
		>
			<TestExamList
				tests={tests}
				totalPages={10}
				onEdit={handleClickEditTest}
				onDelete={handleClickDeleteTest}
				onTestClick={handleExamView}
				onPageChange={(_) => {
				}}
			/>
		</NewLeftLayoutTemplate>
	);
}

export default ManagerTestsPage;