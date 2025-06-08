import { useEffect, useMemo, useReducer, useState } from "react";
import ExamQuestionsManage from "../../../../../infra-test/ui/forms/ExamQuestionsManage";
import LeftLayoutTemplate from "../../../../../components/layouts/LeftLayoutTemplate";
import ExamConfigForm from "../../../../../infra-test/ui/forms/ExamConfigForm";
import Sidebar from "./components/Sidebar";
import { EditTabs, ManagerTestEditPageModel } from "./type";
import { examPersistReducer } from "../../../../../infra-test/reducers/exam-persist.reducer";
import { initialState } from "../../../../../infra-test/reducers/exam-persist.store";
import usePageData from "./hooks/usePageData";
import FetchStateCover from "../../../../../components/wrapper/FetchStateCover";
import { EMPTY_EXAM_CORE } from "../../../../../infra-test/core/test.model";
import useFetchStateDialog from "../../../../../infra-test/hooks/useFetchStateDialog";
import { examPersistSelectors, stateToPutExamArgs } from "../../../../../infra-test/reducers/exam-persist.selector";
import { usePutExamsByTestIdMutation } from "../../../../../infra-test/enhance-api/exam-manage.api-enhance";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import ValidationErrorDialog from "../../../../../infra-test/ui/dialogs/ExamValidationDialog";
import useGetTestIdParams from "../../../../../infra-test/hooks/useGetTestIdParams";

export default function ManagerTestEditPage() {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();
	const [isValidating, setIsValidating] = useState(false);

	const {
		isLoading,
		error,
		data,
	} = usePageData();

	const model: ManagerTestEditPageModel = useMemo(() => data != null ? data : {
		exam: EMPTY_EXAM_CORE,
		questions: [],
	}, [data]);

	const [tab, setTab] = useState<EditTabs>("info");
	const [state, dispatch] = useReducer(examPersistReducer, initialState);

	const {
		configErrors,
		questionsErrors,
		errors,
	} = useMemo(() => examPersistSelectors(state), [state]);

	useEffect(() => {
		console.log("Exam edit page data", data);
		if (data == null) {
			return;
		}
		const { exam, questions } = data;
		dispatch({
			type: "INITIALIZE",
			payload: {
				config: {
					...exam,
					openDate: new Date(exam.openDate),
					closeDate: new Date(exam.closeDate),
					password: null,
				},
				questions,
			}
		});
	}, [data]);

	const [updateExam, updateExamState] = usePutExamsByTestIdMutation();

	useFetchStateDialog({
		...updateExamState,
		onSuccess: () => {
			navigate(paths.manager.tests.ROOT);
			setIsValidating(false);
		},
		onRetry: () => {
			handleSave();
		},
	});

	const handleSave = () => {
		setIsValidating(true);
		if (errors.length > 0) {
			return;
		}
		const args = stateToPutExamArgs(testId, state);
		updateExam(args);
	};

	const getTab = (tab: EditTabs) => {
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

	const component = getTab(tab);

	return (
		<LeftLayoutTemplate
			header={{
				title: "Edit your test",
				description: "You can edit your test here!",
			}}
			left={
				<Sidebar
					exam={model.exam}
					onModeChange={(tab) => {
						setTab(tab);
					}}
					tab={tab}
					onSave={handleSave}
				/>
			}
		>
			<FetchStateCover
				queryState={{
					isLoading,
					error,
				}}
			>
				{component}
			</FetchStateCover>
			{(isValidating && errors.length > 0) && (
				<ValidationErrorDialog
					configErrors={configErrors}
					questionsErrors={questionsErrors}
					onClose={() => setIsValidating(false)}
					onConfigEdit={() => {
						setTab("info");
						setIsValidating(false);
					}}
					onQuestionsEdit={() => {
						setTab("questions");
						setIsValidating(false);
					}}
				/>
			)}
		</LeftLayoutTemplate>
	);
}

