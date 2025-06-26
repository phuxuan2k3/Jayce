import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import ExamList from "./components/ExamList";
import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import Sidebar from "./components/Sidebar";
import { useAppDispatch } from "../../../../app/hooks";
import deleteExamSlice from "../../../../infra-test/stores/deleteExamSlice";
import { useCallback, useState } from "react";
import { Filter } from "./type";
import { useGetExamsQuery } from "../../../../infra-test/enhance-api/exam-manage.api-enhance";

const ManagerTestsPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
		searchTitle: "",
		sort: "createdAt",
	});

	const examsQuery = useGetExamsQuery({
		...filter,
	});

	const handleExamView = useCallback((testId: string) => {
		navigate(paths.manager.tests.in(testId).ROOT);
	}, []);

	const exams = examsQuery.data?.data || [];
	const totalPages = examsQuery.data?.totalPages || 1;


	return (
		<LeftLayoutTemplate
			header={
				<LeftLayoutTemplate.Header
					title="Exams Management"
					description="Manage all your exams."
				/>
			}
			left={
				<Sidebar />
			}
		>
			<ExamList
				tests={exams}
				totalPages={totalPages}
				onDelete={(exam) => dispatch(deleteExamSlice.actions.setDeleteExam(exam))}
				onTestClick={handleExamView}
				onPageChange={(page) => {
					setFilter((prev) => ({
						...prev,
						page,
					}));
				}}
			/>

		</LeftLayoutTemplate>
	);
}

export default ManagerTestsPage;