import { DifficultyDistribution } from "../common/base-types";

export type Topic = {
	name: string;
	difficultyDistribution: DifficultyDistribution;
};

function getTotalQuestions(topic: Topic): number {
	let total = 0;
	for (const count of Object.values(topic.difficultyDistribution)) {
		total += count;
	}
	return total;
}

function isValidTopic(topic: Topic): string[] {
	const errorMessages: string[] = [];
	if (!topic.name || topic.name.trim() === "") {
		errorMessages.push("Topic name is required.");
	}
	const totalQuestions = getTotalQuestions(topic);
	if (totalQuestions < 1) {
		errorMessages.push("At least one question is required in the topic.");
	}
	for (const [difficulty, count] of Object.entries(topic.difficultyDistribution)) {
		if (count < 0) {
			errorMessages.push(`Count for ${difficulty} difficulty cannot be negative.`);
		}
	}
	return errorMessages;
}

export function TopicModel(topic: Topic) {
	return {
		getTotalQuestions: () => getTotalQuestions(topic),
		isValidTopic: () => isValidTopic(topic),
	};
}