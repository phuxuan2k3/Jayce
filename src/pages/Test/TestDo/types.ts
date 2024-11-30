import { TestDisplay } from "../TestList/types";

export type QuestionChoice = {
    id: string;
    choiceText: string;
}

export type MultipleChoiceQuestion = {
    id: string;
    questionText: string;
    choices: QuestionChoice[];
}

export type TestQuestions = TestDisplay & {
    questions: MultipleChoiceQuestion[];
}


// Submit ===

export type TestSubmission = {
    testId: string;
    answers: string[];
}

export type QuestionChoiceSubmission = {
    questionId: string;
    choiceId: string;
}