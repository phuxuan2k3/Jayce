import { Check, ChevronRight } from "lucide-react";
import { useLanguage } from "../../../../../../../LanguageProvider";

interface ConfirmationSectionProps {
	totalQuestions: number;
	topicsCount: number;
	onConfirm: () => void;
}

export default function ConfirmationSection({ totalQuestions, topicsCount, onConfirm }: ConfirmationSectionProps) {
	const { t } = useLanguage();

	return (
		<div className="bg-gradient-to-r from-primary-toned-50 to-secondary-toned-50 border-2 border-primary-toned-200 rounded-lg p-8 text-center">
			<div className="flex items-center justify-center gap-3 mb-4">
				<div className="p-3 bg-primary text-white rounded-full">
					<Check className="w-6 h-6" />
				</div>
				<h3 className="text-2xl font-bold text-gray-800">{t("confirmation_ready_title")}</h3>
			</div>

			<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
				{t("confirmation_ready_description").replace("{{total}}", totalQuestions.toString()).replace("{{topics}}", topicsCount.toString())}
			</p>

			<button
				onClick={onConfirm}
				className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary 
						 text-white px-8 py-4 rounded-lg font-semibold text-lg
						 hover:from-primary-toned-600 hover:to-secondary-toned-600 
						 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
			>
				<span>{t("confirmation_generate_button")}</span>
				<ChevronRight className="w-5 h-5" />
			</button>
		</div>
	);
}
