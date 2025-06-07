export const languages = ['English', 'Vietnamese'] as const;
export type LanguageType = typeof languages[number];

export const seniorities = ['Intern', 'Juniour', 'Middle', 'Senior', 'Lead'] as const;
export type SeniorityType = typeof seniorities[number];

const difficulties = ['Easy', 'Medium', 'Hard'] as const;
export type DifficultyLevel = typeof difficulties[number];
export type DifficultyDistribution = {
	[difficulty in DifficultyLevel]: number;
}
