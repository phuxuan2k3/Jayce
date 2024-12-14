export type Question = {
    question: string; 
    options: string[]; 
    correctAnswer: number; 
    point: number;
}
export type TestSubmissionParams={
    testId: string;
    questionList: Question[];
}