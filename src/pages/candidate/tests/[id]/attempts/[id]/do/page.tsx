import { useEffect, useReducer } from "react";
import RightLayoutTemplate from "../../../../../../../components/layouts/RightLayoutTemplate";
import FetchStateCover2 from "../../../../../../../infra-test/ui/fetch-states/FetchStateCover2";
import TestDoSidebar from "./components/TestDoSidebar";
import useTestDoServer from "./hooks/useTestDoServer";
import { initialState, testDoReducer } from "./model";
import { usePatchAttemptsByAttemptIdSubmitMutation } from "../../../../../../../infra-test/api/test.api-gen-v2";
import useGetAttemptIdParams from "../../../../../../../infra-test/hooks/useGetAttemptIdParams";
import QuestionDoSection from "./components/QuestionDoSection";
import useActionStateWatch from "../../../../../../../infra-test/hooks/useActionStateWatch";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../../../router/paths";
import { toast } from "react-toastify";
import { parseQueryError } from "../../../../../../../helpers/fetchBaseQuery.error";

export default function CandidateTestDoPage() {
	const navigate = useNavigate();
	const attemptId = useGetAttemptIdParams();

	const serverState = useTestDoServer();
	const [patchSubmit, submitState] = usePatchAttemptsByAttemptIdSubmitMutation();
	useActionStateWatch(submitState, {
		onSuccess: () => {
			toast.success("Attempt submitted successfully");
			navigate(paths.candidate.tests.attempts.in(attemptId).ROOT);
		},
		onError: (error) => {
			console.error("Failed to submit attempt:", error);
			const errorMessage = parseQueryError(error);
			toast.error("Failed to submit attempt: " + errorMessage);
		}
	});

	const [state, dispatch] = useReducer(testDoReducer, initialState);

	useEffect(() => {
		if (serverState.data) {
			dispatch({ type: "INITIALIZE_STATE", payload: serverState.data });
		}
	}, [serverState.data]);

	return (
		<FetchStateCover2
			fetchState={serverState}
			dataComponent={({ test, attempt }) => (
				<RightLayoutTemplate
					header={
						<RightLayoutTemplate.Header
							title={test.title}
							description={test.description}
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
						/>
					}
				>
					<div className="flex flex-row w-full justify-between">
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
				</RightLayoutTemplate>
			)}
		/>
	);
}
