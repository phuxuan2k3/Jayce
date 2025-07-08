import MyButton from "../../../../../../../../features/tests/ui/buttons/MyButton";
import MyDialog from "../../../../../../../../features/tests/ui/MyDialog";

export default function ConfirmScoringDialog({
	onCancel,
	onConfirm,
	isLoading,
}: {
	onCancel: () => void;
	onConfirm: () => void;
	isLoading: boolean;
}) {
	return (
		<MyDialog>
			<MyDialog.Content>
				<div className="flex flex-col gap-4">
					<h2 className="text-lg font-semibold">Confirm Scoring</h2>
					<p>
						Are you sure you want to confirm the scoring for this attempt? This action cannot be undone.
					</p>
					<div className="flex justify-end gap-2">
						<MyButton
							variant={"gray"}
							onClick={onCancel}
						>
							Cancel
						</MyButton>
						<MyButton
							variant="primary"
							onClick={onConfirm}
						>
							{isLoading ? "Scoring..." : "Confirm Scoring"}
						</MyButton>
					</div>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}
