import { MockQuestionCore } from "../../infra-test/ui-items/question/mock-questions";
import QuestionCoreCard from "../../infra-test/ui-items/question/QuestionCoreCard";
import { MockTestCore, MockTestFull } from "../../infra-test/ui-items/test/mock-test";
import TestCoreCard from "../../infra-test/ui-items/test/TestCoreCard";
import TestFullCard from "../../infra-test/ui-items/test/TestFullCard";

export default function DevPage() {
	return (<>
		<div className="container mx-auto p-4">
			{MockQuestionCore.map((question) => (
				<QuestionCoreCard
					key={question.id}
					question={question}
					showCorrectAnswer={true}
					className="mb-4"
				/>
			))}
		</div>
	</>);
}
