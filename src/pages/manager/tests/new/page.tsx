import { useCallback, useReducer, useState } from "react";
import { CreateTab } from "./common/create-tabs-types";
import LeftLayoutTemplateDefault from "../../../../components/layouts/LeftLayoutTemplateDefault";
import ExamConfigForm from "../../../../infra-test/ui/forms/ExamConfigForm";
import { examPersistReducer } from "../../../../infra-test/reducers/exam-persist.reducer";
import Sidebar from "./components/Sidebar";
import ExamQuestionsManage from "../../../../infra-test/ui/forms/ExamQuestionsManage";
import PublishTab from "./publish-tab";
import BuilderWizzardTab from "./builder-wizzard-tab";
import { QuestionPersistOfTest } from "../../../../infra-test/commands/question.persist";
import usePostExam from "./hooks/usePostExam";
import LoadingDialog from "./components/LoadingDialog";
import ValidationErrorDialog from "../../../../infra-test/ui/dialogs/ExamValidationDialog";
import ErrorDialog from "./components/ErrorDialog";
import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import { examGenerationReducer, initialState as initialStateGen } from "./models/exam-generation.reducer";
import useExamQuestionsGeneration from "./hooks/useExamQuestionsGeneration";
import { parseQueryError } from "../../../../helpers/fetchBaseQuery.error";
import { initialState } from "../../../../infra-test/reducers/exam-persist.store";

export default function ManagerTestNewPage() {
	const navigate = useNavigate();
	const [tab, setTab] = useState<CreateTab>("info");

	const [state, dispatch] = useReducer(examPersistReducer, initialState);
	const [isPostingExam, setIsPostingExam] = useState(false);

	const [stateGen, dispatchGen] = useReducer(examGenerationReducer, initialStateGen);
	const examGeneration = useExamQuestionsGeneration();

	const {
		handlePostExam,
		postExamState,
		validationError,
		hasValidationError,
	} = usePostExam({
		state,
		onPostingStarted: () => {
			setIsPostingExam(true);
		},
		onSuccess: (testId) => {
			navigate(paths.manager.tests.in(testId).ROOT);
		},
	});

	const handleBulkAddQuestions = useCallback((questions: QuestionPersistOfTest[]) => {
		dispatch({
			type: "BULK_ADD_QUESTIONS",
			payload: { questions },
		});
		setTab("questions");
	}, []);

	const handleReplaceQuestions = useCallback((questions: QuestionPersistOfTest[]) => {
		dispatch({
			type: "REPLACE_QUESTIONS",
			payload: { questions },
		});
		setTab("questions");
	}, []);

	const getTab = (tab: CreateTab) => {
		switch (tab) {
			case "info":
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
					onBulkAddQuestions={handleBulkAddQuestions}
					onReplaceQuestions={handleReplaceQuestions}
					examInitialConfig={state.config}
					onGenerationDisposal={() => {
						setTab("questions");
					}}
					dispatch={dispatchGen}
					state={stateGen}
					examGeneration={examGeneration}
				/>;
			case "publish":
				return <PublishTab
					examPersistState={state}
					onPublish={() => handlePostExam()}
				/>
			default:
				return null;
		}
	}

	return (
		<LeftLayoutTemplateDefault
			header={{
				title: "Create your test",
				description: "Configure your test settings and questions.",
			}}
			left={
				<Sidebar
					tab={tab}
					onTabChange={(tab) => {
						setTab(tab);
					}}
				/>
			}
		>
			{getTab(tab)}

			{tab === "publish" && hasValidationError === true && (
				<ValidationErrorDialog
					questionsErrors={validationError.questionsErrors}
					configErrors={validationError.configErrors}
					onClose={() => {
						setIsPostingExam(false);
						setTab("info");
					}}
					onConfigEdit={() => {
						setTab("info");
						setIsPostingExam(false);
					}}
					onQuestionsEdit={() => {
						setTab("questions");
						setIsPostingExam(false);
					}}
				/>
			)}

			{(isPostingExam) && (
				<>
					{postExamState.isLoading && (
						<LoadingDialog />
					)}
					{postExamState.error && (
						<ErrorDialog
							errorMessage={parseQueryError(postExamState.error) || undefined}
							onClose={() => setIsPostingExam(false)}
							onRetry={() => {
								setIsPostingExam(true);
								handlePostExam();
							}}
						/>
					)}
				</>
			)}


		</LeftLayoutTemplateDefault>
	);
}

