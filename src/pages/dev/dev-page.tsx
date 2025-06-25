import { MockQuestionCore } from "../../infra-test/ui-items/question/mock-questions";
import { QuestionDefault } from "../../infra-test/ui-items/question/views/QuestionDefault";
import { QuestionDo } from "../../infra-test/ui-items/question/views/QuestionDo";

export default function DevPage() {
	return (<>
		<div className="container mx-auto p-4 flex flex-col gap-4">
			{/* {MockQuestionCore.map((question, index) => (
				<QuestionDefault
					question={question}
					key={question.id}
					index={index}
				// onClick={() => console.log("Question clicked:", question.id)}
				/>
			))} */}

			<QuestionDefault
				question={MockQuestionCore[0]}
				index={0}
				withAnswer={{
					child: {
						type: "MCQ",
						chosenOption: 3,
					},
					pointReceived: 1,
				}}
				showAggregate
			/>

			<QuestionDefault
				question={MockQuestionCore[2]}
				index={2}
				withAnswer={{
					child: {
						type: "LONG_ANSWER",
						answer: "This is a long answer to the question. It provides detailed information and explanation.",
					},
					pointReceived: 1, // No points received yet
				}}
			/>

			{/* <QuestionDo
				question={MockQuestionCore[1]}
				index={1}
			/>

			<QuestionDo
				question={MockQuestionCore[2]}
				index={3}
			/> */}
		</div>
	</>);
}
