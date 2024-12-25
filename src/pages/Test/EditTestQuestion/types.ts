export type Question = {
    questionId:string;
    question: string;
    options: string[];
    correctAnswer: number;
    score: number;
};

export type QuestionParams = {
    testID: string;
    questionList: Question[];
};