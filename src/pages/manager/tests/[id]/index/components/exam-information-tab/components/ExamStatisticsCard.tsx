import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faQuestionCircle,
	faBullseye,
	faUsers,
	faRepeat,
	faTrophy,
	faChartLine,
	faHourglassHalf,
	faChartBar
} from '@fortawesome/free-solid-svg-icons';
import { formatTime } from '../utils';
import MyItemCardTemplate from '../../../../../../../../features/tests/ui-templates/MyItemCardTemplate';
import { useLanguage } from '../../../../../../../../LanguageProvider';

interface StatItemProps {
	icon: any;
	label: string;
	value: string | number;
	isPercentage?: boolean;
}

const StatItem = ({ icon, label, value, isPercentage = false }: StatItemProps) => (
	<div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
		<FontAwesomeIcon icon={icon} className="text-primary-toned-500 w-4 flex-shrink-0 mx-2" />
		<div className="flex-1">
			<p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
			<p className="font-semibold text-lg">
				{typeof value === 'number' && isPercentage ? `${value.toFixed(1)}%` : value}
			</p>
		</div>
	</div>
);

export const ExamStatisticsCard = ({
	numberOfQuestions,
	totalPoints,
	totalCandidates,
	totalAttempts,
	highestScore,
	averageScore,
	lowestScore,
	averageTime,
}: {
	numberOfQuestions: number;
	totalPoints: number;
	totalCandidates: number;
	totalAttempts: number;
	highestScore: number;
	averageScore: number;
	lowestScore: number;
	averageTime: number;
}) => {
	const { t } = useLanguage();

	const averageAttemptsPerCandidate = totalCandidates > 0 ? (totalAttempts / totalCandidates).toFixed(1) : '0';

	return (
		<MyItemCardTemplate
			header={t("exam_statistics_title")}
			icon={<FontAwesomeIcon icon={faChartBar} className="text-primary mr-3" />}
			body={
				<div className="space-y-6 p-2">
					{/* Content Statistics */}
					<div>
						<h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
							<FontAwesomeIcon icon={faQuestionCircle} className="w-4 text-primary" />
							{t("exam_statistics_content_title")}
						</h4>
						<div className="grid grid-cols-2 gap-3">
							<StatItem
								icon={faQuestionCircle}
								label={t("exam_statistics_questions")}
								value={numberOfQuestions}
							/>
							<StatItem
								icon={faBullseye}
								label={t("exam_statistics_total_points")}
								value={totalPoints}
							/>
						</div>
					</div>

					{/* Participation Statistics */}
					<div>
						<h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
							<FontAwesomeIcon icon={faUsers} className="w-4 text-primary" />
							{t("exam_statistics_participation_title")}
						</h4>
						<div className="grid grid-cols-3 gap-3">
							<StatItem
								icon={faUsers}
								label={t("exam_statistics_candidates")}
								value={totalCandidates}
							/>
							<StatItem
								icon={faRepeat}
								label={t("exam_statistics_total_attempts")}
								value={totalAttempts}
							/>
							<StatItem
								icon={faChartLine}
								label={t("exam_statistics_avg_attempts_per_candidate")}
								value={averageAttemptsPerCandidate}
							/>
						</div>
					</div>

					{/* Performance Statistics */}
					<div>
						<h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
							<FontAwesomeIcon icon={faTrophy} className="w-4 text-primary" />
							{t("exam_statistics_performance_title")}
						</h4>
						<div className="grid grid-cols-2 gap-3">
							<div className="col-span-2">
								<StatItem
									icon={faChartLine}
									label={t("exam_statistics_avg_score")}
									value={averageScore}
									isPercentage={false}
								/>
							</div>
							<StatItem
								icon={faTrophy}
								label={t("exam_statistics_highest_score")}
								value={highestScore}
								isPercentage={false}
							/>
							<StatItem
								icon={faChartBar}
								label={t("exam_statistics_lowest_score")}
								value={lowestScore}
								isPercentage={false}
							/>
							<div className="col-span-2">
								<StatItem
									icon={faHourglassHalf}
									label={t("exam_statistics_avg_time")}
									value={formatTime(averageTime)}
								/>
							</div>
						</div>
					</div>
				</div>
			}
		/>
	);
};
