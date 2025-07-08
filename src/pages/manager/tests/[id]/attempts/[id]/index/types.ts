export type ScoreAnswerMap = {
	[answerId: string]: {
		points?: number | null | undefined;
		comment?: string | null | undefined;
	};
}
