
// Types for topic management
export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export type ValidationErrors = {
	topics?: string;
	[key: string]: string | undefined;
};
