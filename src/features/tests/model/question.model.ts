export type QuestionCore = {
	id: number;
	testId: number;
	text: string;
	options: string[];
	points: number;
	correctOption: number;
};

export type QuestionNoAnswer = Omit<QuestionCore, "correctOption">;

export type QuestionDo = QuestionNoAnswer & {
	isFlagged: boolean;
	chosenOption?: number;
};