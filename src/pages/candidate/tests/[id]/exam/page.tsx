import RightLayoutTemplate from "../../../../../components/layouts/RightLayoutTemplate";
import TestDoSidebar from "../../../../../features/tests/ui/TestDoSidebar";
import useTestDo from "../../../../../features/tests/hooks/useTestDo";
import QuestionDoCard from "../../../../../features/tests/ui/QuestionDoCard";

const CandidateTestExamPage = () => {
	const {
		testDo,
		secondsLeft,
		currentQuestionIndex,
		onCurrentQuestionIndexChange,
		onTestCancel,
		onTestSubmit,
		onQuestionAnswered,
		onQuestionFlagToggled,
	} = useTestDo();

	return (
		<RightLayoutTemplate
			header={{
				title: testDo.title,
				description: testDo.description,
			}}
			right={
				<TestDoSidebar
					currentQuestionIndex={currentQuestionIndex}
					onCurrentQuestionIndexChange={onCurrentQuestionIndexChange}
					secondsLeft={secondsLeft}
					onTestCancel={onTestCancel}
					onTestSubmit={onTestSubmit}
					questions={testDo.questions}
				/>
			}
		>
			<div className="flex flex-row w-full justify-between">
				{testDo.questions.length === 0 ? (
					<div>No questions found</div>
				) : (testDo.questions[currentQuestionIndex] &&
					<QuestionDoCard
						currentQuestionIndex={currentQuestionIndex}
						questionDoInTest={testDo.questions[currentQuestionIndex]}
						totalQuestion={testDo.questions.length}
						onQuestionIndexChange={onCurrentQuestionIndexChange}
						onQuestionAnswered={onQuestionAnswered}
						onQuestionFlagToggled={onQuestionFlagToggled}
					/>
				)}
			</div>
		</RightLayoutTemplate>
	);
}

export default CandidateTestExamPage