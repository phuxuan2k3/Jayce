import { useLanguage } from "../../../../../LanguageProvider";
import { CandidateCoreSchema } from "../../../api/test.api-gen-v2";

export default function ParticipantStatisticCard({
	participant,
}: {
	participant: CandidateCoreSchema;
}) {
	const { t } = useLanguage();

	const agg = participant._aggregate;
	return (
		<div className='rounded-lg px-6 py-8 bg-primary-toned-50 shadow-md max-h-full overflow-y-auto'>
			<h3 className="text-xl font-semibold mb-3">{t("statistic")}</h3>
			<hr className="mb-4" />
			<div className='grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-primary-toned-600 
			[&>*:nth-child(odd)]:font-bold 
			[&>*:nth-child(odd)]:text-primary-toned-700
			[&>*:nth-child(even)]:text-right
			'>
				<span>{t("rank")}:</span>
				<span>{agg.rank}</span>

				<span>{t("total_attempts")}:</span>
				<span>{agg.totalAttempts}</span>

				<span>{t("highest_score")}:</span>
				<span>{agg.highestScore}</span>

				<span>{t("lowest_score")}:</span>
				<span>{agg.lowestScore}</span>

				<span>{t("average_score")}:</span>
				<span>{agg.averageScore}</span>

				<span>{t("average_time")}:</span>
				<span>{formatSeconds(agg.averageTime)}</span>
			</div>
		</div>
	)
}

const formatSeconds = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = Math.round(seconds % 60) || 1;
	if (hours > 0) {
		return `${hours}h ${minutes}m ${secs}s`;
	}
	if (minutes > 0) {
		return `${minutes}m ${secs}s`;
	}
	return `${secs}s`;
}