import { useMemo, useState } from 'react';
import {
	PublishFooter,
	StatCard
} from './components';
import { calculateExamStats, formatDateDisplay } from './utils';
import { ExamPersistCoreSchema } from '../../../../../features/tests/ui-items/test/types';
import { cn } from '../../../../../app/cn';
import { QuestionDefault } from '../../../../../features/tests/ui-items/question/views/QuestionDefault';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PublishTab({
	examPersist,
	onPublish
}: {
	examPersist: ExamPersistCoreSchema;
	onPublish: () => void;
}) {
	const [index, setIndex] = useState(0);
	const { questions, ...config } = examPersist;
	const examStats = useMemo(() => {
		const stats = calculateExamStats(questions);
		return {
			...stats,
			duration: config.minutesToAnswer * 60,
		};
	}, [questions, config.minutesToAnswer]);

	return (
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

				<div className="flex gap-2 flex-1 items-center justify-between min-h-[400px]">
					<button
						className='bg-primary rounded-full p-2 text-white hover:bg-primary-toned-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
						disabled={index === 0}
						onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
						aria-label="Previous Question"
					>
						<ArrowLeft />
					</button>
					<div className='flex-1'>
						{questions.length === 0 ? (
							<div className="text-center py-8 text-gray-500">
								<p>No questions have been added yet.</p>
							</div>
						) : (
							<div className="space-y-6">
								<QuestionDefault
									question={questions[index]}
									key={index}
									index={index}
								/>
							</div>
						)}
					</div>
					<button
						className='bg-primary rounded-full p-2 text-white hover:bg-primary-toned-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
						disabled={index === questions.length - 1}
						onClick={() => setIndex((prev) => Math.min(prev + 1, questions.length - 1))}
						aria-label="Next Question"
					>
						<ArrowRight />
					</button>
				</div>
			</div>

			<PublishFooter onPublish={onPublish} />
		</div>
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