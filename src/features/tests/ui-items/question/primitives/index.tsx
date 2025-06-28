import { BaseComponentProps } from "./types";
import { QuestionContext, QuestionContextProps, ShowAnswerContext } from "./contexts";
import { QuestionPrimitivesHeader } from "./QuestionHeader";
import { QuestionPrimitivesDetailBody } from "./QuestionBody";
import { useCallback, useState } from "react";
import { cn } from "../../../../../app/cn";

export type PrimitivesProps = BaseComponentProps & QuestionContextProps;

function QuestionPrimitives({
	children,
	className = "",
	...context
}: PrimitivesProps) {
	const [showAnswer, _setShowAnswer] = useState<boolean>(false);

	const setShowAnswer = useCallback((show: boolean) => {
		_setShowAnswer(show);
	}, []);

	return (
		<ShowAnswerContext.Provider value={{
			show: showAnswer,
			setShow: setShowAnswer,
		}}>
			<QuestionContext.Provider value={{
				...context,
			}}>
				<div
					className={cn(
						"flex flex-col gap-2 border border-primary rounded-lg shadow-md hover:shadow-lg px-6 py-6",
						context.onClick && "cursor-pointer hover:bg-primary-toned-50",
						className,
					)}
					onClick={context.onClick}>
					{children}
				</div>
			</QuestionContext.Provider >
		</ShowAnswerContext.Provider>
	);
}

// ================================================
// Exports
// ================================================

QuestionPrimitives.Header = QuestionPrimitivesHeader;
QuestionPrimitives.Detail = QuestionPrimitivesDetailBody;

export default QuestionPrimitives;


