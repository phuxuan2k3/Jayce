export type OutlinesSuggestionArgs = {
	title: string;
	description: string;
	difficulty: string;
	tags: string[];
	outlines: string[];
};


export type OutlinesSuggestionResponse = {
	outlines: string[];
}