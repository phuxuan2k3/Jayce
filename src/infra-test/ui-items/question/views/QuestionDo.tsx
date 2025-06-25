import QuestionPrimitives from "../primitives";
import { cn } from "../../../../app/cn";
import { QuestionPrimitivesHeader } from "../primitives/QuestionHeader";
import { QuestionPrimitivesDoBody } from "../primitives/QuestionBody";
import { BaseComponentProps } from "../primitives/types";
import { AnswerForQuestionTypeSchema, QuestionCoreSchema } from "../../../api/test.api-gen-v2";
import { DoQuestionContext } from "../primitives/contexts";

export function QuestionDo({
	className = "",
	index,
	question,
	doAnswer,
	setDoAnswer,
}: BaseComponentProps & {
	question: QuestionCoreSchema;
	index: number;
	doAnswer: AnswerForQuestionTypeSchema | undefined;
	setDoAnswer: (answer: AnswerForQuestionTypeSchema | undefined) => void;
}) {
	return (
		<DoQuestionContext.Provider value={{
			doAnswer,
			setDoAnswer,
		}}>
			<QuestionPrimitives
				question={question}
				className={cn("bg-white", className)}
				index={index}
			>
				<QuestionPrimitivesHeader />
				<QuestionPrimitivesDoBody />
			</QuestionPrimitives>
		</DoQuestionContext.Provider>
	);
}
