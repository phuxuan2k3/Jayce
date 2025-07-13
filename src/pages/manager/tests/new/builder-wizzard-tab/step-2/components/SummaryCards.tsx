import { useLanguage } from "../../../../../../../LanguageProvider";

interface SummaryCardsProps {
	totalTopics: number;
	totalQuestions: number;
}

export default function SummaryCards({ totalTopics, totalQuestions }: SummaryCardsProps) {
	const { t } = useLanguage();
	
	return (
		<div className="grid grid-cols-2 gap-4 mb-6">
			<div className="bg-primary-toned-50 border border-primary-toned-200 rounded-lg p-4">
				<h3 className="text-sm font-semibold text-gray-500 mb-1">{t("summary_cards_total_topics")}</h3>
				<p className="text-2xl font-bold text-primary-toned-700">{totalTopics}</p>
			</div>
			<div className="bg-primary-toned-50 border border-primary-toned-200 rounded-lg p-4">
				<h3 className="text-sm font-semibold text-gray-500 mb-1">{t("summary_cards_total_questions")}</h3>
				<p className="text-2xl font-bold text-primary-toned-700">{totalQuestions}</p>
			</div>
		</div>
	);
}
