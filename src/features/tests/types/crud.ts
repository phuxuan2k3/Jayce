import { PostManagerTestsApiArg, PutManagerTestsByTestIdApiArg } from "../legacy/test.api-gen";

export type CreateTestParam = PostManagerTestsApiArg["body"];

export type UpdateTestParam = PutManagerTestsByTestIdApiArg["body"] & {
	id: number;
};

export type UpdateTestDetailsParam = Omit<UpdateTestParam, "questions">;

export type UpdateTestQuestionParam = NonNullable<UpdateTestParam["questions"]>[number]; // Use array index instead of "id"

export type QuestionDTO = CreateTestParam["questions"][number] & {
	id: number;
}

// Old;

export type TestCreateDetailsDTO = {
	title: string;
	description: string;
	minutesToAnswer: number;
	difficulty: string;
};

type Question = {
	text: string;
	options: string[];
	correctAnswer: number;
	points: number;
};

export type TestSubmissionParams = {
	testId: string;
	questions: Question[];
};

export type GeneralInfo = {
	title: string;
	description: string;
	duration: string;
	difficulty: string;
	maxNumberOfQuestions: number;
};

export type CriteriaRequestFormat = {
	criteria: string;
	chosenOption: string;
};

export type CriteriaRequest = {
	name: string;
	description: string;
	fields: string[];
	duration: string;
	question_type: string;
	language: string;
	options: number;
	number_of_question: number;
	candidate_seniority: string;
	difficulty: string;
	context: string;
	// links: string[];
	// documents: File[];
};

export type CriteriaResponse = {
	criteria: string;
	optionList: string[];
};

export type OptionsRequest = {
	generalInfo: GeneralInfo;
	criteriaList: CriteriaRequestFormat[];
	newCriteria: string;
};

// Question Generation

type OptionListResponseFormat = {
	optionContent: string;
	isCorrect: boolean;
};

export type GeneratedQuestionFormat = {
	questionContent: string;
	optionList: OptionListResponseFormat[];
	points?: number;
};

export type GeneratedQuestionResponse = {
	questionList: GeneratedQuestionFormat[];
};