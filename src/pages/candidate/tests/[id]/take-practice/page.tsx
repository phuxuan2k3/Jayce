import RightLayoutTemplate from "../../../../../components/layouts/RightLayoutTemplate";
import TestDoSidebar from "../common/components/take-test/TestDoSidebar";
import QuestionDoCard from "../common/components/take-test/QuestionDoCard";
import useTakeTest from "../common/hooks/use-take-test/useTakeTest";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import { useNavigate } from "react-router-dom";
import { useGetPracticesByTestIdQuery, useGetPracticesByTestIdQuestionsToDoQuery } from "../../../../../features/tests/api/test.api-gen";
import useCurrentAttemptWithAnswers from "../common/hooks/use-take-test/useCurrentAttemptWithAnswers";
import useCurrentAttemptActions from "../common/hooks/use-take-test/useCurrentAttemptActions";
import paths from "../../../../../router/paths";

const CandidateTestDoPage = () => {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();

	const practiceQuery = useGetPracticesByTestIdQuery({ testId });
	const practice = practiceQuery.data;

	const questionsToDoQuery = useGetPracticesByTestIdQuestionsToDoQuery({ testId });
	const questionsToDo = questionsToDoQuery.data || [];

	const { data: {
		currentAttempt,
		answers,
	}, isLoading } = useCurrentAttemptWithAnswers(testId);

	const {
		handleAnswer,
		handleSubmit,
	} = useCurrentAttemptActions({
		attemptId: currentAttempt?.id,
	});

	const {
		secondsLeft,
		questionDoings,
		currentQuestionIndex,
		currentQuestion,
		handleCurrentQuestionIndexChange,
		handleFlagQuestionToggle,
	} = useTakeTest({
		questionsAnswers: answers,
		questionsToDo: questionsToDo,
		startedAt: currentAttempt?.createdAt,
		minutes: practice?.minutesToAnswer,
	});

	return (
		<RightLayoutTemplate
			header={{
				title: practice?.title || "Loading...",
				description: practice?.description,
			}}
			right={
				<TestDoSidebar
					currentQuestionIndex={currentQuestionIndex}
					onCurrentQuestionIndexChange={handleCurrentQuestionIndexChange}
					secondsLeft={secondsLeft}
					onCancel={() => navigate(paths.candidate.tests.in(testId).PRACTICE)}
					onSubmit={handleSubmit}
					questionDoState={questionDoings}
				/>
			}
		>
			<div className="flex flex-row w-full justify-between">
				{isLoading ? (
					<div className="flex items-center justify-center w-full h-full">
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
					</div>
				) : (
					questionsToDo.length === 0 ? (
						<div>No questions found</div>
					) : (
						<QuestionDoCard
							currentQuestionIndex={currentQuestionIndex}
							questionToDo={currentQuestion.question}
							questionDoingState={currentQuestion.state}
							totalQuestion={questionsToDo.length}
							onQuestionIndexChange={handleCurrentQuestionIndexChange}
							onQuestionAnswered={handleAnswer}
							onQuestionFlagToggled={handleFlagQuestionToggle}
						/>
					)
				)}
			</div>
		</RightLayoutTemplate>
	);
}

export default CandidateTestDoPage