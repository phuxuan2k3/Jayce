import { Target, Users, Lightbulb, BookOpen, Globe, FileText, Link, Upload } from "lucide-react";
import { AllStepData } from "../../../common/types";

interface OverviewCardsProps {
	state: AllStepData;
	totalQuestions: number;
}

export default function OverviewCards({ state, totalQuestions }: OverviewCardsProps) {
	const getMostDominantDifficulty = () => {
		const difficultyTotals: Record<string, number> = {};

		state.step2.topics.forEach(topic => {
			Object.entries(topic.difficultyDistribution).forEach(([level, count]) => {
				difficultyTotals[level] = (difficultyTotals[level] || 0) + count;
			});
		});

		const dominantLevel = Object.entries(difficultyTotals)
			.sort(([, a], [, b]) => b - a)[0]?.[0] || 'Junior';

		return dominantLevel;
	};

	const hasContextData = state.step3.context.text ||
		state.step3.context.files.length > 0 ||
		state.step3.context.links.length > 0;

	return (
		<div className="space-y-6">
			{/* Primary Overview Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Total Questions Card */}
				<div className="bg-gradient-to-br from-primary-toned-50 to-primary-toned-100 p-6 rounded-lg border border-primary-toned-200">
					<div className="flex items-center gap-3 mb-3">
						<div className="p-2 bg-primary-toned-500 text-white rounded-lg">
							<Target className="w-5 h-5" />
						</div>
						<h3 className="font-semibold text-primary-toned-700">Total Questions</h3>
					</div>
					<div className="text-3xl font-bold text-primary-toned-800">{totalQuestions}</div>
					<p className="text-sm text-primary-toned-600 mt-1">Across {state.step2.topics.length} topics</p>
				</div>

				{/* Dominant Difficulty Level Card */}
				<div className="bg-gradient-to-br from-secondary-toned-50 to-secondary-toned-100 p-6 rounded-lg border border-secondary-toned-200">
					<div className="flex items-center gap-3 mb-3">
						<div className="p-2 bg-secondary-toned-500 text-white rounded-lg">
							<Users className="w-5 h-5" />
						</div>
						<h3 className="font-semibold text-secondary-toned-700">Primary Level</h3>
					</div>
					<div className="text-2xl font-bold text-secondary-toned-800">{getMostDominantDifficulty()}</div>
					<p className="text-sm text-secondary-toned-600 mt-1">Most weighted difficulty</p>
				</div>

				{/* Creativity Level Card */}
				<div className="bg-gradient-to-br from-blue-chill-200 to-blue-chill-100 p-6 rounded-lg border border-blue-chill-200">
					<div className="flex items-center gap-3 mb-3">
						<div className="p-2 bg-blue-chill-500 text-white rounded-lg">
							<Lightbulb className="w-5 h-5" />
						</div>
						<h3 className="font-semibold text-blue-chill-700">Creativity Level</h3>
					</div>
					<div className="text-2xl font-bold text-blue-chill-800">{state.step3.creativity}/10</div>
					<p className="text-sm text-blue-chill-600 mt-1">AI creativity score</p>
				</div>
			</div>

			{/* Test Configuration Details */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Test Information Card */}
				<div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 bg-blue-500 text-white rounded-lg">
							<BookOpen className="w-5 h-5" />
						</div>
						<h3 className="font-semibold text-gray-700">Test Information</h3>
					</div>
					<div className="space-y-3">
						<div>
							<p className="text-sm text-gray-500">Title</p>
							<p className="font-medium text-gray-900">{state.step1.title}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Language</p>
							<div className="flex items-center gap-2">
								<Globe className="w-4 h-4 text-gray-400" />
								<span className="font-medium text-gray-900">{state.step1.language}</span>
							</div>
						</div>
						{state.step1.description && (
							<div>
								<p className="text-sm text-gray-500">Description</p>
								<p className="text-gray-700 text-sm">{state.step1.description}</p>
							</div>
						)}
					</div>
				</div>

				{/* Context Information Card */}
				<div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 bg-purple-500 text-white rounded-lg">
							<FileText className="w-5 h-5" />
						</div>
						<h3 className="font-semibold text-gray-700">Context Information</h3>
					</div>
					{hasContextData ? (
						<div className="space-y-3">
							{state.step3.context.text && (
								<div>
									<p className="text-sm text-gray-500">Text Context</p>
									<p className="text-gray-700 text-sm line-clamp-2">{state.step3.context.text}</p>
								</div>
							)}
							{state.step3.context.files.length > 0 && (
								<div className="flex items-center gap-2">
									<Upload className="w-4 h-4 text-gray-400" />
									<span className="text-sm text-gray-600">
										{state.step3.context.files.length} file{state.step3.context.files.length > 1 ? 's' : ''} uploaded
									</span>
								</div>
							)}
							{state.step3.context.links.length > 0 && (
								<div className="flex items-center gap-2">
									<Link className="w-4 h-4 text-gray-400" />
									<span className="text-sm text-gray-600">
										{state.step3.context.links.length} link{state.step3.context.links.length > 1 ? 's' : ''} provided
									</span>
								</div>
							)}
						</div>
					) : (
						<p className="text-gray-500 text-sm italic">No additional context provided</p>
					)}
				</div>
			</div>

			{/* Topics Breakdown */}
			<div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
				<h3 className="font-semibold text-gray-700 mb-4">Topics & Difficulty Distribution</h3>
				<div className="grid gap-4">
					{state.step2.topics.map((topic, index) => (
						<div key={index} className="p-4 bg-gray-50 rounded-lg">
							<h4 className="font-medium text-gray-800 mb-2">{topic.name}</h4>
							<div className="flex flex-wrap gap-2">
								{Object.entries(topic.difficultyDistribution)
									.filter(([, count]) => count > 0)
									.map(([level, count]) => (
										<span
											key={level}
											className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-700 border"
										>
											{level}: {count}
										</span>
									))
								}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
