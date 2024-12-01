type QuestionChoice = {
    id: string;
    choiceText: string;
}

type MultipleChoiceQuestion = {
    id: string;
    questionText: string;
    choices: QuestionChoice[];
}

export type TestDoProps = {
    title: string;
    questions: MultipleChoiceQuestion[];
}

export const mockData: TestDoProps = {
    title: "Sample Test",
    questions: [
        {
            id: "q1",
            questionText: "What is the capital of France?",
            choices: [
                { id: "c1", choiceText: "Paris" },
                { id: "c2", choiceText: "London" },
                { id: "c3", choiceText: "Berlin" },
                { id: "c4", choiceText: "Madrid" }
            ]
        },
        {
            id: "q2",
            questionText: "What is 2 + 2?",
            choices: [
                { id: "c1", choiceText: "3" },
                { id: "c2", choiceText: "4" },
                { id: "c3", choiceText: "5" },
                { id: "c4", choiceText: "6" }
            ]
        }
    ]
};


// Submit ===

export type TestSubmission = {
    testId: string;
    answers: QuestionChoiceSubmission[];
}

type QuestionChoiceSubmission = {
    questionId: string;
    choiceId: string;
}