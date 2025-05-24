import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import ExamList from "./components/ExamList";
import { mockExams } from "./components/mockExams";
import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import Sidebar from "./components/Sidebar";
import React from "react";
import { ExamCore } from "../../../../features/tests/model/test.model";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";

const ManagerTestsPage = () => {
	const navigate = useNavigate();
	const [examToDelete, setExamToDelete] = React.useState<ExamCore | null>(null);

	const handleClickDeleteTest = (exam: ExamCore) => {
		// TODO: Implement delete test logic
		console.log("Deleting test:", exam);
		setExamToDelete(null);
	};

	const handleExamView = (testId: string) => {
		navigate(paths.manager.tests.in(testId).ROOT);
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
				<Sidebar />
			}
		>
			<ExamList
				tests={tests}
				totalPages={10}
				onDelete={(exam) => setExamToDelete(exam)}
				onTestClick={handleExamView}
				onPageChange={(_) => {
				}}
			/>

			<DeleteConfirmDialog
				examToDelete={examToDelete}
				onCancel={() => setExamToDelete(null)}
				onDelete={(exam) => handleClickDeleteTest(exam)}
			/>
		</NewLeftLayoutTemplate>
	);
}

export default ManagerTestsPage;