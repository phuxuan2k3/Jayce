export type ExamConfig = {
	roomId: string;
	password?: string;
	numberOfAttemptsAllowed: number;
	isAnswerVisible: boolean;
	isAllowedToSeeOthersResults: boolean;
	openDate: string;
	closeDate: string;
};
