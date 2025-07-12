import { TriangleAlert } from 'lucide-react';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';
import MyDialog from '../../../../../../features/tests/ui/MyDialog'

export default function InvalidDialog({ message, onClose }: {
	message: string;
	onClose: () => void;
}) {
	return (
		<MyDialog>
			<MyDialog.Content>
				<div className="flex flex-col gap-4">
					<div className='flex items-cente gap-2 text-red-500'>
						<TriangleAlert size={24} />
						<h2 className="text-lg font-semibold">Invalid Action</h2>
					</div>
					<p className='text-gray-600'>{message}</p>
					<div className="flex justify-end">
						<MyButton
							onClick={onClose}
						>
							Close
						</MyButton>
					</div>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}

