import { ExamDetails } from './components/ExamDetailsCard';
import { ExamStatisticsCard } from './components/ExamStatisticsCard';
import FetchStateCover2 from '../../../../../../../features/tests/ui/fetch-states/FetchStateCover2';
import { useGetTestsByTestIdQuery } from '../../../../../../../features/tests/api/test.api-gen-v2';
import { useLanguage } from '../../../../../../../LanguageProvider';

export default function ExamInformationTab({
	testId,
}: {
	testId: string;
}) {
	const { t } = useLanguage();

	const examQuery = useGetTestsByTestIdQuery({
		testId
	}, {
		pollingInterval: 10000, // Poll every 10 seconds
	});

	return (
		<FetchStateCover2
			fetchState={examQuery}
			dataComponent={(exam) => exam._detail.mode === "EXAM" && (
				<div className="w-full flex flex-col gap-2 p-2">
					<div className="flex flex-col gap-2 mb-2">
						<h2 className="text-2xl font-semibold text-primary">{t("exam_info_title")}</h2>
						<p className="text-sm text-gray-500">
							{t("exam_info_description")}
						</p>
					</div>

					<ExamDetails exam={exam} />

					<hr className="border-primary-toned-300 my-4" />

					<div className="flex flex-col gap-2 mb-2">
						<h2 className="text-2xl font-semibold text-primary">{t("exam_stats_title")}</h2>
						<p className="text-sm text-gray-500">
							{t("exam_stats_description")}
						</p>
					</div>

					<ExamStatisticsCard
						numberOfQuestions={exam._aggregate.numberOfQuestions}
						totalPoints={exam._aggregate.totalPoints}
						totalCandidates={exam._aggregate.totalCandidates}
						totalAttempts={exam._aggregate.totalAttempts}
						highestScore={exam._aggregate.highestScore}
						averageScore={exam._aggregate.averageScore}
						lowestScore={exam._aggregate.lowestScore}
						averageTime={exam._aggregate.averageTime}
					/>
				</div>
			)}
		/>
	);
}