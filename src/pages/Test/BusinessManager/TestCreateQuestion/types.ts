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

export type GeneralInfo = {
	title: string;
	description: string;
	duration: string;
	difficulty: string;
	maxNumberOfQuestions: number;
}

export type CriteriaRequestFormat = {
	criteria: string;
	chosenOption: string;
}

export type CriteriaRequest = {
	generalInfo: GeneralInfo;
	criteriaList: CriteriaRequestFormat[];
}

export type CriteriaResponse = {
	criteria: string;
	optionList: string[];
}

export type OptionsRequest = {
	generalInfo: GeneralInfo;
	criteriaList: CriteriaRequestFormat[];
	newCriteria: string;
}

export type OptionListResponseFormat = {
	optionContent: string;
	isCorrect: boolean;
}

export type GeneratedQuestionFormat = {
	questionContent: string;
	optionList: OptionListResponseFormat[];
}