import { AlertTriangle } from 'lucide-react';
import MyDialog from '../../../../../../features/tests/ui/MyDialog';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';

export default function DeleteExamDialog({
	isLoading,
	onCancel,
	onConfirm,
}: {
	isLoading: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}) {
	return (
		<MyDialog>
			<MyDialog.Content className='flex flex-col items-center'>
				<div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
					<AlertTriangle className="w-8 h-8 text-red-500" />
				</div>

				{/* Title */}
				<h2 className="text-2xl font-bold text-red-700 mb-4 text-center">
					Delete Exam Confirmation
				</h2>
				<p className='text-gray-600 text-center mb-6 leading-relaxed'>
					Please confirm that you want to delete this exam. All associated data will be permanently removed.
				</p>
				<p className='font-semibold text-red-600 text-center mb-6 leading-relaxed'>
					This action cannot be undone
				</p>

				<div className='flex justify-between w-full mt-4'>
					<MyButton
						onClick={onCancel}
						variant={"gray"}
					>
						Cancel
					</MyButton>
					<MyButton
						onClick={onConfirm}
						variant={"destructive"}
						loading={isLoading}
					>
						{isLoading ? "Deleting..." : "Delete Exam"}
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}

