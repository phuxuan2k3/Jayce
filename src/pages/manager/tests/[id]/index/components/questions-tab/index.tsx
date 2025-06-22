import { useMemo } from "react";
import FetchStateCover from "../../../../../../../components/wrapper/FetchStateCover";
import { useGetExamsByTestIdAttemptsAggregateQuery, useGetExamsByTestIdQuestionsAggregateQuery, useGetExamsByTestIdQuestionsWithAnswerQuery } from "../../../../../../../infra-test/api/test.api-gen";
import QuestionManageCard from "../../../../../../../infra-test/ui/question/QuestionManageCard";
import { QuestionsTabModel, QuestionsWithAggregate } from "./type";

export default function QuestionsTab({
	testId,
}: {
	testId: string;
}) {
	const questionsQuery = useGetExamsByTestIdQuestionsWithAnswerQuery({ testId });
	const questionsAggregateQuery = useGetExamsByTestIdQuestionsAggregateQuery({ testId });
	const testAttemptsAggregateQuery = useGetExamsByTestIdAttemptsAggregateQuery({ testId });

	const questions = questionsQuery.data;
	const questionsAggregate = questionsAggregateQuery.data;
	const testAttemptsAggregate = testAttemptsAggregateQuery.data;

	const questionsWithAggregate: QuestionsWithAggregate[] = useMemo(() => {
		if (questions == null || questionsAggregate == null) return [];
		return questions.map((question) => {
			const aggregate = questionsAggregate.find((agg) => agg.questionId === question.id);
			return {
				question,
				aggregate: aggregate ?? {
					questionId: question.id,
					numberOfAnswers: 0,
					numberOfCorrectAnswers: 0,
					averagePoints: 0,
				},
			};
		});
	}, [questions, questionsAggregate]);

	const model: QuestionsTabModel = useMemo<QuestionsTabModel>(() => {
		return {
			questionsWithAggregate: questionsWithAggregate,
			totalAttempts: testAttemptsAggregate?.totalAttempts ?? 0,
		}
	}, [questionsWithAggregate, testAttemptsAggregate]);


	const isLoading = questionsQuery.isLoading || questionsAggregateQuery.isLoading || testAttemptsAggregateQuery.isLoading;
	const error = questionsQuery.error || questionsAggregateQuery.error || testAttemptsAggregateQuery.error;

	if (
		questionsQuery.data == null ||
		questionsAggregateQuery.data == null ||
		testAttemptsAggregateQuery.data == null
	) return null;

	return (
		<FetchStateCover
			queryState={{
				isLoading,
				error,
				data: model,
			}}
		>
			<div className="flex flex-col gap-4">
				{model.questionsWithAggregate.map((question, index) => (
					<QuestionManageCard
						key={index}
						totalAttempts={model.totalAttempts}
						index={index}
						question={question.question}
						questionAggregate={question.aggregate}
					/>
				))}
			</div>
		</FetchStateCover>
	);
}
