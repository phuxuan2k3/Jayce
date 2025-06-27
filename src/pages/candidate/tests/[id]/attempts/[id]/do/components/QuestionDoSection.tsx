import { Trash2 } from "lucide-react";
import { QuestionDoState } from "../types";
import useActionStateWatch from "../../../../../../../../infra-test/hooks/useActionStateWatch";
import { usePostAttemptsByAttemptIdAnswersMutation } from "../apis/answer";
import { toast } from "react-toastify";
import { parseQueryError } from "../../../../../../../../helpers/fetchBaseQuery.error";
import { QuestionDo } from "../../../../../../../../infra-test/ui-items/question/views/QuestionDo";
import { AnswerForQuestionTypeSchema } from "../../../../../../../../infra-test/api/test.api-gen-v2";
import useGetAttemptIdParams from "../../../../../../../../infra-test/hooks/useGetAttemptIdParams";

export default function QuestionDoSection({
	totalQuestion,
	questionDoState,
	currentQuestionIndex,
	onQuestionIndexChange,
	onQuestionFlagChanged,
}: {
	totalQuestion: number;
	questionDoState: QuestionDoState;
	currentQuestionIndex: number;
	onQuestionIndexChange: (index: number) => void;
	onQuestionFlagChanged: (isFlagged: boolean) => void;
}) {
	const attemptId = useGetAttemptIdParams();
	const { question } = questionDoState;
	const [postAnswers, postAnswersState] = usePostAttemptsByAttemptIdAnswersMutation();
	useActionStateWatch(postAnswersState, {
		onError: (error) => {
			const errorMessage = parseQueryError(error);
			console.error("Failed to submit answer:", error);
			toast.error(`Failed to submit answer: ${errorMessage}`);
		},
	});

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
		postAnswers({
			attemptId,
			body: {
				questionId: question.id,
				answer,
			}
		});
	};

	return (
		<div className="w-full flex flex-col justify-between">

			<QuestionDo
				question={question}
				doAnswer={questionDoState.answer || undefined}
				setDoAnswer={(answer) => handleAnswerQuestion(answer)}
				index={questionDoState.index}
				isFlagged={questionDoState.isFlagged}
				setIsFlagged={(isFlagged) => onQuestionFlagChanged(isFlagged)}
			/>

			<hr className="mt-8 mb-4 border-primary-toned-700/50" />

			<div className="flex flex-row justify-between items-center">
				<button
					className="font-bold text-primary border-2 border-primary bg-white rounded-lg px-6 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={handlePreviousQuestion}
					disabled={isFirstQuestion}
				>
					Previous
				</button>
				<button
					className="flex-shrink flex items-center gap-1 text-secondary-toned-500 font-semibold bg-secondary-toned-100 rounded-full px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={questionDoState.answer == null}
					onClick={() => handleAnswerQuestion(undefined)}
				>
					<Trash2 size={18} strokeWidth={2.5} />
					<span className="text-sm">Clear Answer</span>
				</button>
				<button
					className="font-bold text-white border-2 border-primary bg-primary rounded-lg px-6 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={handleNextQuestion}
					disabled={isLastQuestion}
				>
					Next
				</button>
			</div>
		</div>
	);
};