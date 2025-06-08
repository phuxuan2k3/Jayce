import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useDeleteExamsByTestIdMutation } from '../../../features/tests/api/test.api-gen';
import deleteExamSlice from '../../stores/deleteExamSlice';
import useFetchStateDialog from '../../hooks/useFetchStateDialog';

export default function DeleteExamDialog() {
	const examCore = useAppSelector((state) => state.deleteExam.exam);
	const dispatch = useAppDispatch();

	const [deleteExam, state] = useDeleteExamsByTestIdMutation();

	const handleSuccess = useCallback(() => {
		dispatch(deleteExamSlice.actions.setDeleteExam(null));
	}, []);

	const handleDeleteConfirm = useCallback(() => {
		if (examCore) {
			deleteExam({ testId: examCore.id });
		}
	}, [examCore]);

	useFetchStateDialog({
		...state,
		onRetry: handleDeleteConfirm,
		onSuccess: handleSuccess,
	})

	const handleCancel = () => {
		dispatch(deleteExamSlice.actions.setDeleteExam(null));
	};

	if (!examCore) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="absolute inset-0 bg-black opacity-50 -z-10" onClick={handleCancel}></div>

			<div className="bg-white rounded-lg shadow-lg p-6">
				<h2 className="text-xl font-semibold mb-4">Delete Exam</h2>
				<p>Are you sure you want to delete the exam "{examCore.title}"?</p>
				<div className="flex justify-between mt-6">
					<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={handleCancel}>Cancel</button>
					<button className="bg-red-600 text-white px-4 py-2 rounded mr-2" onClick={handleDeleteConfirm}>Delete</button>
				</div>
			</div>
		</div>
	)
}
