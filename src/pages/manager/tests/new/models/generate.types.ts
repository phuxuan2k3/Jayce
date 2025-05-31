export type DifficultyDistribution = {
	Easy: number;
	Medium: number;
	Hard: number;
};

export type TopicBlueprint = {
	id: string;
	name: string;
	questionCount: number;
	difficultyDistribution: DifficultyDistribution;
};

export type TopicBlueprintData = {
	topics: TopicBlueprint[];
};

