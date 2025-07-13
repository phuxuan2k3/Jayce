import { useDeleteTestModalContext } from './delete-test-modal.context';
import { toast } from 'react-toastify';
import { parseQueryError } from '../../../../../helpers/fetchBaseQuery.error';
import { useDeleteTestsByTestIdMutation } from '../../../../../features/tests/api/test.api-gen-v2';
import useActionStateWatch from '../../../../../features/tests/hooks/useActionStateWatch';
import { useLanguage } from '../../../../../LanguageProvider';

export default function DeleteExamDialog() {
	const { t } = useLanguage();

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
				<h2 className="text-xl font-semibold mb-4">{t("delete_exam_title")}</h2>

				<p>{t("delete_exam_confirm_message")} <span>"{test.title}"</span>?</p>

				<div className="flex justify-between mt-6">
					<button
						className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
						onClick={() => setTest(null)}>
						{t("cancel")}
					</button>
					<button
						className="bg-red-600 text-white px-4 py-2 rounded mr-2"
						onClick={() => {
							deleteTest({ testId: test.id });
						}}>
						{t("delete")}
					</button>
				</div>
			</div>
		</div>
	)
}
