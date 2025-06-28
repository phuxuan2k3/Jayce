import QuestionPrimitives from "../primitives";
import { QuestionPrimitivesHeader } from "../primitives/QuestionHeader";
import { QuestionPrimitivesDoBody } from "../primitives/QuestionBody";
import { BaseComponentProps } from "../primitives/types";
import { AnswerForQuestionTypeSchema, QuestionCoreSchema } from "../../../api/test.api-gen-v2";
import { DoQuestionContext } from "../primitives/contexts";
import { Flag } from "lucide-react";
import { cn } from "../../../../../app/cn";

function FlagButton({
	isFlagged,
	onIsFlaggedChange,
}: {
	isFlagged: boolean;
	onIsFlaggedChange: (isFlagged: boolean) => void;
}) {
	return (
		<div onClick={() => onIsFlaggedChange(!isFlagged)} className="cursor-pointer">
			{isFlagged ? (
				<div className="flex items-center gap-1 text-secondary">
					<span className="font-semibold">Flagged</span>
					<Flag size={20} strokeWidth={2.5} className="inline" />
				</div>
			) : (
				<div className="text-primary">
					<Flag size={20} strokeWidth={2.5} />
				</div>
			)}
		</div>
	);
}

export function QuestionDo({
	className = "",
	index,
	question,
	doAnswer,
	setDoAnswer,
	isFlagged,
	setIsFlagged,
}: BaseComponentProps & {
	question: QuestionCoreSchema;
	index: number;
	doAnswer: AnswerForQuestionTypeSchema | undefined;
	setDoAnswer: (answer: AnswerForQuestionTypeSchema | undefined) => void;
	isFlagged: boolean;
	setIsFlagged: (isFlagged: boolean) => void;
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
				<QuestionPrimitivesHeader.Layout>
					<div className="flex flex-col items-stretch gap-1 flex-shrink-0">
						<QuestionPrimitivesHeader.Index />
						<QuestionPrimitivesHeader.Points className="w-full text-center" />
					</div>
					<QuestionPrimitivesHeader.Text className="flex-1" />

					<FlagButton isFlagged={isFlagged} onIsFlaggedChange={setIsFlagged} />
				</QuestionPrimitivesHeader.Layout>

				<QuestionPrimitivesDoBody />

			</QuestionPrimitives>
		</DoQuestionContext.Provider>
	);
}
