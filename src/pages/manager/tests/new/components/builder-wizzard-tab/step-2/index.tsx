import { useEffect, useState } from "react";
import { ValidationErrors } from "./types";
import { TopicBlueprintData } from "../../../models/generate.types";
import { useTopicValidation, useTopicActions } from "./hooks/useTopicManagement";
import SummaryCards from "./components/SummaryCards";
import AddTopicButton from "./components/AddTopicButton";
import TopicCard from "./components/TopicCard";
import HelpText from "./components/HelpText";

export default function Step2({
	topicBlueprintData,
	onTopicBlueprintChange,
	onValidationChange,
}: {
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
	);
	const [errors, setErrors] = useState<ValidationErrors>({});

	// Custom hooks
	const { validateTopics } = useTopicValidation();
	const { addTopic, deleteTopic, updateTopic, updateDifficultyDistribution } = useTopicActions(setTopicData);
	// Sync local state with parent component
	useEffect(() => {
		onTopicBlueprintChange?.(topicData);
	}, [topicData, onTopicBlueprintChange]);

	// Update validation when topics change
	useEffect(() => {
		const newErrors = validateTopics(topicData.topics);
		setErrors(newErrors);

		const isValid = Object.keys(newErrors).length === 0;
		onValidationChange?.(isValid);
	}, [topicData.topics, validateTopics, onValidationChange]);

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

			<SummaryCards totalTopics={totalTopics} totalQuestions={totalQuestions} />

			<AddTopicButton onAddTopic={addTopic} />

			{/* Topics List */}
			<div className="space-y-4">
				{topicData.topics.map((topic, index) => (
					<TopicCard
						key={topic.id}
						topic={topic}
						index={index}
						canDelete={topicData.topics.length > 1}
						errors={errors}
						onUpdate={updateTopic}
						onDelete={deleteTopic}
						onDifficultyChange={updateDifficultyDistribution}
					/>
				))}
			</div>

			{/* Global Errors */}
			{errors.topics && (
				<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-red-600 text-sm">{errors.topics}</p>
				</div>
			)}

			<HelpText />
		</div>
	);
}
