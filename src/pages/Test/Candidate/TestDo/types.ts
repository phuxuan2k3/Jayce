type TestQuestionChoice = {
    id: string;
    text: string;
}

export type TestQuestion = {
    id: string;
    text: string;
    points: number;
    choices: TestQuestionChoice[];
}

export type TestDoProps = {
    title: string;
    questions: TestQuestion[];
}

// export const mockData: TestDoProps = {
//     title: "Sample Test",
//     questions: [
//         {
//             id: "q1",
//             text: "What is the capital of France?",
//             choices: [
//                 { id: "c1", text: "Paris" },
//                 { id: "c2", text: "London" },
//                 { id: "c3", text: "Berlin" },
//                 { id: "c4", text: "Madrid" }
//             ]
//         },
//         {
//             id: "q2",
//             text: "What is 2 + 2?",
//             choices: [
//                 { id: "c1", text: "3" },
//                 { id: "c2", text: "4" },
//                 { id: "c3", text: "5" },
//                 { id: "c4", text: "6" }
//             ]
//         }
//     ]
// };


// Submit ===

export type TestSubmissionParams = {
    testId: string;
    answers: QuestionChoiceSubmission[];
}

type QuestionChoiceSubmission = {
    questionId: string;
    choiceId: string | null;
}