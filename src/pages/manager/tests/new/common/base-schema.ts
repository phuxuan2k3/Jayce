import z from "zod";

export const LanguagesAsConst = ['English', 'Vietnamese'] as const;
export type LanguageType = typeof LanguagesAsConst[number];

export const DifficultiesAsConst = ['Intern', 'Junior', 'Middle', 'Senior', 'Lead', 'Expert'] as const;
export type DifficultyType = typeof DifficultiesAsConst[number];

export const DifficultiesDistributionSchema = z.object(
	Object.fromEntries(
		DifficultiesAsConst.map((level) => [level, z.number()])
	) as Record<DifficultyType, z.ZodNumber>
);
export type DifficultyDistributionType = z.infer<typeof DifficultiesDistributionSchema>;

export const TopicSchema = z.object({
	name: z.string().min(1, "topic_name_required"),
	difficultyDistribution: DifficultiesDistributionSchema,
}).refine((data) => {
	const total = Object.values(data.difficultyDistribution).reduce((sum, value) => sum +
		value, 0)
	return total > 0
}, {
	message: "topic_difficulty_required",
	path: ["difficultyDistribution"]
});
export type Topic = z.infer<typeof TopicSchema>;
