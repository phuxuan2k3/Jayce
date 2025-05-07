export type QuestionCore = {
	id: number;
	testId: number;
	text: string;
	options: string[];
	points: number;
	correctOption: number;
};

export type QuestionHideAnswer = Omit<QuestionCore, "correctOption">;

export type QuestionDo = QuestionHideAnswer & {
	isFlagged: boolean;
	chosenOption?: number;
};
