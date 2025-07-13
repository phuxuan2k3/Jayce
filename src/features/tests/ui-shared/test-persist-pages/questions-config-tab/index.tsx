import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import QuestionPersistCard from "../../../ui-items/question/form/QuestionPersist";
import { QuestionPersistCoreSchema } from "../../../ui-items/question/types";
import { QuestionPersistZodSchema } from "../../../schemas/question-persist-zod";
import { toast } from "react-toastify";
import { useLanguage } from "../../../../../LanguageProvider";

const QuestionsConfigTab = ({
	questions,
	onQuuestionAdd,
	onQuestionUpdate,
	onQuestionDelete,
}: {
	questions: QuestionPersistCoreSchema[];
	onQuuestionAdd: (question: QuestionPersistCoreSchema) => void;
	onQuestionUpdate: (index: number, question: Partial<QuestionPersistCoreSchema>) => void;
	onQuestionDelete: (index: number) => void;
}) => {
	const { t } = useLanguage();

	const [errors, setErrors] = useState<{
		index: number;
		messages: string[];
	}[]>([]);
	const lastCard = useRef<HTMLDivElement>(null);
	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		if (questions.length > 0 && lastCard.current && isAdding) {
			lastCard.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "nearest",
			});
			setIsAdding(false);
		}
	}, [questions.length, lastCard.current]);

	const handleAddQuestion = () => {
		let isAllValid = true;
		const parsedQuestions = questions.map((q) => QuestionPersistZodSchema.safeParse(q));

		setErrors(parsedQuestions.map((q, index) => {
			if (!q.success) {
				isAllValid = false;
				return {
					index,
					messages: q.error.errors.map((err) => err.message),
				};
			}
			return "";
		}).filter((err) => err !== ""));
		if (!isAllValid) {
			toast.warn(t("question_tab_fix_errors_before_adding"));
			return;
		}
		onQuuestionAdd({
			text: "",
			points: 1,
			type: "MCQ",
			detail: {
				type: "MCQ",
				options: ["", "", "", ""],
				correctOption: 0,
			}
		});
		setIsAdding(true);
	}

	return (
		<div className="w-full h-full py-4 px-2 flex flex-col items-center justify-center">
			<div className="w-full flex-1 flex flex-col gap-4 items-center justify-start">
				{/* Question List */}
				{questions.map((_, index) => (
					<div
						key={index}
						className="w-full"
						ref={index === questions.length - 1 ? lastCard : undefined}
					>
						<QuestionPersistCard
							index={index}
							question={questions[index]}
							onQuestionChange={(question) => {
								onQuestionUpdate(index, question);
							}}
							onDeleteQuestion={() => {
								onQuestionDelete(index);
							}}
						/>
					</div>
				))}
			</div>

			<hr className="w-full border-t border-primary-toned-300 my-4" />

			<div className="w-full flex flex-col">
				{errors.length > 0 && (
					<div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 m-2 shadow-md flex gap-2 items-center">
						<div className="flex-1">
							<ul className="list-disc text-sm list-inside pl-2">
								{errors.map((error) => error.messages.map(errorMessage => (
									<li key={error.index}>{`Question ${error.index + 1}:`} {errorMessage}</li>
								)))}
							</ul>
						</div>
						<button
							className="group relative flex items-center justify-center p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
							title={t("dismiss_all_errors")}
							onClick={() => setErrors([])}
						>
							<span className="sr-only">{t("dismiss")}</span>
							<div className="flex items-center justify-center bg-red-100 group-hover:bg-red-200 text-red-600 rounded-full w-7 h-7 shadow-md transition-colors duration-200">
								<X size={20} />
							</div>
						</button>
					</div>
				)}

				<div
					className="flex items-center justify-center gap-2 w-full text-primary font-semibold bg-white rounded-lg border border-primary shadow-primary px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200 ease-in-out"
					onClick={() => handleAddQuestion()}
				>
					<Plus size={20} strokeWidth={2.5} />
					<span>{t("add_question")}</span>
				</div>
			</div>
		</div>
	);
}

export default QuestionsConfigTab;