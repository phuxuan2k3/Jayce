import { StatCard } from './StatCard';
import { ExamStats } from '../types';

interface ExamSummaryProps {
	stats: ExamStats;
}

export const ExamSummary = ({ stats }: ExamSummaryProps) => {
	return (
		<div className="bg-white rounded-lg shadow-md border border-primary-toned-200 p-6">
			<h2 className="text-xl font-semibold text-primary-toned-700 mb-4">Exam Summary</h2>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<StatCard value={stats.totalQuestions} label="Questions" />
				<StatCard value={stats.totalPoints} label="Total Points" />
				<StatCard value={stats.averagePoints} label="Avg Points/Question" />
				<StatCard value={stats.duration} label="Minutes" />
			</div>
		</div>
	);
};
