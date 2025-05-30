// test blue print step

import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ExamConfigPersist } from "../../../../../../../infra-test/core/test.model";

// Types for topic management
type DifficultyLevel = "Easy" | "Medium" | "Hard";

type DifficultyDistribution = {
	Easy: number;
	Medium: number;
	Hard: number;
};

type TopicBlueprint = {
	id: string;
	name: string;
	questionCount: number;
	difficultyDistribution: DifficultyDistribution;
};

type TopicBlueprintData = {
	topics: TopicBlueprint[];
};

export type { TopicBlueprintData };

type ValidationErrors = {
	topics?: string;
	[key: string]: string | undefined;
};

export default function Step2({
	examConfigPersist,
	onExamConfigChange,
	topicBlueprintData,
	onTopicBlueprintChange,
	onValidationChange,
}: {
	examConfigPersist: ExamConfigPersist;
	onExamConfigChange: (config: Partial<ExamConfigPersist>) => void;
	topicBlueprintData?: TopicBlueprintData;
	onTopicBlueprintChange?: (data: Partial<TopicBlueprintData>) => void;
	onValidationChange?: (isValid: boolean) => void;
}) {
	const [topicData, setTopicData] = useState<TopicBlueprintData>(
		topicBlueprintData || {
			topics: [
				{
					id: "topic-1",
					name: "Introduction",
					questionCount: 5,
					difficultyDistribution: { Easy: 60, Medium: 30, Hard: 10 }
				}
			]
		}
	); const [errors, setErrors] = useState<ValidationErrors>({});

	// Sync local state with parent component
	useEffect(() => {
		onTopicBlueprintChange?.(topicData);
	}, [topicData, onTopicBlueprintChange]);

	// Validation logic
	const validateTopics = useCallback((topics: TopicBlueprint[]): ValidationErrors => {
		const newErrors: ValidationErrors = {};

		if (topics.length === 0) {
			newErrors.topics = "At least one topic is required";
		} else {
			// Validate each topic
			for (let i = 0; i < topics.length; i++) {
				const topic = topics[i];
				if (!topic.name.trim()) {
					newErrors[`topic-${topic.id}-name`] = "Topic name is required";
				}
				if (topic.questionCount <= 0) {
					newErrors[`topic-${topic.id}-questions`] = "Question count must be greater than 0";
				}

				const total = topic.difficultyDistribution.Easy +
					topic.difficultyDistribution.Medium +
					topic.difficultyDistribution.Hard;
				if (Math.abs(total - 100) > 0.1) {
					newErrors[`topic-${topic.id}-distribution`] = "Difficulty percentages must total 100%";
				}
			}
		}

		return newErrors;
	}, []);

	// Update validation when topics change
	useEffect(() => {
		const newErrors = validateTopics(topicData.topics);
		setErrors(newErrors);

		const isValid = Object.keys(newErrors).length === 0;
		onValidationChange?.(isValid);
	}, [topicData.topics, validateTopics, onValidationChange]);

	// Topic management functions
	const addTopic = useCallback(() => {
		const newTopic: TopicBlueprint = {
			id: `topic-${Date.now()}`,
			name: "",
			questionCount: 1,
			difficultyDistribution: { Easy: 60, Medium: 30, Hard: 10 }
		};

		setTopicData(prev => ({
			...prev,
			topics: [...prev.topics, newTopic]
		}));
	}, []);

	const deleteTopic = useCallback((topicId: string) => {
		setTopicData(prev => ({
			...prev,
			topics: prev.topics.filter(topic => topic.id !== topicId)
		}));
	}, []);

	const updateTopic = useCallback((topicId: string, updates: Partial<TopicBlueprint>) => {
		setTopicData(prev => ({
			...prev,
			topics: prev.topics.map(topic =>
				topic.id === topicId ? { ...topic, ...updates } : topic
			)
		}));
	}, []);

	const updateDifficultyDistribution = useCallback((topicId: string, difficulty: DifficultyLevel, value: number) => {
		setTopicData(prev => ({
			...prev,
			topics: prev.topics.map(topic => {
				if (topic.id === topicId) {
					const newDistribution = { ...topic.difficultyDistribution };
					newDistribution[difficulty] = Math.max(0, Math.min(100, value));

					// Auto-balance the other two levels to maintain 100% total
					const others = (["Easy", "Medium", "Hard"] as DifficultyLevel[]).filter(d => d !== difficulty);
					const remaining = 100 - newDistribution[difficulty];
					const currentOthersTotal = others.reduce((sum, d) => sum + topic.difficultyDistribution[d], 0);

					if (currentOthersTotal > 0) {
						others.forEach(d => {
							newDistribution[d] = Math.round((topic.difficultyDistribution[d] / currentOthersTotal) * remaining);
						});
					} else {
						// If others total is 0, distribute equally
						const perOther = remaining / others.length;
						others.forEach(d => {
							newDistribution[d] = Math.round(perOther);
						});
					}

					return { ...topic, difficultyDistribution: newDistribution };
				}
				return topic;
			})
		}));
	}, []);

	// Calculate totals
	const totalQuestions = topicData.topics.reduce((sum, topic) => sum + topic.questionCount, 0);
	const totalTopics = topicData.topics.length;

	return (
		<div className="text-base [&>label]:text-primary [&>label]:font-semibold w-full h-full overflow-y-auto p-6">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-primary mb-2">Question Blueprint</h2>
				<p className="text-sm text-gray-600">
					Define topics and their question distributions to create a structured test blueprint.
				</p>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-2 gap-4 mb-6">
				<div className="bg-primary-toned-50 border border-primary-toned-200 rounded-lg p-4">
					<h3 className="text-sm font-semibold text-gray-500 mb-1">Total Topics</h3>
					<p className="text-2xl font-bold text-primary-toned-700">{totalTopics}</p>
				</div>
				<div className="bg-primary-toned-50 border border-primary-toned-200 rounded-lg p-4">
					<h3 className="text-sm font-semibold text-gray-500 mb-1">Total Questions</h3>
					<p className="text-2xl font-bold text-primary-toned-700">{totalQuestions}</p>
				</div>
			</div>

			{/* Add Topic Button */}
			<div className="mb-6">
				<button
					onClick={addTopic}
					className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-toned-600 transition-colors font-semibold"
				>
					<FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
					Add Topic
				</button>
			</div>

			{/* Topics List */}			<div className="space-y-4">
				{topicData.topics.map((topic, index) => (
					<div
						key={topic.id}
						className="bg-white border border-primary-toned-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
					>						<div className="flex items-start gap-4">
							{/* Topic Content */}
							<div className="flex-1 space-y-4">
								{/* Topic Header */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4 flex-1">
										<div className="flex-1">
											<label className="block text-sm font-semibold text-primary mb-1">
												Topic {index + 1} Name <span className="text-red-500">*</span>
											</label>
											<input
												type="text"
												value={topic.name}
												onChange={(e) => updateTopic(topic.id, { name: e.target.value })}
												placeholder="Enter topic name"
												className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring ${errors[`topic-${topic.id}-name`]
													? 'border-red-500 focus:ring-red-300'
													: 'border-primary focus:ring-teal-300'
													}`}
											/>
											{errors[`topic-${topic.id}-name`] && (
												<p className="text-red-500 text-sm mt-1">{errors[`topic-${topic.id}-name`]}</p>
											)}
										</div>
										<div className="w-32">
											<label className="block text-sm font-semibold text-primary mb-1">
												Questions <span className="text-red-500">*</span>
											</label>
											<input
												type="number"
												min="1"
												value={topic.questionCount}
												onChange={(e) => updateTopic(topic.id, { questionCount: Math.max(1, parseInt(e.target.value) || 1) })}
												className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring ${errors[`topic-${topic.id}-questions`]
													? 'border-red-500 focus:ring-red-300'
													: 'border-primary focus:ring-teal-300'
													}`}
											/>
											{errors[`topic-${topic.id}-questions`] && (
												<p className="text-red-500 text-sm mt-1">{errors[`topic-${topic.id}-questions`]}</p>
											)}
										</div>
									</div>

									{/* Delete Button */}
									{topicData.topics.length > 1 && (
										<button
											onClick={() => deleteTopic(topic.id)}
											className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
											title="Delete topic"
										>
											<FontAwesomeIcon icon={faTrashCan} className="w-4 h-4" />
										</button>
									)}
								</div>

								{/* Difficulty Distribution */}
								<div>
									<h4 className="text-sm font-semibold text-primary mb-3">Difficulty Distribution</h4>
									<div className="grid grid-cols-3 gap-4">
										{(["Easy", "Medium", "Hard"] as DifficultyLevel[]).map((difficulty) => (
											<div key={difficulty} className="space-y-2">
												<label className="block text-sm font-medium text-gray-600">
													{difficulty}
												</label>
												<div className="flex items-center gap-2">
													<input
														type="number"
														min="0"
														max="100"
														value={topic.difficultyDistribution[difficulty]}
														onChange={(e) => updateDifficultyDistribution(
															topic.id,
															difficulty,
															parseInt(e.target.value) || 0
														)}
														className="w-16 border border-gray-300 rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-primary-toned-300"
													/>
													<span className="text-sm text-gray-500">%</span>
												</div>
												{/* Visual percentage bar */}
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div
														className={`h-2 rounded-full transition-all duration-300 ${difficulty === 'Easy' ? 'bg-green-500' :
															difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
															}`}
														style={{ width: `${topic.difficultyDistribution[difficulty]}%` }}
													></div>
												</div>
											</div>
										))}
									</div>
									{errors[`topic-${topic.id}-distribution`] && (
										<p className="text-red-500 text-sm mt-2">{errors[`topic-${topic.id}-distribution`]}</p>
									)}

									{/* Distribution Summary */}
									<div className="mt-3 p-3 bg-gray-50 rounded-lg">
										<div className="flex justify-between text-sm">
											<span className="text-gray-600">Total:</span>
											<span className={`font-semibold ${Math.abs((topic.difficultyDistribution.Easy + topic.difficultyDistribution.Medium + topic.difficultyDistribution.Hard) - 100) < 0.1
												? 'text-green-600' : 'text-red-600'
												}`}>
												{topic.difficultyDistribution.Easy + topic.difficultyDistribution.Medium + topic.difficultyDistribution.Hard}%
											</span>
										</div>
										<div className="mt-2 grid grid-cols-3 gap-2 text-xs">
											<div className="text-center">
												<div className="text-gray-500">Easy</div>
												<div className="font-semibold">{Math.round(topic.questionCount * topic.difficultyDistribution.Easy / 100)} q</div>
											</div>
											<div className="text-center">
												<div className="text-gray-500">Medium</div>
												<div className="font-semibold">{Math.round(topic.questionCount * topic.difficultyDistribution.Medium / 100)} q</div>
											</div>
											<div className="text-center">
												<div className="text-gray-500">Hard</div>
												<div className="font-semibold">{Math.round(topic.questionCount * topic.difficultyDistribution.Hard / 100)} q</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Global Errors */}
			{errors.topics && (
				<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-red-600 text-sm">{errors.topics}</p>
				</div>
			)}

			{/* Help Text */}			<div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
				<h4 className="text-sm font-semibold text-blue-800 mb-2">Tips:</h4>
				<ul className="text-sm text-blue-700 space-y-1">
					<li>• Difficulty percentages must total 100% for each topic</li>
					<li>• Use descriptive topic names to organize your questions effectively</li>
					<li>• Consider your target audience when setting difficulty distributions</li>
				</ul>
			</div>
		</div>
	);
}
