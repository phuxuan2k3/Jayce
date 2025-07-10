import { AlertTriangle, Settings, FileX } from 'lucide-react';
import MyDialog from '../../../../../../features/tests/ui/MyDialog';
import MyButton from '../../../../../../features/tests/ui/buttons/MyButton';

export default function WarningDialog({
	onCancel,
	onConfirm,
}: {
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
					Publishing Confirmation
				</h2>

				{/* Warning Message */}
				<p className="text-gray-600 text-center mb-6 leading-relaxed">
					You are about to publish the exam. Please ensure all details are correct before proceeding.
				</p>

				{/* Restrictions List */}
				<div className="w-full bg-secondary-toned-50 rounded-lg p-4 mb-6">
					<h3 className="font-semibold text-secondary-toned-700 mb-3 flex items-center">
						After publishing, you will not be able to:
					</h3>
					<ul className="space-y-2 text-secondary-toned-700">
						<li className="flex items-start">
							<FileX className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
							<span>Make changes to questions</span>
						</li>
						<li className="flex items-start">
							<FileX className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
							<span>Modify exam's room ID</span>
						</li>
						<li className="flex items-start">
							<Settings className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
							<span>Some configurations are limited to changes</span>
						</li>
					</ul>
				</div>

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
					>
						Publish
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}

