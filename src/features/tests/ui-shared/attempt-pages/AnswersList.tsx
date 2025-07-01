import { useGetAttemptsByAttemptIdAnswersQuery, useGetTestsByTestIdQuestionsQuery } from "../../api/test.api-gen-v2";
import { QueryUtils } from "../../types/query";
import FetchStateCover2 from "../../ui/fetch-states/FetchStateCover2";
import QuestionWithAnswer from "../../ui-items/question/views/QuestionWithAnswer";
import { QuestionsConverter } from "../../ui-items/question/questions-converter";
import { useState } from "react";
import useGetTestIdParams from "../../hooks/useGetTestIdParams";
import useGetAttemptIdParams from "../../hooks/useGetAttemptIdParams";
import MyButton from "../../ui/buttons/MyButton";

export default function AnswersList({
	isAllowedToShowAnswer,
}: {
	isAllowedToShowAnswer: boolean;
}) {
	const testId = useGetTestIdParams();
	const attemptId = useGetAttemptIdParams();
	const [isLoadAnswer, setIsLoadAnswer] = useState(false);
	const [isShowAllAnswers, setIsShowAllAnswers] = useState(false);

	const answersQuery = useGetAttemptsByAttemptIdAnswersQuery({ attemptId });
	const questionsQuery = useGetTestsByTestIdQuestionsQuery({
		testId,
		viewCorrectAnswer: QueryUtils.fromBoolean(isAllowedToShowAnswer && isLoadAnswer),
	}, {
		refetchOnMountOrArgChange: true,
	});

	return (
		<div className="flex flex-col w-full gap-4">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold">Your Answers</h2>
				{(isLoadAnswer === true && questionsQuery.isFetching === false) ? (
					<MyButton
						size={"medium"}
						onClick={() => setIsShowAllAnswers(!isShowAllAnswers)}
					>
						{isShowAllAnswers ? "Hide All Answers" : "Show All Answers"}
					</MyButton>
				) : (
					<MyButton
						size={"medium"}
						onClick={() => setIsLoadAnswer(true)}
						disabled={questionsQuery.isFetching}
					>
						Load Correct Answers
					</MyButton>
				)}
			</div>
			<div className="flex flex-1 flex-col gap-4">
				<FetchStateCover2
					fetchState={answersQuery}
					dataComponent={(answers) => (
						<FetchStateCover2
							fetchState={questionsQuery}
							dataComponent={(questions) => {
								const questionsWithOptionalAnswers = QuestionsConverter.concatQuestionsWithOptionalAnswers({
									questions: questions,
									answers: answers,
								});
								return (
									questionsWithOptionalAnswers.map((item, index) => (
										<QuestionWithAnswer
											index={index}
											question={item.question}
											withAnswer={item.answer}
											showAnswer={isShowAllAnswers}
										/>
									))
								);
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
}
