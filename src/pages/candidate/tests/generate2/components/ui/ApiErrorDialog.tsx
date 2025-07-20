import MyDialog from "../../../../../../features/tests/ui/MyDialog";
import { useLanguage } from "../../../../../../LanguageProvider";

export default function ApiErrorDialog({
	error,
	onClose,
	onRetry,
	isOpen,
}: {
	error: string | null;
	onClose: () => void;
	onRetry: () => void;
	isOpen: boolean;
}) {
	const { t } = useLanguage();

	if (!isOpen) return null;
	return (
		<MyDialog>
			<div className="bg-white rounded-lg shadow-lg p-6">
				<h2 className="text-lg font-semibold text-red-600">{t("api_error_title")}</h2>
				<p className="mt-2 text-gray-700">{error}</p>
				<div className="mt-4 flex justify-end">
					<button
						className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
						onClick={onClose}
					>
						{t("api_error_close")}
					</button>
					<button
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						onClick={onRetry}
					>
						{t("api_error_retry")}
					</button>
				</div>
			</div>
		</MyDialog>
	);
} 
