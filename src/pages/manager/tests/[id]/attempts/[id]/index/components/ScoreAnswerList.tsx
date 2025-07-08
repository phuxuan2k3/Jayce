import { useEffect } from "react";
import { useGetAttemptsByAttemptIdAnswersQuery, useGetTestsByTestIdQuestionsQuery } from "../../../../../../../../features/tests/api/test.api-gen-v2";
import useGetAttemptIdParams from "../../../../../../../../features/tests/hooks/useGetAttemptIdParams";
import useGetTestIdParams from "../../../../../../../../features/tests/hooks/useGetTestIdParams";
import { QuestionsConverter } from "../../../../../../../../features/tests/ui-items/question/questions-converter";
import { QuestionScore } from "../../../../../../../../features/tests/ui-items/question/views/QuestionScore";
import FetchStateCover2 from "../../../../../../../../features/tests/ui/fetch-states/FetchStateCover2";
import { ScoreAnswerMap } from "../types";

export default function ScoreAnswerList({
	isShowAllAnswers,
	scoreAnswers,
	setScoreAnswers,
}: {
	isShowAllAnswers: boolean;
	scoreAnswers: ScoreAnswerMap;
	setScoreAnswers: React.Dispatch<React.SetStateAction<ScoreAnswerMap>>;
}) {
	const testId = useGetTestIdParams();
	const attemptId = useGetAttemptIdParams();
	const answersQuery = useGetAttemptsByAttemptIdAnswersQuery({
		attemptId
	}, {
		refetchOnMountOrArgChange: true,
	});
	const questionsQuery = useGetTestsByTestIdQuestionsQuery({
		testId,
		viewCorrectAnswer: "1",
	}, {
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		if (answersQuery.isSuccess) {
			const answers = answersQuery.data;
			setScoreAnswers(
				answers.reduce((acc, answer) => {
					acc[answer.id] = {
						points: answer.pointReceived,
						comment: answer.comment,
					};
					return acc;
				}, {} as ScoreAnswerMap)
			);
		}
	}, [answersQuery.isSuccess]);

	return (
		<div className="flex flex-1 flex-col gap-4">
			<FetchStateCover2
				fetchState={answersQuery}
				loadingComponent={<div className="w-full h-32 animate-pulse bg-gray-200 rounded-lg" />}
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
									<QuestionScore
										key={item.question.id}
										index={index}
										question={item.question}
										withAnswer={item.answer}
										showAnswer={isShowAllAnswers}
										hasAnswer={item.answer != null ? {
											givenPoints: scoreAnswers[item.answer.id].points ?? 0,
											onGivenPointsChange: (points: number) => {
												const id = item.answer?.id;
												if (!id) return;
												setScoreAnswers(prev => ({
													...prev,
													[id]: {
														...prev[id],
														points: points,
													}
												}));
											},
											givenComment: scoreAnswers[item.answer.id].comment ?? "",
											onGivenCommentChange: (comment?: string) => {
												const id = item.answer?.id;
												if (!id) return;
												setScoreAnswers(prev => ({
													...prev,
													[id]: {
														...prev[id],
														comment: comment ?? null,
													}
												}));
											},
										} : undefined}
									/>
								))
							);
						}}
					/>
				)}
			/>
		</div>
	)
}
