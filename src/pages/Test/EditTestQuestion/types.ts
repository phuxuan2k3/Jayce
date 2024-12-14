export type Question = {
    question: string;
    options: string[];
    correctAnswer: number;
    point: number;
};

export type QuestionParams = {
    testID: string;
    questionList: Question[];
};