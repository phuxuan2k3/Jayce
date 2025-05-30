import { useReducer, useState } from "react";
import ExamQuestionsManage from "../../../../../features/tests/ui2/forms/ExamQuestionsManage";
import LeftLayoutTemplate from "../../../../../components/layouts/LeftLayoutTemplate";
import ExamConfigForm from "../../../../../features/tests/ui2/forms/ExamConfigForm";
import Sidebar from "./components/Sidebar";
import { EditTabs } from "./type";
import { examPersistReducer } from "../../../../../features/tests/reducers/exam-persist.reducer";
import { examPersistStateFactory } from "../../../../../features/tests/reducers/exam-persist.store";
import { mockQuestions } from "../index/components/questions-tab/mockData";
import { mockExams } from "../../../../../infra-test/mocks/mockExams";

export default function ManagerTestEditPage() {
	const exam = mockExams[0];
	const questions = mockQuestions;
	const [tab, setTab] = useState<EditTabs>("configuration");
	const [state, dispatch] = useReducer(examPersistReducer, examPersistStateFactory({ exam, questions }));

	const getTab = (tab: EditTabs) => {
		switch (tab) {
			case "configuration":
				return <ExamConfigForm
					configEdit={state.config}
					onConfigEditChange={(config) => {
						dispatch({ type: "UPDATE_CONFIG", payload: config });
					}}
				/>;
			case "questions":
				return <ExamQuestionsManage
					questions={state.questions.questions}
					onQuuestionAdd={(question) => {
						dispatch({ type: "ADD_QUESTION", payload: { question } });
					}}
					onQuestionUpdate={(index, question) => {
						dispatch({ type: "UPDATE_QUESTION", payload: { index, question } });
					}}
					onQuestionDelete={(index) => {
						dispatch({ type: "REMOVE_QUESTION", payload: { index } });
					}}
				/>;
			default:
				return null;
		}
	}

	return (
		<LeftLayoutTemplate
			header={{
				title: "Edit your test",
				description: "You can edit your test here!",
			}}
			left={
				<Sidebar
					exam={exam}
					onTabChange={(tab) => {
						setTab(tab);
					}}
				/>
			}
		>
			{getTab(tab)}
		</LeftLayoutTemplate>
	);
}

