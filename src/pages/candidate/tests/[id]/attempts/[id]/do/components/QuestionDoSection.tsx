import { AnswerForQuestionTypeSchema, QuestionCoreSchema } from "../../../../../../../../features/tests/api/test.api-gen-v2";
import { QuestionDo } from "../../../../../../../../features/tests/ui-items/question/views/QuestionDo";
import { useLanguage } from "../../../../../../../../LanguageProvider";

export default function QuestionDoSection({
	totalQuestion,
	index,
	question,
	isFlagged,
	answer,
	currentQuestionIndex,
	onQuestionIndexChange,
	onQuestionFlagChanged,
	onQuestionAnswerChanged,
}: {
	totalQuestion: number;
	index: number;
	question: QuestionCoreSchema;
	isFlagged: boolean;
	answer: AnswerForQuestionTypeSchema | null;
	currentQuestionIndex: number;
	onQuestionIndexChange: (index: number) => void;
	onQuestionFlagChanged: (isFlagged: boolean) => void;
	onQuestionAnswerChanged: (answer: AnswerForQuestionTypeSchema | undefined) => void;
}) {
	const { t } = useLanguage();

	const isFirstQuestion = currentQuestionIndex === 0;
	const isLastQuestion = currentQuestionIndex === totalQuestion - 1;

	const handleNextQuestion = () => {
		if (currentQuestionIndex < totalQuestion) {
			onQuestionIndexChange(currentQuestionIndex + 1);
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex >= 1) {
			onQuestionIndexChange(currentQuestionIndex - 1);
		}
	};

	const handleAnswerQuestion = (answer: AnswerForQuestionTypeSchema | undefined) => {
		onQuestionAnswerChanged(answer);
	};

	return (
		<div className="w-full flex flex-col justify-between">
			<QuestionDo
				question={question}
				doAnswer={answer || undefined}
				setDoAnswer={(answer) => handleAnswerQuestion(answer)}
				index={index}
				isFlagged={isFlagged}
				setIsFlagged={(isFlagged) => onQuestionFlagChanged(isFlagged)}
			/>

			<hr className="mt-8 mb-4 border-primary-toned-700/50" />

			<div className="flex flex-row justify-between items-center">
				<button
					className="font-bold text-primary border-2 border-primary bg-white rounded-lg px-6 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={handlePreviousQuestion}
					disabled={isFirstQuestion}
				>
					{t("previous")}
				</button>

				<button
					className="font-bold text-white border-2 border-primary bg-primary rounded-lg px-6 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={handleNextQuestion}
					disabled={isLastQuestion}
				>
					{t("next")}
				</button>
			</div>
		</div>
	);
};