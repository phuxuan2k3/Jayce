type TestQuestionChoice = {
    ID: string;
    text: string;
}

export type TestQuestion = {
    ID: string;
    text: string;
    points: number;
    choices: TestQuestionChoice[];
}

export type TestDoProps = {
    title: string;
    minutesToAnswer: number;
    questions: TestQuestion[];
}

// Submit ===

export type TestSubmissionParams = {
    testId: string;
    answers: QuestionChoiceSubmission[];
}

type QuestionChoiceSubmission = {
    questionId: string;
    choiceId: string | null;
}