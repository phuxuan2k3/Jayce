import { useMemo } from "react";
import { ConfirmationSection } from "./components";
import { BuilderStep1Type, BuilderStep2Type, BuilderStep3Type } from "../../common/step-schema";
import { DifficultiesAsConst, DifficultyType } from "../../common/base-schema";
import { AllStepData } from "../../common/types";
import { Bolt, File, Info, Link, SlidersVertical } from "lucide-react";

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
		<div className="flex flex-col gap-4">
			{/* Header */}
			<div className="text-center">
				<h2 className="text-3xl font-bold text-primary mb-2">Review Your Exam Configuration</h2>
				<p className="text-gray-600">Please review all settings before generating your exam</p>
			</div>

			<hr className="border-primary-toned-300 w-full my-4" />

			{/* Basic Information Review */}
			<div className="bg-white border border-primary-toned-300 rounded-lg p-6 shadow-sm">
				<div className="flex items-center gap-3 mb-6">
					<div className="p-2 bg-primary text-white rounded-lg">
						<Info className="w-5 h-5" />
					</div>
					<h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Test Title</label>
						<p className="text-lg font-medium text-gray-800">{state.step1.title}</p>
					</div>
					<div>
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Language</label>
						<span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-toned-100 text-primary-toned-800">
							{state.step1.language}
						</span>
					</div>
					<div className="md:col-span-2">
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Description</label>
						<div className="border border-gray-200 rounded-lg p-4 shadow-sm">
							<p className="text-gray-700 leading-relaxed">{state.step1.description}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Topics Blueprint Review */}
			<div className="bg-white border border-primary-toned-300 rounded-lg p-6 shadow-sm">
				<div className="flex items-center gap-3 mb-6">
					<div className="p-2 bg-primary text-white rounded-lg">
						<Bolt className="w-5 h-5" />
					</div>
					<h3 className="text-xl font-semibold text-gray-800">Exam Blueprint</h3>
				</div>

				<div className="space-y-6">
					{/* Summary Statistics */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
						<div className="bg-primary-toned-100 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-primary-toned-600">{state.step2.topics.length}</div>
							<div className="text-sm text-primary-toned-700">Total Topics</div>
						</div>
						<div className="bg-primary-toned-100 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-primary-toned-600">{totalQuestions}</div>
							<div className="text-sm text-primary-toned-700">Total Questions</div>
						</div>
					</div>

					{/* Difficulty Distribution */}
					<div>
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 block">
							Difficulty Distribution
						</label>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
							{difficultySum.map(({ difficulty, number }) => (
								<div key={difficulty} className="text-center">
									<div className={`
										w-full h-16 rounded-lg flex items-center justify-center font-bold text-lg
										${number > 0
											? 'bg-primary text-white'
											: 'bg-gray-100 text-gray-400 border-2 border-dashed border-gray-300'
										}
									`}>
										{number}
									</div>
									<div className="text-xs text-gray-600 mt-1">{difficulty}</div>
								</div>
							))}
						</div>
					</div>

					{/* Topics Breakdown */}
					<div>
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 block">
							Topics Breakdown
						</label>
						<div className="space-y-3">
							{state.step2.topics.map((topic, index) => {
								const topicTotal = Object.values(topic.difficultyDistribution).reduce((sum, count) => sum + count, 0);
								const primaryDifficulty = Object.entries(topic.difficultyDistribution)
									.reduce((max, [difficulty, count]) =>
										count > max.count ? { difficulty, count } : max,
										{ difficulty: '', count: 0 }
									).difficulty;

								return (
									<div key={index} className="flex items-start justify-between px-6 py-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
										<div className="flex flex-col gap-1">
											<h4 className="font-semibold text-lg text-primary-toned-700">{topic.name}</h4>
											<span className="text-sm text-gray-500">
												{topicTotal} questions
											</span>
										</div>
										<span className="text-sm font-medium text-primary-toned-700 bg-primary-toned-100 px-3 py-1 rounded-full">
											{primaryDifficulty}
										</span>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			{/* Refinement Settings Review */}
			<div className="bg-white border border-primary-toned-300 rounded-lg p-6 shadow-sm">
				<div className="flex items-center gap-3 mb-6">
					<div className="p-2 bg-primary text-white rounded-lg">
						<SlidersVertical className="w-5 h-5" />
					</div>
					<h3 className="text-xl font-semibold text-gray-800">Refinement Settings</h3>
				</div>

				<div className="space-y-4">
					<div>
						<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Creativity Level</label>
						<div className="flex items-center gap-4">
							<div className="flex-1 bg-gray-200 rounded-full h-3">
								<div
									className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
									style={{ width: `${(state.step3.creativity / 10) * 100}%` }}
								></div>
							</div>
							<span className="text-lg font-bold text-primary">{state.step3.creativity}/10</span>
						</div>
						<p className="text-sm text-gray-600 mt-1">
							{state.step3.creativity <= 3 ? 'Conservative' :
								state.step3.creativity <= 7 ? 'Balanced' : 'Creative'} approach to question generation
						</p>
					</div>

					{state.step3.context.text && (
						<div>
							<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Additional Context</label>
							<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
								<p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{state.step3.context.text}</p>
							</div>
						</div>
					)}

					{state.step3.context.files.length > 0 && (
						<div>
							<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Uploaded Files</label>
							<div className="space-y-2">
								{state.step3.context.files.map((file, index) => (
									<div key={index} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
										<File size={16} className="text-gray-500" />
										<span className="text-sm text-gray-700 truncate">{file.name}</span>
										<span className="text-xs text-gray-500 ml-auto">
											{(file.size / 1024).toFixed(1)} KB
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					{state.step3.context.links.length > 0 && (
						<div>
							<label className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Reference Links</label>
							<div className="space-y-2">
								{state.step3.context.links.map((link, index) => (
									<div key={index} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
										<Link size={16} className="text-gray-500" />
										<a
											href={link}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm text-primary hover:text-primary-toned-600 underline flex-1 truncate"
										>
											{link}
										</a>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Do it here */}

			{/* Confirmation Section */}
			<ConfirmationSection
				totalQuestions={totalQuestions}
				topicsCount={state.step2.topics.length}
				onConfirm={onConfirm}
			/>
		</div>
	);
}
