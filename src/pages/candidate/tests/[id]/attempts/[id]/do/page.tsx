import { useEffect, useRef } from "react";
import RightLayoutTemplate from "../../../../../../../components/layouts/RightLayoutTemplate";
import TestDoSidebar from "./components/TestDoSidebar";
import useTestDoServer from "./hooks/useTestDoServer";
// import { initialState, testDoReducer } from "./model";
import QuestionDoSection from "./components/QuestionDoSection";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../../../router/paths";
import FetchStateCover2 from "../../../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import useGetTestIdParams from "../../../../../../../features/tests/hooks/useGetTestIdParams";
import { useAppDispatch, useAppSelector } from "../../../../../../../app/hooks";
import testDoSlice from "../../../../../../../features/tests/stores/testDoSlice";
import useGetAttemptIdParams from "../../../../../../../features/tests/hooks/useGetAttemptIdParams";
import TitleSkeleton from "../../../../../../../features/tests/ui/skeletons/TitleSkeleton";
import { useLanguage } from "../../../../../../../LanguageProvider";

export default function CandidateTestAttemptsDoPage() {
	const { t } = useLanguage();
	
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const attemptId = useGetAttemptIdParams();

	const appDispatch = useAppDispatch();
	const attemptState = useAppSelector((state) => testDoSlice.selectors.selectAttempt(state, attemptId));
	const currentQuestionState = useAppSelector((state) => testDoSlice.selectors.selectCurrentQuestion(state, attemptId));

	const isLoadedRef = useRef(false);
	const serverState = useTestDoServer();

	useEffect(() => {
		if (serverState.data == null || !serverState.isSuccess || attemptState != null) return;
		if (isLoadedRef.current === true) return; // Prevent reloading if already loaded

		const { data: { attempt, test, questions, attemptAnswers } } = serverState;
		appDispatch(testDoSlice.actions.loadAttempt({
			attemptId,
			testId,
			createdAt: attempt.createdAt,
			minutesToAnswer: test.minutesToAnswer,
			questionIds: questions.map((q) => q.id),
			answers: attemptAnswers.map((answer) => ({
				questionId: answer.questionId,
				answer: answer.child || null
			}))
		}));
		isLoadedRef.current = true; // Mark as loaded to prevent reloading
	}, [serverState.isSuccess, serverState.data, attemptState, attemptId, testId]);

	useEffect(() => {
		// Clear all attempts state when the component unmounts
		return () => {
			appDispatch(testDoSlice.actions.clear());
			isLoadedRef.current = false; // Reset loaded state
		};
	}, []);

	return (
		<RightLayoutTemplate
			header={
				<FetchStateCover2
					fetchState={serverState}
					loadingComponent={<TitleSkeleton />}
					dataComponent={({ test }) => attemptState && (
						<RightLayoutTemplate.Header
							title={test.title}
							description={test.description}
							backButton={
								<RightLayoutTemplate.BackButton
									onClick={() => navigate(paths.candidate.tests.in(testId).ROOT)}
								/>
							}
						/>
					)}
				/>
			}
			right={
				<FetchStateCover2
					fetchState={serverState}
					loadingComponent={<TitleSkeleton />}
					dataComponent={({ test, attempt }) => attemptState && (
						<TestDoSidebar
							attempt={attempt}
							test={test}
							currentQuestionIndex={attemptState.currentQuestionIndex}
							questionDoState={attemptState.indexedQuestionIds.map((id, index) => {
								const question = attemptState.questions[id];
								return {
									index,
									isFlagged: question.isFlagged,
									answer: question.answer
								};
							})}
							onCurrentQuestionIndexChange={(index) => appDispatch(testDoSlice.actions.setCurrentQuestionIndex({
								attemptId,
								index,
							}))}
						/>
					)}
				/>
			}
		>
			<FetchStateCover2
				fetchState={serverState}
				loadingComponent={<TitleSkeleton />}
				dataComponent={({ questions }) => (attemptState != null && currentQuestionState != null) ? (
					<div className="flex w-full justify-between">
						{attemptState.indexedQuestionIds.length === 0 ? (
							<div>{t("test_do_no_questions")}</div>
						) : (
							<QuestionDoSection
								totalQuestion={attemptState.indexedQuestionIds.length}
								index={attemptState.currentQuestionIndex}
								question={questions[attemptState.currentQuestionIndex]}
								isFlagged={currentQuestionState.isFlagged}
								currentQuestionIndex={attemptState.currentQuestionIndex}
								answer={currentQuestionState.answer}
								onQuestionIndexChange={(index) => appDispatch(testDoSlice.actions.setCurrentQuestionIndex({
									attemptId,
									index
								}))}
								onQuestionFlagChanged={() => appDispatch(testDoSlice.actions.toggleFlagQuestion({
									attemptId,
								}))}
								onQuestionAnswerChanged={(answer) => appDispatch(testDoSlice.actions.answer({
									attemptId,
									answer: answer || null
								}))}
							/>
						)}
					</div>
				) : (
					<div className="flex w-full justify-center items-center h-full">
						<div className="text-gray-500">{t("test_do_no_question_selected")}</div>
					</div>
				)}
			/>

		</RightLayoutTemplate>
	);
}