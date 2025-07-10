import { AlertTriangle } from 'lucide-react';
import MyDialog from '../../../../../../features/tests/ui/MyDialog';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';

export default function EditExamDialog({
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
				<div className="flex items-center justify-center w-16 h-16 bg-secondary-toned-100 rounded-full mb-6">
					<AlertTriangle className="w-8 h-8 text-secondary" />
				</div>

				{/* Title */}
				<h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
					Edit Exam Confirmation
				</h2>

				<p className='text-gray-600 text-center mb-6 leading-relaxed'>
					You are about to edit the exam. Please ensure all details are correct before proceeding.
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
						variant={"primary"}
						loading={isLoading}
					>
						{isLoading ? "Saving..." : "Save Changes"}
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}

