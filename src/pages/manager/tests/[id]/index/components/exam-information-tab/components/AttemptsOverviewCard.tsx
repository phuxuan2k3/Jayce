import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faTrophy, faHourglassHalf, faUsers } from '@fortawesome/free-solid-svg-icons';
import { formatTime } from '../utils';
import MyItemCardTemplate from '../../../../../../../../features/tests/ui-templates/MyItemCardTemplate';
import { useLanguage } from '../../../../../../../../LanguageProvider';

export const AttemptsOverviewCard = ({
	totalAttempts,
	averageScore,
	highestScore,
	lowestScore,
	averageTime,
	totalCandidates,
}: {
	totalAttempts: number;
	averageScore: number;
	highestScore: number;
	lowestScore: number;
	averageTime: number;
	totalCandidates: number;
}) => {
	const { t } = useLanguage();

	return (
		<MyItemCardTemplate
			header={t("attempts_overview_header")}
			icon={<FontAwesomeIcon icon={faChartBar} className="text-primary mr-3" />}
			body={
				<div className="flex flex-col gap-4">
					<div className="flex items-center">
						<FontAwesomeIcon icon={faUsers} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">{t("attempts_overview_total_candidates")}:</p>
							<p className="font-semibold">{totalCandidates}</p>
						</div>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faChartBar} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">{t("attempts_overview_total_attempts")}:</p>
							<p className="font-semibold">{totalAttempts}</p>
						</div>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faTrophy} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">{t("attempts_overview_highest_score")}:</p>
							<p className="font-semibold">{highestScore.toFixed(2)}</p>
						</div>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faChartBar} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">{t("attempts_overview_average_score")}:</p>
							<p className="font-semibold">{averageScore.toFixed(2)}</p>
						</div>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faChartBar} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">{t("attempts_overview_lowest_score")}:</p>
							<p className="font-semibold">{lowestScore.toFixed(2)}</p>
						</div>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faHourglassHalf} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">{t("attempts_overview_average_time")}:</p>
							<p className="font-semibold">{formatTime(averageTime)}</p>
						</div>
					</div>
				</div>
			}
		/>
	);
};