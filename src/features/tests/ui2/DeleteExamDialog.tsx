import { ExamCore } from '../model/test.model'

export default function DeleteExamDialog({
	examToDelete,
	onDelete,
	onCancel,
}: {
	examToDelete?: ExamCore | null;
	onDelete: (exam: ExamCore) => void;
	onCancel: () => void;
}) {
	if (!examToDelete) return null;
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-black opacity-50 -z-10" onClick={onCancel}></div>

			<div className="bg-white rounded-lg shadow-lg p-6">
				<h2 className="text-xl font-semibold mb-4">Delete Exam</h2>
				<p>Are you sure you want to delete the exam "{examToDelete.title}"?</p>
				<div className="flex justify-between mt-6">
					<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => onCancel()}>Cancel</button>
					<button className="bg-red-600 text-white px-4 py-2 rounded mr-2" onClick={() => onDelete(examToDelete)}>Delete</button>
				</div>
			</div>
		</div>
	)
}
