import { useNavigate } from "react-router-dom";
import RightLayoutTemplate from "../../../../../components/layouts/RightLayoutTemplate";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import QuestionDoCard from "../common/components/take-test/QuestionDoCard";
import TestDoSidebar from "../common/components/take-test/TestDoSidebar";
import useTakeTest from "../common/hooks/use-take-test/useTakeTest";
import paths from "../../../../../router/paths";
import { useGetExamsByTestIdQuery, useGetExamsByTestIdQuestionsToDoQuery } from "../../../../../features/tests/api/test.api-gen";
import { useState } from "react";

export default function CandidateTestTakeExamPage() {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();
	const [isNotFoundCurrentAttempt, setIsNotFoundCurrentAttempt] = useState(false);

	const examQuery = useGetExamsByTestIdQuery({ testId });
	const exam = examQuery.data;

	const questionsToDoQuery = useGetExamsByTestIdQuestionsToDoQuery({ testId });
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
		minutes: exam?.minutesToAnswer,
		onNotFoundCurrentAttempt: () => {
			setIsNotFoundCurrentAttempt(true);
		},
	});

	return (
		<RightLayoutTemplate
			header={{
				title: exam?.title || "Loading...",
				description: exam?.description,
			}}
			right={
				<TestDoSidebar
					currentQuestionIndex={currentQuestionIndex}
					onCurrentQuestionIndexChange={handleCurrentQuestionIndexChange}
					secondsLeft={secondsLeft}
					onCancel={() => navigate(paths.candidate.tests.in(testId).EXAM)}
					onSubmit={handleSubmit}
					questionDoState={questionDoings}
				/>
			}
		>
			<div className="flex flex-row w-full justify-between">
				{isLoading ? (
					<div className="flex items-center justify-center w-full h-full">
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
						<div className="text-primary text-lg ml-4">Loading questions...</div>
					</div>
				) : isNotFoundCurrentAttempt === true ? (
					<div className="flex items-center justify-center w-full h-full">
						<div className="bg-white rounded-lg shadow-md p-6 text-center">
							<p className="text-gray-600 mb-4">Current attempt not found.</p>
							<p className="text-gray-600 mb-4">You can start a new attempt.</p>
							<button
								className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-toned-600 transition-colors"
								onClick={() => navigate(paths.candidate.tests.in(testId).EXAM)}
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
