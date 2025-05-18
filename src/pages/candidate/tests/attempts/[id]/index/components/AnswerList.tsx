import { useEffect, useMemo } from "react";
import { FetchError } from "../../../../../../../app/server-error";
import { useGetSelfAttemptsByAttemptIdAnswersQuery, useGetSelfTestsByTestIdQuestionsToDoQuery, useGetSelfTestsByTestIdQuestionsWithAnswersQuery } from "../../../../../../../features/tests/api/test.api-gen"
import { AttemptCore } from "../../../../../../../features/tests/model/attempt.model";
import AnswerCard from "./AnswerCard";

export default function AnswerList({
	attempt,
	showAnswers,
}: {
	attempt: AttemptCore;
	showAnswers: boolean;
}) {
	const answersQuery = useGetSelfAttemptsByAttemptIdAnswersQuery({
		attemptId: attempt.id
	}, {
		skip: attempt == null,
	});
	const questionsToDoQuery = useGetSelfTestsByTestIdQuestionsToDoQuery({
		testId: attempt.testId,
	}, {
		skip: showAnswers === true,
	});

	const questionsWithAnswersQuery = useGetSelfTestsByTestIdQuestionsWithAnswersQuery({
		testId: attempt.testId,
	}, {
		skip: showAnswers === false,
	});

	const questionsToDoWithOptionalAnswers = useMemo(() => {
		const chosenQuery = showAnswers ? questionsWithAnswersQuery : questionsToDoQuery;
		return chosenQuery.data?.map((question) => {
			const answer = answersQuery.data?.find((answer) => answer.questionId === question.id);
			return {
				...question,
				answer: answer ? {
					...answer,
					points: question.points
				} : null,
				correctOption: showAnswers === true && "correctOption" in question ? Number(question["correctOption"]) : undefined,
			}
		}) ?? [];
	}, [
		questionsToDoQuery.data,
		answersQuery.data,
		questionsWithAnswersQuery.data,
		showAnswers
	]);

	if (answersQuery.isLoading) return (
		<div className="flex justify-center items-center h-64">
			<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
		</div>
	)
	if (answersQuery.data == null) return (
		<div className="flex justify-center items-center h-64">
			<div className="bg-white rounded-lg shadow-md p-6 text-center">
				<p className="text-gray-600">No answers found for this attempt.</p>
			</div>
		</div>
	);
	if (answersQuery.error) throw new FetchError(answersQuery.error);

	return (
		<div className="flex flex-col w-full gap-4">
			{questionsToDoWithOptionalAnswers.map((questionToDoWithOptionalAnswer, index) => (
				<div key={index} className="flex flex-col gap-4">
					<AnswerCard
						index={index}
						question={questionToDoWithOptionalAnswer}
						chosenOption={questionToDoWithOptionalAnswer.answer?.chosenOption}
						correctOption={questionToDoWithOptionalAnswer.correctOption}
					/>
					{index === questionsToDoWithOptionalAnswers.length - 1 ? null : <hr className="border-gray-300" />}
				</div>
			))}
		</div>
	)
}
