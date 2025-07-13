import MyButton from "../../../../../../../../features/tests/ui/buttons/MyButton";
import MyDialog from "../../../../../../../../features/tests/ui/MyDialog";
import { useLanguage } from "../../../../../../../../LanguageProvider";

export default function ConfirmScoringDialog({
	onCancel,
	onConfirm,
	isLoading,
}: {
	onCancel: () => void;
	onConfirm: () => void;
	isLoading: boolean;
}) {
	const { t } = useLanguage();

	return (
		<MyDialog>
			<MyDialog.Content>
				<div className="flex flex-col gap-4">
					<h2 className="text-lg font-semibold">{t("confirm_scoring_title")}</h2>
					<p>
						{t("confirm_scoring_description")}
					</p>
					<div className="flex justify-end gap-2">
						<MyButton
							variant={"gray"}
							onClick={onCancel}
						>
							{t("cancel")}
						</MyButton>
						<MyButton
							variant="primary"
							onClick={onConfirm}
						>
							{isLoading ? t("scoring") : t("confirm_scoring")}
						</MyButton>
					</div>
				</div>
			</MyDialog.Content>
		</MyDialog>
	)
}
