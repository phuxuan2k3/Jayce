import { useCallback } from "react";
import { DifficultyLevel, ValidationErrors } from "../types";
import { TopicBlueprint } from "../../../../models/generate.types";

export const useTopicValidation = () => {
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

	return { validateTopics };
};

export const useTopicActions = (setTopicData: React.Dispatch<React.SetStateAction<any>>) => {
	const addTopic = useCallback(() => {
		const newTopic: TopicBlueprint = {
			id: `topic-${Date.now()}`,
			name: "",
			questionCount: 1,
			difficultyDistribution: { Easy: 60, Medium: 30, Hard: 10 }
		};

		setTopicData((prev: any) => ({
			...prev,
			topics: [...prev.topics, newTopic]
		}));
	}, [setTopicData]);

	const deleteTopic = useCallback((topicId: string) => {
		setTopicData((prev: any) => ({
			...prev,
			topics: prev.topics.filter((topic: TopicBlueprint) => topic.id !== topicId)
		}));
	}, [setTopicData]);

	const updateTopic = useCallback((topicId: string, updates: Partial<TopicBlueprint>) => {
		setTopicData((prev: any) => ({
			...prev,
			topics: prev.topics.map((topic: TopicBlueprint) =>
				topic.id === topicId ? { ...topic, ...updates } : topic
			)
		}));
	}, [setTopicData]);

	const updateDifficultyDistribution = useCallback((topicId: string, difficulty: DifficultyLevel, value: number) => {
		setTopicData((prev: any) => ({
			...prev,
			topics: prev.topics.map((topic: TopicBlueprint) => {
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
	}, [setTopicData]);

	return {
		addTopic,
		deleteTopic,
		updateTopic,
		updateDifficultyDistribution
	};
};
