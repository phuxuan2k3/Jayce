import QuestionEditCard from "../question/QuestionPersistCard";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { QuestionPersistOfTest } from "../../../../infra-test/persist/question.persist";

const ExamQuestionsManage = ({
	questions,
	onQuuestionAdd,
	onQuestionUpdate,
	onQuestionDelete,
}: {
	questions: QuestionPersistOfTest[];
	onQuuestionAdd: (question: QuestionPersistOfTest) => void;
	onQuestionUpdate: (index: number, question: Partial<QuestionPersistOfTest>) => void;
	onQuestionDelete: (index: number) => void;
}) => {
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

	return (
		<div className="w-full h-full py-4 flex flex-col items-center justify-center">
			<div className="sticky top-4 w-full">
				<div
					className="flex items-center justify-center gap-2 w-full mb-4 text-primary font-semibold bg-white rounded-lg border border-primary shadow-primary px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200 ease-in-out "
					onClick={() => {
						onQuuestionAdd({
							text: "",
							points: 1,
							options: ["", "", "", ""],
							correctOption: 0,
						});
						setIsAdding(true);
					}}
				>
					<Plus size={20} strokeWidth={2.5} />
					<span>Add Question</span>
				</div>
			</div>

			<hr className="w-full border-t border-primary-toned-300 mb-4" />

			<div className="w-full flex-1 flex flex-col items-center justify-center space-y-4 mb-4 overflow-y-auto">
				{/* Question List */}
				{questions.map((_, index) => (
					<div
						key={index}
						className="w-full"
						ref={index === questions.length - 1 ? lastCard : undefined}
					>
						<QuestionEditCard
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

		</div>
	);
}

export default ExamQuestionsManage;