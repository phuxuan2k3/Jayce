export type Question = {
    question: string; 
    options: string[]; 
    correctAnswer: number; 
    point: number;
}
export type TestSubmissionParams={
    testId:string;
    questionList: Question[];
}
export type Prompt = {
    question: string;
}
export type QuestionResponse = {
    answer: string;
    conversation_id: string;
    question: string;
}