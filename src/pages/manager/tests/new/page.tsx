import { useReducer, useState } from "react";
import { CreateTab } from "./models/tabs";
import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import ExamConfigForm from "../../../../features/tests/ui2/forms/ExamConfigForm";
import { examPersistReducer } from "../../../../features/tests/reducers/exam-persist.reducer";
import { examPersistStateFactory } from "../../../../features/tests/reducers/exam-persist.store";
import Sidebar from "./components/Sidebar";
import ExamQuestionsManage from "../../../../features/tests/ui2/forms/ExamQuestionsManage";
import PublishTab from "./components/PublishTab";
import BuilderWizzardTab from "./components/builder-wizzard-tab";
import { QuestionPersistOfTest } from "../../../../infra-test/core/question.model";

export default function ManagerTestEditPage() {
	const [tab, setTab] = useState<CreateTab>("configuration");
	const [state, dispatch] = useReducer(examPersistReducer, examPersistStateFactory({}));

	const handleBulkAddQuestions = (questions: QuestionPersistOfTest[]) => {
		dispatch({
			type: "BULK_ADD_QUESTIONS",
			payload: { questions },
		});
	}

	const handleReplaceQuestions = (questions: QuestionPersistOfTest[]) => {
		dispatch({
			type: "REPLACE_QUESTIONS",
			payload: { questions },
		});
	}

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
				return <BuilderWizzardTab
					examInitialConfig={state.config}
				/>;
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

