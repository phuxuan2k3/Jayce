import { useReducer, useState } from "react";
import ExamQuestionsManage from "../../../../../infra-test/ui/forms/ExamQuestionsManage";
import LeftLayoutTemplate from "../../../../../components/layouts/LeftLayoutTemplate";
import ExamConfigForm from "../../../../../infra-test/ui/forms/ExamConfigForm";
import Sidebar from "./components/Sidebar";
import { EditTabs, ManagerTestEditPageModel } from "./type";
import { examPersistReducer } from "../../../../../infra-test/reducers/exam-persist.reducer";
import { examPersistStateFactory } from "../../../../../infra-test/reducers/exam-persist.store";
import usePageData from "./hooks/usePageData";
import FetchStateCover from "../../../../../components/wrapper/FetchStateCover";
import { EMPTY_EXAM_CORE } from "../../../../../infra-test/core/test.model";

export default function ManagerTestEditPage() {
	const {
		isLoading,
		error,
		data,
	} = usePageData();

	const model: ManagerTestEditPageModel = data ? data : {
		exam: EMPTY_EXAM_CORE,
		questions: [],
	};

	const { exam, questions } = model;

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
			<FetchStateCover
				queryState={{
					isLoading,
					error,
				}}
			>
				{getTab(tab)}
			</FetchStateCover>
		</LeftLayoutTemplate>
	);
}

