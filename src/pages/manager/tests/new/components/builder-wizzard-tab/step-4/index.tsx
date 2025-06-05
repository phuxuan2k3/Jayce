import { ExamGenerationState } from "../models/exam-generation.model"
import { useMemo } from "react";
import {
	OverviewCards,
	BasicInformation,
	DifficultyDistribution,
	TopicsReview,
	GenerationContext,
	ConfirmationSection
} from "./components";

export default function Step4({
	state,
	onConfirm,
}: {
	state: ExamGenerationState;
	onConfirm: () => void;
}) {
	const totalQuestions = useMemo(() => {
		return state.step2.topics.reduce((total, topic) => {
			return total + Object.values(topic.difficultyDistribution).reduce((sum, count) => sum + count, 0);
		}, 0);
	}, [state.step2.topics]);

	const difficultyBreakdown = useMemo(() => {
		const breakdown = { Easy: 0, Medium: 0, Hard: 0 };
		state.step2.topics.forEach(topic => {
			breakdown.Easy += topic.difficultyDistribution.Easy || 0;
			breakdown.Medium += topic.difficultyDistribution.Medium || 0;
			breakdown.Hard += topic.difficultyDistribution.Hard || 0;
		});
		return breakdown;
	}, [state.step2.topics]);
	return (
		<div className="max-w-4xl mx-auto space-y-8">
			{/* Header */}
			<div className="text-center">
				<h2 className="text-3xl font-bold text-primary mb-2">Review Your Exam Configuration</h2>
				<p className="text-gray-600">Please review all settings before generating your exam</p>
			</div>

			{/* Overview Cards */}
			<OverviewCards state={state} totalQuestions={totalQuestions} />

			{/* Main Content Sections */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<BasicInformation state={state} />
				<DifficultyDistribution
					difficultyBreakdown={difficultyBreakdown}
					totalQuestions={totalQuestions}
				/>
			</div>

			{/* Topics Section */}
			<TopicsReview state={state} />

			{/* Generation Context */}
			<GenerationContext state={state} />

			{/* Confirmation Section */}
			<ConfirmationSection
				totalQuestions={totalQuestions}
				topicsCount={state.step2.topics.length}
				onConfirm={onConfirm}
			/>
		</div>
	);
}
