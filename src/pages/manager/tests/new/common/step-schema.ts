import z from "zod";
import { LanguagesAsConst, TopicSchema } from "./base-schema";

export const BuilderStep1Schema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	language: z.enum(LanguagesAsConst),
});

export const BuilderStep2Schema = z.object({
	topics: z.array(TopicSchema).min(1, "At least one topic is required"),
}).refine((schema) => {
	const totalSum = schema.topics.reduce((acc, topic) => {
		const sum = Object.values(topic.difficultyDistribution).reduce((sum, count) => sum + count, 0);
		return acc + sum;
	}, 0);
	return totalSum <= 30;
}, {
	message: "Total questions must be less than or equal to 30",
});

export const BuilderStep3Schema = z.object({
	creativity: z.number().min(1).max(10, "Creativity level must be between 1 and 10"),
	context: z.object({
		text: z.string(),
		files: z.array(z.instanceof(File)),
		links: z.array(z.string().url()),
	}),
});

export type BuilderStep1Type = z.infer<typeof BuilderStep1Schema>;
export type BuilderStep2Type = z.infer<typeof BuilderStep2Schema>;
export type BuilderStep3Type = z.infer<typeof BuilderStep3Schema>;

