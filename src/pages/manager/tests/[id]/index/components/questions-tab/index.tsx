import { useGetTestsByTestIdQuestionsQuery, QuestionCoreSchema } from "../../../../../../../features/tests/api/test.api-gen-v2";
import QuestionPrimitives from "../../../../../../../features/tests/ui-items/question/primitives";
import QuestionAggregate from "../../../../../../../features/tests/ui-items/question/primitives/QuestionAggregate";
import FetchStateCover2 from "../../../../../../../features/tests/ui/fetch-states/FetchStateCover2";

export default function QuestionsTab({
	testId,
}: {
	testId: string;
}) {
	const questionsQuery = useGetTestsByTestIdQuestionsQuery({ testId, viewCorrectAnswer: "1" });

	return (
		<FetchStateCover2
			fetchState={questionsQuery}
			dataComponent={(data) => (
				<div className="flex flex-col gap-4">
					{data.map((question, index) => (
						<QuestionManageCard
							key={question.id}
							question={question}
							index={index}
						/>
					))}
				</div>
			)}
		/>
	);
}

const QuestionManageCard = ({
	question,
	index,
}: {
	question: QuestionCoreSchema;
	index?: number;
}) => {
	return (
		<QuestionPrimitives question={question} index={index}>
			<QuestionPrimitives.Header />
			<QuestionPrimitives.Detail />
			<QuestionAggregate aggregate={question._aggregate_test} />
		</QuestionPrimitives>
	)
}

