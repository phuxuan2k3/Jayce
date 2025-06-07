import { LanguageType, SeniorityType } from "./base-types";
import { Topic } from "../models/topic.model";

export type Step1Data = {
	title: string;
	description: string;
	language: LanguageType;
	seniority: SeniorityType;
};

export type Step2Data = {
	topics: Topic[];
};

export type Step3Data = {
	creativity: number; // Creativity level from 1 to 10
	context: {
		text: string;
		files: File[];
		links: string[];
	};
};