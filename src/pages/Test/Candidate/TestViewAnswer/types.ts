export type GetTestAnswerParams = {
    testId: string;
    attemptId: string;
}

export type FilterQuestionAnswerParams = GetTestAnswerParams & {
    page: number;
    perPage: number;
}

type TestQuestionChoiceAnswer = {
    id: string;
    text: string;
    isChoosen: boolean;
    isCorrect: boolean;
}

export type TestQuestionAnswer = {
    id: string;
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


// export const mockData: TestViewAnswerProps = {
//     title: "Design a product that helps people find contract",
//     questions: [
//         {
//             id: "1",
//             text: "What is the first step in the design process?",
//             choices: [
//                 {
//                     id: "A",
//                     text: "Research",
//                     isChoosen: true,
//                     isCorrect: true,
//                 },
//                 {
//                     id: "B",
//                     text: "Design",
//                     isChoosen: false,
//                     isCorrect: false,
//                 },
//                 {
//                     id: "C",
//                     text: "Develop",
//                     isChoosen: false,
//                     isCorrect: false,
//                 },
//                 {
//                     id: "D",
//                     text: "Test",
//                     isChoosen: false,
//                     isCorrect: false,
//                 },
//             ],
//             point: 10,
//         },
//         {
//             id: "2",
//             text: "What is the main purpose of user research?",
//             choices: [
//                 {
//                     id: "A",
//                     text: "Identify needs",
//                     isChoosen: false,
//                     isCorrect: true,
//                 },
//                 {
//                     id: "B",
//                     text: "Develop code",
//                     isChoosen: false,
//                     isCorrect: false,
//                 },
//                 {
//                     id: "C",
//                     text: "Write tests",
//                     isChoosen: true,
//                     isCorrect: false,
//                 },
//                 {
//                     id: "D",
//                     text: "Launch product",
//                     isChoosen: false,
//                     isCorrect: false,
//                 },
//             ],
//             point: 10,
//         },
//         {
//             id: "3",
//             text: "Which of the following is a low-fidelity prototype?",
//             choices: [
//                 {
//                     id: "A",
//                     text: "Wireframe",
//                     isChoosen: true,
//                     isCorrect: true,
//                 },
//                 {
//                     id: "B",
//                     text: "High-fidelity mockup",
//                     isChoosen: false,
//                     isCorrect: false,
//                 },
//                 {
//                     id: "C",
//                     text: "Interactive prototype",
//                     isChoosen: false,
//                     isCorrect: false,
//                 },
//             ],
//             point: 10,
//         }
//     ]
// }