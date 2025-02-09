export type Question = {
	text: string;
	options: string[];
	correctAnswer: number;
	points: number;
}

export type TestSubmissionParams = {
	testId: string;
	questions: Question[];
}

export type Prompt = {
	question: string;
}

export type QuestionResponse = {
	answer: string;
	conversation_id: string;
	question: string;
}