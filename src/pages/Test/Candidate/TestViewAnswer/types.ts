export type GetTestAnswerParams = {
    testId: string;
    attemptId: string;
}

export type FilterQuestionAnswerParams = GetTestAnswerParams & {
    page: number;
    perPage: number;
}

type TestQuestionChoiceAnswer = {
    ID: string;
    text: string;
    isChoosen: boolean;
    isCorrect: boolean;
}

export type TestQuestionAnswer = {
    ID: string;
    text: string;
    choices: TestQuestionChoiceAnswer[];
    point: number,
}

export type TestViewAnswerProps = {
    title: string;
    score: number;
    totalScore: number;
    totalQuestions: number;
}

export const bufferTestViewAnswerData: TestViewAnswerProps = {
    title: '',
    score: 0,
    totalScore: 0,
    totalQuestions: 0,
}
