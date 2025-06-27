import { useGetAttemptsByAttemptIdAnswersQuery, useGetTestsByTestIdQuestionsQuery } from "../../api/test.api-gen-v2";
import { QueryUtils } from "../../types/query";
import FetchStateCover2 from "../../ui/fetch-states/FetchStateCover2";
import concatQuestionsWithOptionalAnswers from "../../functions/concatQuestionsAnswers";
import QuestionWithAnswer from "../../ui-items/question/views/QuestionWithAnswer";

export default function AnswersList({
	attemptId,
	testId,
	viewCorrectAnswer,
}: {
	attemptId: string;
	testId: string;
	viewCorrectAnswer: boolean;
}) {
	const answersQuery = useGetAttemptsByAttemptIdAnswersQuery({ attemptId });
	const questionsQuery = useGetTestsByTestIdQuestionsQuery({
		testId,
		viewCorrectAnswer: QueryUtils.fromBoolean(viewCorrectAnswer),
	}, {
		refetchOnMountOrArgChange: true,
	});

	return (
		<FetchStateCover2
			fetchState={answersQuery}
			dataComponent={(answers) => (
				<FetchStateCover2
					fetchState={questionsQuery}
					dataComponent={(questions) => {
						const questionsWithOptionalAnswers = concatQuestionsWithOptionalAnswers({
							questions: questions,
							answers: answers,
						});
						return (
							<div className="flex flex-col w-full gap-4">
								{questionsWithOptionalAnswers.map((item, index) => (
									<QuestionWithAnswer
										index={index}
										question={item.question}
										withAnswer={item.answer}
									/>
								))}
							</div>
						);
					}}
				/>
			)}
		/>
	);
}
