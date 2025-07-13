import QuestionPrimitives from "../primitives";
import { QuestionPrimitivesHeader } from "../primitives/QuestionHeader";
import { QuestionPrimitivesDoBody } from "../primitives/QuestionBody";
import { BaseComponentProps } from "../primitives/types";
import { AnswerForQuestionTypeSchema, QuestionCoreSchema } from "../../../api/test.api-gen-v2";
import { DoQuestionContext } from "../primitives/contexts";
import { Flag } from "lucide-react";
import { cn } from "../../../../../app/cn";
import { useLanguage } from "../../../../../LanguageProvider";

function FlagButton({
	isFlagged,
	onIsFlaggedChange,
	className = "",
}: {
	isFlagged: boolean;
	onIsFlaggedChange: (isFlagged: boolean) => void;
	className?: string;
}) {
	const { t } = useLanguage();

	return (
		<div
			className={cn("cursor-pointer", className)}
			onClick={() => onIsFlaggedChange(!isFlagged)}
		>
			{isFlagged ? (
				<div className="flex items-center gap-1 hover:underline text-secondary">
					<span className="font-semibold">{t("flagged")}</span>
					<Flag size={20} strokeWidth={2.5} className="inline" />
				</div>
			) : (
				<div className="flex items-center gap-1 hover:underline text-primary">
					<span className="font-semibold">{t("flag_this_question")}</span>
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
				<div className="flex flex-col mb-2">
					<QuestionPrimitivesHeader />
					<FlagButton
						className="self-end"
						isFlagged={isFlagged}
						onIsFlaggedChange={setIsFlagged}
					/>
				</div>
				<QuestionPrimitivesDoBody />
			</QuestionPrimitives>
		</DoQuestionContext.Provider>
	);
}
