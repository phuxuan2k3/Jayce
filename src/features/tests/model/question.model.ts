export type QuestionCore = {
	id: number;
	testId: number;
	text: string;
	options: string[];
	points: number;
	correctOption: number;
};
