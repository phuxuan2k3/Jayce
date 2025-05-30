import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import ExamList from "./components/ExamList";
import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import Sidebar from "./components/Sidebar";
import { useAppDispatch } from "../../../../app/hooks";
import dialogSlice from "../../../../features/tests/stores/dialogSlice";
import { mockExams } from "../../../../infra-test/mocks/mockExams";

const ManagerTestsPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

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
				onDelete={(exam) => dispatch(dialogSlice.actions.setDeleteExam(exam))}
				onTestClick={handleExamView}
				onPageChange={(_) => {
				}}
			/>

		</NewLeftLayoutTemplate>
	);
}

export default ManagerTestsPage;