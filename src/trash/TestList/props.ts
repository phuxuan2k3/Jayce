export type TestListProps = {
	suggestedTags: string[];
}

export type TestDisplayProps = {
	ID: string;
	company: string;
	createdAt: string;
	title: string;
	description: string;
	minutesToAnswer: number;
	tags: string[];
	answerCount: number;
}