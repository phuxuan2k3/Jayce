import { useMemo } from 'react';
import {
	ExamHeader,
	ExamSummary,
	ExamConfiguration,
	QuestionsSection,
	PublishFooter
} from './components';
import { calculateExamStats } from './utils';
import { ExamPersistCoreSchema } from '../../../../../features/tests/ui-items/test/types';

export default function PublishTab({
	examPersist,
	onPublish
}: {
	examPersist: ExamPersistCoreSchema;
	onPublish: () => void;
}) {
	const { questions, ...config } = examPersist;
	const examStats = useMemo(() => {
		const stats = calculateExamStats(questions);
		return {
			...stats,
			duration: config.minutesToAnswer * 60,
		};
	}, [questions, config.minutesToAnswer]);

	return (
		<div className="w-full h-full py-6 px-4 bg-gray-50 overflow-y-auto">
			<div className="max-w-4xl mx-auto space-y-6">
				<ExamHeader
					title={config.title}
					description={config.description}
				/>

				<ExamSummary stats={examStats} />

				<ExamConfiguration config={config} />

				<QuestionsSection
					questions={questions}
					totalQuestions={examStats.totalQuestions}
				/>

				<PublishFooter
					totalQuestions={examStats.totalQuestions}
					onPublish={onPublish}
				/>
			</div>
		</div>
	);
}
