import RightLayoutTemplate from "../../../../../components/layouts/RightLayoutTemplate";
import TestDoSidebar from "../common/components/TestDoSidebar";
import QuestionDoCard from "../common/components/QuestionDoCard";
import useTakeTest from "../common/hooks/use-take-test/useTakeTest";
import useTakePracticeData from "./hooks/useTakePracticeData";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import useTakePracticeActions from "./hooks/useTakePracticeActions";

const CandidateTestDoPage = () => {
	const testId = useGetTestIdParams();
	const { data: {
		practice,
		currentAttempt,
		answers,
		questionsToDo,
	}, isLoading } = useTakePracticeData(testId);

	const {
		handleQuestionAnswered,
		handleTestCancel,
		handleTestSubmit,
	} = useTakePracticeActions({
		testId: practice?.id,
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
					onTestCancel={handleTestCancel}
					onTestSubmit={handleTestSubmit}
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
							onQuestionAnswered={handleQuestionAnswered}
							onQuestionFlagToggled={handleFlagQuestionToggle}
						/>
					)
				)}
			</div>
		</RightLayoutTemplate>
	);
}

export default CandidateTestDoPage