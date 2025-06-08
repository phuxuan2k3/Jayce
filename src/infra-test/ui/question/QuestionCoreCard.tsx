import React, { createContext, useContext } from "react";
import { QuestionCore } from "../../core/question.model";

// Create context for the QuestionCard
interface QuestionCardContextType {
	question: QuestionCore;
	showAnswer: boolean;
	onToggleAnswer: () => void;
}

const QuestionCardContext = createContext<QuestionCardContextType | undefined>(undefined);

// Hook to use the context
const useQuestionCard = () => {
	const context = useContext(QuestionCardContext);
	if (!context) {
		throw new Error("QuestionCard compound components must be used within a QuestionCard");
	}
	return context;
};

// Main component props
interface QuestionCardProps {
	question: QuestionCore;
	showAnswer: boolean;
	onToggleAnswer: () => void;
	children?: React.ReactNode;
}

// Root component
const QuestionCoreCard = ({
	question,
	showAnswer,
	onToggleAnswer,
	children
}: QuestionCardProps) => {
	return (
		<QuestionCardContext.Provider value={{ question, showAnswer, onToggleAnswer }}>
			<div className="border border-gray-200 rounded-lg p-4 shadow-sm">
				{children}
			</div>
		</QuestionCardContext.Provider>
	);
};

// Sub-components
QuestionCoreCard.Header = () => {
	const { question } = useQuestionCard();
	return (
		<div className="flex justify-between items-start mb-3">
			<h4 className="text-md font-medium flex-1">{question.text}</h4>
			<span className="text-sm text-primary font-medium px-2 py-1 bg-primary bg-opacity-10 rounded-full">
				{question.points} {question.points === 1 ? "point" : "points"}
			</span>
		</div>
	);
};

QuestionCoreCard.Options = () => {
	const { question, showAnswer } = useQuestionCard();
	return (
		<div className="space-y-2 mb-4">
			{question.options.map((option, index) => (
				<div
					key={index}
					className={`p-3 rounded-md border ${showAnswer && index === question.correctOption
						? "border-green-500 bg-green-50"
						: "border-gray-200"
						}`}
				>
					<div className="flex items-start">
						<div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 flex-shrink-0 ${showAnswer && index === question.correctOption
							? "bg-green-500 text-white"
							: "bg-gray-100 text-gray-700"
							}`}>
							{String.fromCharCode(65 + index)}
						</div>
						<span className="text-sm">{option}</span>
					</div>
				</div>
			))}
		</div>
	);
};

QuestionCoreCard.Footer = () => {
	const { showAnswer, onToggleAnswer } = useQuestionCard();
	return (
		<div className="flex justify-end">
			<button
				className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${showAnswer
					? "bg-gray-100 text-gray-700 hover:bg-gray-200"
					: "border border-primary text-primary hover:bg-primary hover:text-white"
					}`}
				onClick={onToggleAnswer}
			>
				{showAnswer ? "Hide Answer" : "Show Answer"}
			</button>
		</div>
	);
};

export const QuestionCoreCardDefault = ({ question, showAnswer, onToggleAnswer }: Omit<QuestionCardProps, "children">) => {
	return (
		<QuestionCoreCard question={question} showAnswer={showAnswer} onToggleAnswer={onToggleAnswer}>
			<QuestionCoreCard.Header />
			<QuestionCoreCard.Options />
			<QuestionCoreCard.Footer />
		</QuestionCoreCard>
	);
};

export default QuestionCoreCard;