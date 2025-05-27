import { useReducer, useState } from "react";
import { CreateTab } from "./types";
import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import ExamConfigForm from "../../../../features/tests/ui2/forms/ExamConfigForm";
import { examPersistReducer } from "../../../../features/tests/reducers/exam-persist.reducer";
import { examPersistStateFactory } from "../../../../features/tests/reducers/exam-persist.store";
import Sidebar from "./components/Sidebar";
import ExamQuestionsManage from "../../../../features/tests/ui2/forms/ExamQuestionsManage";
import BuilderWizzardTab from "./components/builder-wizzard-tab";
import PublishTab from "./components/PublishTab";

export default function ManagerTestEditPage() {
	const [tab, setTab] = useState<CreateTab>("configuration");
	const [state, dispatch] = useReducer(examPersistReducer, examPersistStateFactory({}));

	const getTab = (tab: CreateTab) => {
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
					onQuestionDelete={(index) => dispatch({
						type: "REMOVE_QUESTION",
						payload: { index },
					})}
					onQuuestionAdd={(question) => dispatch({
						type: "ADD_QUESTION",
						payload: { question },
					})}
					onQuestionUpdate={(index, question) => dispatch({
						type: "UPDATE_QUESTION",
						payload: { index, question },
					})}
				/>;
			case "generate":
				return <BuilderWizzardTab />;
			case "publish":
				return <PublishTab />
			default:
				return null;
		}
	}

	return (
		<LeftLayoutTemplate
			header={{
				title: "Create your test",
				description: "Configure your test settings and questions.",
			}}
			left={
				<Sidebar
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

