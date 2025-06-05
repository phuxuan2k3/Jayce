import {
	ExamHeader,
	ExamSummary,
	ExamConfiguration,
	QuestionsSection,
	PublishFooter
} from './components';
import { useExamStats } from './hooks/useExamStats';
import { PublishTabProps } from './types';

export default function PublishTab({ examPersistState, onPublish }: PublishTabProps) {
	const { config, questions } = examPersistState;
	const examStats = useExamStats(questions.questions, config.minutesToAnswer);

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
					questions={questions.questions}
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
