import { useDeleteTestModalContext } from './delete-test-modal.context';
import { toast } from 'react-toastify';
import { parseQueryError } from '../../../../../helpers/fetchBaseQuery.error';
import { useDeleteTestsByTestIdMutation } from '../../../../../features/tests/api/test.api-gen-v2';
import useActionStateWatch from '../../../../../features/tests/hooks/useActionStateWatch';

export default function DeleteExamDialog() {
	const { test, setTest } = useDeleteTestModalContext();
	const [deleteTest, deleteState] = useDeleteTestsByTestIdMutation();
	useActionStateWatch(deleteState, {
		onSuccess: () => {
			toast.success("Exam deleted successfully");
			setTest(null);
		},
		onError: (error) => {
			toast.error(`Failed to delete exam: ${parseQueryError(error)}`);
		},
	})

	if (test == null) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-black opacity-50 -z-10" onClick={() => setTest(null)}></div>

			<div className="bg-white rounded-lg shadow-lg p-6">
				<h2 className="text-xl font-semibold mb-4">Delete Exam</h2>

				<p>Are you sure you want to delete the exam <span>"{test.title}"</span>?</p>

				<div className="flex justify-between mt-6">
					<button
						className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
						onClick={() => setTest(null)}>
						Cancel
					</button>
					<button
						className="bg-red-600 text-white px-4 py-2 rounded mr-2"
						onClick={() => {
							deleteTest({ testId: test.id });
						}}>
						Delete
					</button>
				</div>
			</div>
		</div>
	)
}
