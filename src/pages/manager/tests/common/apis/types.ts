export type GetSuggestNewQuestionRequest = {
	title: string;
	description: string;
	tags: string[];
	estimatedMinutesToAnswer: number; // Estimated time to answer the question
	language: string;
	difficulty: string; // Difficulty level of the question, ex: "easy", "medium", "hard"
	context: string; // Extra context for the question, ex: "This question is about the history of Vietnam"
};

export type GetSuggestNewQuestionResponse = {
	text: string;
	options: string[];
	points: number;
	correctOption: number;
};
