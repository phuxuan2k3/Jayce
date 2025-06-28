import { QuestionPersistCoreSchema } from "../../../../../../features/tests/ui-items/question/types";
import { QuestionDefault } from "../../../../../../features/tests/ui-items/question/views/QuestionDefault";

export const QuestionsSection = ({
	questions,
	totalQuestions,
}: {
	questions: QuestionPersistCoreSchema[];
	totalQuestions: number;
}) => {
	return (
		<div className="bg-white rounded-lg shadow-md border border-primary-toned-200 p-6">
			<h2 className="text-xl font-semibold text-primary-toned-700 mb-4">Questions</h2>

			{totalQuestions === 0 ? (
				<div className="text-center py-8 text-gray-500">
					<p>No questions have been added yet.</p>
				</div>
			) : (
				<div className="space-y-6">
					{questions.map((question, index) => (
						<QuestionDefault
							question={question}
							key={index}
							index={index}
						/>
					))}
				</div>
			)}
		</div>
	);
};
