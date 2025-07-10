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

export default function PublishTab({
	examPersist,
}: {
	examPersist: ExamPersistCoreSchema;
}) {
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
					<InfoItem label="Language" value={config.language} />
					<InfoItem label="Duration" value={`${config.minutesToAnswer} minutes`} />
					<InfoItem label="Room ID" value={config.detail.roomId} />
					<InfoItem label="Password" value={<NullableSpan value={config.detail.password} />} />
					<InfoItem label="Attempts Allowed" value={<NullableSpan value={config.detail.numberOfAttemptsAllowed} />} />
					<InfoItem label="Number of participants" value={<NullableSpan value={config.detail.numberOfParticipants} />} />
					<InfoItem label='Publicly Visible' value={config.detail.isPublic ? "Yes" : "No"} />
					<InfoItem label={`Show others's results`} value={config.detail.isAllowedToSeeOtherResults ? "Enabled" : "Disabled"} />
					<InfoItem label={`Show exam's answer`} value={config.detail.isAnswerVisible ? "Enabled" : "Disabled"} />

				</div>

				<hr className="md:col-span-2 border-primary-toned-300 my-2" />

				<div className="md:col-span-2 space-y-3">
					<h3 className="text-2xl font-semibold text-primary">Schedule</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="bg-primary-toned-50 rounded-lg p-4 font-semibold text-pretty text-primary">
							<div className="font-normal text-primary-toned-600 mb-1">Opens At:</div>
							<div className="text-gray-800">{formatDateDisplay(new Date(config.detail.openDate))}</div>
						</div>
						<div className="bg-primary-toned-50 rounded-lg p-4 font-semibold text-pretty text-primary">
							<div className="font-normal text-primary-toned-600 mb-1">Closes At:</div>
							<div className="text-gray-800">{formatDateDisplay(new Date(config.detail.closeDate))}</div>
						</div>
					</div>
				</div>

				<hr className="md:col-span-2 border-primary-toned-300 my-2" />


				<div className="flex flex-col gap-4">
					<h2 className="text-2xl font-semibold text-primary">Questions</h2>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<StatCard value={examStats.totalQuestions} label="Questions" />
						<StatCard value={examStats.totalPoints} label="Total Points" />
						<StatCard value={examStats.averagePoints} label="Avg Points/Question" />
						<StatCard value={examStats.duration} label="Minutes" />
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
