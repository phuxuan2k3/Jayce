export type Answer = {
    ID: number;
    question: string;
    options: string[];
    chosenAnswer: number;
    correctAnswer: number;
    score: number;
};

export type Attempt = {
    ID: number;
    score: number;
    status: string;
    answer: Answer[];
    createdAt: string;
};

export type Submission = {
    testId: number;
    title: string;
    description: string;
    attempts: Attempt[];
};
