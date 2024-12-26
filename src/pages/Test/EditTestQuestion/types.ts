export type Question = {
    ID: number;
    text: string;
    options: string[];
    correctAnswer: number;
    points: number;
};

export type QuestionParams = {
    testID: string;
    questionList: Question[];
};
export type QuestionReturn = {
    title: string;
    questionList: Question[];
};