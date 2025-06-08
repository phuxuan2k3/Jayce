import RightLayoutTemplate from "../../../../../components/layouts/RightLayoutTemplate";
import TestDoSidebar from "../common/components/take-test/TestDoSidebar";
import QuestionDoCard from "../common/components/take-test/QuestionDoCard";
import useTakeTest from "../common/hooks/use-take-test/useTakeTest";
import { useNavigate } from "react-router-dom";
import { useGetPracticesByTestIdQuery, useGetPracticesByTestIdQuestionsToDoQuery } from "../../../../../features/tests/api/test.api-gen";
import paths from "../../../../../router/paths";
import { useState } from "react";
import useGetTestIdParams from "../../../../../infra-test/hooks/useGetTestIdParams";

const CandidateTestTakePracticePage = () => {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();
	const [isNotFoundCurrentAttempt, setIsNotFoundCurrentAttempt] = useState(false);

	const practiceQuery = useGetPracticesByTestIdQuery({ testId });
	const practice = practiceQuery.data;

	const questionsToDoQuery = useGetPracticesByTestIdQuestionsToDoQuery({ testId });
	const questionsToDo = questionsToDoQuery.data || [];

	const {
		isLoading,
		secondsLeft,
		questionDoings,
		currentQuestionIndex,
		currentQuestion,
		handleAnswer,
		handleSubmit,
		handleCurrentQuestionIndexChange,
		handleFlagQuestionToggle,
	} = useTakeTest({
		testId,
		questionsToDo: questionsToDo,
		minutes: practice?.minutesToAnswer,
		onNotFoundCurrentAttempt: () => {
			setIsNotFoundCurrentAttempt(true);
		}
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
						<div className="text-center mt-4">Loading questions...</div>
					</div>
				) : isNotFoundCurrentAttempt === true ? (
					<div className="flex items-center justify-center w-full h-full">
						<div className="text-center">
							<p className="text-lg font-semibold">No ongoing attempt found.</p>
							<p className="text-gray-600 mt-2">Please start a new attempt.</p>
							<button
								className="mt-4 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
								onClick={() => navigate(paths.candidate.tests.in(testId).PRACTICE)}
							>
								Start New Attempt
							</button>
						</div>
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

export default CandidateTestTakePracticePage