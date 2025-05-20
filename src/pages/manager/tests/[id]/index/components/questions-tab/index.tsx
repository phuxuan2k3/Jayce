import { mockQuestionAggregate, mockQuestions } from "./mockData";
import QuestionManageCard from "./QuestionManageCard";

export default function QuestionsList() {
	return <>
		<div className="flex flex-col gap-4">
			{mockQuestions.map((question, index) => (
				<QuestionManageCard
					key={index}
					totalAttempts={10}
					index={index}
					question={question}
					questionAggregate={mockQuestionAggregate[index]}
				/>
			))}
		</div>
	</>;
}
