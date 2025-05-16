export type QuestionDoingState = {
	questionId: number;
	isFlagged: boolean;
	isCurrent: boolean;
	chosenOption?: number;
};
