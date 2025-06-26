import { useMemo } from "react";
import {
	OverviewCards,
	BasicInformation,
	DifficultyDistribution,
	TopicsReview,
	GenerationContext,
	ConfirmationSection
} from "./components";
import { BuilderStep1Type, BuilderStep2Type, BuilderStep3Type } from "../utils/step-schema";
import { DifficultiesAsConst, DifficultyType } from "../utils/base-schema";
import { AllStepData } from "../utils/types";

export default function Step4({
	onConfirm,
	step1,
	step2,
	step3,
}: {
	step1: BuilderStep1Type;
	step2: BuilderStep2Type;
	step3: BuilderStep3Type;
	onConfirm: () => void;
}) {
	const totalQuestions = useMemo(() => {
		return step2.topics.reduce((total, topic) => {
			return total + Object.values(topic.difficultyDistribution).reduce((sum, count) => sum + count, 0);
		}, 0);
	}, [step2.topics]);

	const difficultySum: {
		difficulty: DifficultyType;
		number: number;
	}[] = useMemo(() => {
		const sum: {
			difficulty: DifficultyType;
			number: number;
		}[] = DifficultiesAsConst.map(difficulty => ({
			difficulty,
			number: 0
		}));
		step2.topics.forEach(topic => {
			Object.entries(topic.difficultyDistribution).forEach(([difficulty, count]) => {
				const index = sum.findIndex(item => item.difficulty === difficulty);
				if (index !== -1) {
					sum[index].number += count;
				}
			});
		});
		return sum;
	}, [step2.topics]);

	const state: AllStepData = {
		step1,
		step2,
		step3,
	};


	return (
		<div className="max-w-4xl mx-auto space-y-8">
			{/* Header */}
			<div className="text-center">
				<h2 className="text-3xl font-bold text-primary mb-2">Review Your Exam Configuration</h2>
				<p className="text-gray-600">Please review all settings before generating your exam</p>
			</div>

			{/* Overview Cards */}
			<OverviewCards state={{
				step1,
				step2,
				step3,
			}} totalQuestions={totalQuestions} />

			{/* Main Content Sections */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<BasicInformation state={state} />
				<DifficultyDistribution
					difficultyBreakdown={difficultySum}
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
