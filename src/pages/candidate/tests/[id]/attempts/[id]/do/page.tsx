import { useEffect, useReducer, useState } from "react";
import RightLayoutTemplate from "../../../../../../../components/layouts/RightLayoutTemplate";
import TestDoSidebar from "./components/TestDoSidebar";
import useTestDoServer from "./hooks/useTestDoServer";
import { initialState, testDoReducer } from "./model";
import QuestionDoSection from "./components/QuestionDoSection";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../../../router/paths";
import { toast } from "react-toastify";
import { parseQueryError } from "../../../../../../../helpers/fetchBaseQuery.error";
import { usePatchAttemptsByAttemptIdSubmitMutation } from "../../../../../../../features/tests/api/test.api-gen-v2";
import useActionStateWatch from "../../../../../../../features/tests/hooks/useActionStateWatch";
import useGetAttemptIdParams from "../../../../../../../features/tests/hooks/useGetAttemptIdParams";
import FetchStateCover2 from "../../../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import useGetTestIdParams from "../../../../../../../features/tests/hooks/useGetTestIdParams";
import TimesUpDialog from "./components/TimesUpDialog";

export default function CandidateTestAttemptsDoPage() {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const attemptId = useGetAttemptIdParams();

	const [isTimesUpDialogOpen, setIsTimesUpDialogOpen] = useState(false);
	const serverState = useTestDoServer();

	const [patchSubmit, submitState] = usePatchAttemptsByAttemptIdSubmitMutation();
	useActionStateWatch(submitState, {
		onSuccess: () => {
			toast.success("Attempt submitted successfully");
			navigate(paths.candidate.tests.in(testId).ROOT);
		},
		onError: (error) => {
			console.error("Failed to submit attempt:", error);
			const errorMessage = parseQueryError(error);
			toast.error("Failed to submit attempt: " + errorMessage);
		}
	});

	const [state, dispatch] = useReducer(testDoReducer, initialState);

	useEffect(() => {
		if (serverState.isSuccess && serverState.data != null) {
			dispatch({ type: "INITIALIZE_STATE", payload: serverState.data });
		}
	}, [serverState.data, serverState.isSuccess]);

	useEffect(() => {
		if (serverState.data?.attemptAnswers != null) {
			dispatch({
				type: "UPDATE_ANSWERS",
				payload: serverState.data.attemptAnswers
			});
		}
	}, [serverState.data?.attemptAnswers]);

	return (
		<FetchStateCover2
			fetchState={serverState}
			dataComponent={({ test, attempt }) => (
				<RightLayoutTemplate
					header={
						<RightLayoutTemplate.Header
							title={test.title}
							description={test.description}
							backButton={
								<RightLayoutTemplate.BackButton
									onClick={() => navigate(paths.candidate.tests.in(testId).ROOT)}
								/>
							}
						/>
					}
					right={
						<TestDoSidebar
							attempt={attempt}
							test={test}
							questionDoState={state.questionsDo}
							currentQuestionIndex={state.currentIndex}
							onCurrentQuestionIndexChange={(index) => dispatch({ type: "SET_INDEX", payload: index })}
							onSubmit={() => patchSubmit({ attemptId })}
							onTimesUp={() => setIsTimesUpDialogOpen(true)}
						/>
					}
				>
					<div className="flex w-full justify-between">
						{state.questionsDo.length === 0 ? (
							<div>No questions found</div>
						) : (
							<QuestionDoSection
								totalQuestion={state.questionsDo.length}
								questionDoState={state.questionsDo[state.currentIndex]}
								currentQuestionIndex={state.currentIndex}
								onQuestionIndexChange={(index) => dispatch({
									type: "SET_INDEX",
									payload: index
								})}
								onQuestionFlagChanged={(isFlagged) => dispatch({
									type: "SET_FLAG",
									payload: isFlagged
								})}
							/>
						)}
					</div>
					<TimesUpDialog
						isOpen={isTimesUpDialogOpen}
						onBackToTest={() => {
							setIsTimesUpDialogOpen(false);
							navigate(paths.candidate.tests.in(testId).ROOT);
						}}
					/>
				</RightLayoutTemplate>
			)}
		/>
	);
}
