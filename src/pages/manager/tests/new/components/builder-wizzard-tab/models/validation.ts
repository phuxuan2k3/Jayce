import { Step1Data, Step2Data, Step3Data } from "../common/model-types";
import { TopicModel } from "./topic.model";

export function validateStep1(data: Step1Data): string[] {
	const errorMessages: string[] = [];
	if (!data.title || data.title.trim() === "") {
		errorMessages.push("Title is required.");
	}
	if (!data.description || data.description.trim() === "") {
		errorMessages.push("Description is required.");
	}
	return errorMessages;
}

export function validateStep2(data: Step2Data): string[] {
	const errorMessages: string[] = [];
	if (data.topics.length === 0) {
		errorMessages.push("At least one topic is required.");
	}
	data.topics.forEach((topic, index) => {
		const model = TopicModel(topic);
		const topicErrors = model.isValidTopic();
		errorMessages.push(
			...topicErrors.map(error => `Topic ${index + 1}: ${error}`)
		);
	});
	return errorMessages;
}

export function validateStep3(data: Step3Data): string[] {
	const errorMessages: string[] = [];
	if (data.creativity < 0 || data.creativity > 100) {
		errorMessages.push("Creativity must be between 0 (least creative) and 100 (most creative).");
	}
	return errorMessages;
}