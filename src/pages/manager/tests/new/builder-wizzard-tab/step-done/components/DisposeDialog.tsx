import MyButton from '../../../../../../../features/tests/ui/buttons/MyButton';
import MyDialog from '../../../../../../../features/tests/ui/MyDialog';


export default function DisposeDialog({
	onCancel,
	onConfirm,
}: {
	onConfirm: () => void;
	onCancel: () => void;
}) {
	return (
		<MyDialog>
			<MyDialog.Content>
				<h2 className="text-xl font-bold text-primary-toned-800 mb-2">Dispose Questions</h2>
				<p className="text-gray-600 text-sm">
					Are you sure you want to dispose of the generated questions? This action cannot be undone.
					You will lose all the questions you generated in this session.
				</p>

				<div className="flex space-x-3 pt-4 border-t border-gray-200 justify-between">
					<MyButton
						onClick={onCancel}
						variant={"gray"}
					>
						Cancel
					</MyButton>
					<MyButton
						onClick={onConfirm}
						variant={"destructive"}
					>
						Confirm
					</MyButton>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}
