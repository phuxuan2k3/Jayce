
export type ExamConfigPersist = {
	roomId: string;
	title: string;
	description: string;
	minutesToAnswer: number;
	language: string;
	password: string | null;
	numberOfAttemptsAllowed?: number | null;
	isAnswerVisible: boolean;
	isAllowedToSeeOtherResults: boolean;
	openDate: Date;
	closeDate: Date;
};
