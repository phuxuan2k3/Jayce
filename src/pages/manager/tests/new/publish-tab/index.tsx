import { useCallback, useEffect, useMemo, useState } from 'react';
import { calculateExamStats, formatDateDisplay } from './utils';
import { ExamPersistCoreSchema } from '../../../../../features/tests/ui-items/test/types';
import { cn } from '../../../../../app/cn';
import { usePostTestsMutation } from '../../../../../features/tests/api/test.api-gen-v2';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../router/paths';
import ErrorDialog from '../../../../../features/tests/ui/fetch-states/ErrorDialog';
import QuestionCarousel from './components/QuestionCarousel';
import WarningDialog from './components/WarningDialog';
import { PublishFooter } from './components/PublishFooter';
import { StatCard } from './components/StatCard';
import { useLanguage } from '../../../../../LanguageProvider';

export default function PublishTab({
	examPersist,
}: {
	examPersist: ExamPersistCoreSchema;
}) {
	const { t } = useLanguage();

	const navigate = useNavigate();
	const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

	const { questions, ...config } = examPersist;
	const examStats = useMemo(() => {
		const stats = calculateExamStats(questions);
		return {
			...stats,
			duration: config.minutesToAnswer,
		};
	}, [questions, config.minutesToAnswer]);

	const [createTest, createTestState] = usePostTestsMutation();
	useEffect(() => {
		if (createTestState.isSuccess) {
			const { testId } = createTestState.data;
			navigate(paths.manager.tests.in(testId).ROOT);
		}
	}, [createTestState.isSuccess, createTestState.data, navigate]);

	const handlePublish = useCallback(() => {
		setShowConfirmationDialog(false);
		createTest({ body: examPersist });
	}, [createTest, examPersist]);

	return (
		<>
			<div className="w-full h-full flex flex-col gap-4 p-4">
				<div className='space-y-2'>
					<h1 className="text-2xl font-bold text-primary">
						{config.title}
					</h1>
					<p className="text-gray-700">
						{config.description}
					</p>
				</div>

				<hr className="border-primary-toned-300 my-2" />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<InfoItem label={t("publish_label_language")} value={config.language} />
					<InfoItem label={t("publish_label_duration")} value={`${config.minutesToAnswer} ${t("publish_label_duration_unit")}`} />
					<InfoItem label={t("publish_label_room_id")} value={config.detail.roomId} />
					<InfoItem label={t("publish_label_password")} value={<NullableSpan value={config.detail.password} />} />
					<InfoItem label={t("publish_label_attempts_allowed")} value={<NullableSpan value={config.detail.numberOfAttemptsAllowed} />} />
					<InfoItem label={t("publish_label_number_of_participants")} value={<NullableSpan value={config.detail.numberOfParticipants} />} />
					<InfoItem label={t("publish_label_publicly_visible")} value={config.detail.isPublic ? t("publish_label_publicly_visible_yes") : t("publish_label_publicly_visible_no")} />
					<InfoItem label={t("publish_label_show_others_results")} value={config.detail.isAllowedToSeeOtherResults ? t("publish_label_show_enabled") : t("publish_label_show_disabled")} />
					<InfoItem label={t("publish_label_show_exam_answer")} value={config.detail.isAnswerVisible ? t("publish_label_show_enabled") : t("publish_label_show_disabled")} />

				</div>

				<hr className="md:col-span-2 border-primary-toned-300 my-2" />

				<div className="md:col-span-2 space-y-3">
					<h3 className="text-2xl font-semibold text-primary">{t("publish_title_schedule")}</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-primary-toned-50 rounded-lg p-4 font-semibold text-pretty text-primary">
							<div className="font-normal text-primary-toned-600 mb-1">{t("publish_label_opens_at")}:</div>
							<div className="text-gray-800">{formatDateDisplay(new Date(config.detail.openDate))}</div>
						</div>
						<div className="bg-primary-toned-50 rounded-lg p-4 font-semibold text-pretty text-primary">
							<div className="font-normal text-primary-toned-600 mb-1">{t("publish_label_closes_at")}:</div>
							<div className="text-gray-800">{formatDateDisplay(new Date(config.detail.closeDate))}</div>
						</div>
					</div>
				</div>

				<hr className="md:col-span-2 border-primary-toned-300 my-2" />


				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-semibold text-primary">{t("publish_title_questions")}</h2>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<StatCard value={examStats.totalQuestions} label={t("publish_label_stat_questions")} />
						<StatCard value={examStats.totalPoints} label={t("publish_label_stat_total_points")} />
						<StatCard value={examStats.averagePoints} label={t("publish_label_stat_avg_points")} />
						<StatCard value={examStats.duration} label={t("publish_label_stat_minutes")} />
					</div>

					<QuestionCarousel questions={questions} />
				</div>

				<PublishFooter
					isLoading={createTestState.isLoading}
					onPublish={() => setShowConfirmationDialog(true)}
				/>
			</div>

			{showConfirmationDialog && (
				<WarningDialog
					onConfirm={handlePublish}
					onCancel={() => setShowConfirmationDialog(false)}
				/>
			)}

			{createTestState.error && <ErrorDialog error={createTestState.error} />}
		</>

	);
}


const InfoItem = ({
	label,
	value,
}: {
	label: string;
	value: string | React.ReactNode;
}) => {
	return (
		<div className="flex flex-col gap-0.5">
			<span className="text-lg font-bold text-gray-600">{label}:</span>
			<span className="text-gray-500">{value}</span>
		</div>
	)
}

const NullableSpan = ({
	value,
	nullableText = "None",
	className,
}: {
	value: string | number | React.ReactNode | null | undefined;
	nullableText?: string;
	className?: string;
}) => {
	return (
		<span className={cn(className, value == null && "italic")}>
			{value ?? nullableText}
		</span>
	);
}
