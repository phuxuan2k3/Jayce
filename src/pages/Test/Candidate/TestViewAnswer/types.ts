type QuestionChoice = {
    id: string;
    choiceText: string;
    isChoosen: boolean;
    isCorrect: boolean;
}

type MultipleChoiceQuestionAnswer = {
    id: string;
    questionText: string;
    choices: QuestionChoice[];
    point: number,
}

export type TestViewAnswerProps = {
    title: string;
    questions: MultipleChoiceQuestionAnswer[];
}

export const mockData: TestViewAnswerProps = {
    title: "Design a product that helps people find contract",
    questions: [
        {
            id: "1",
            questionText: "What is the first step in the design process?",
            choices: [
                {
                    id: "A",
                    choiceText: "Research",
                    isChoosen: true,
                    isCorrect: true,
                },
                {
                    id: "B",
                    choiceText: "Design",
                    isChoosen: false,
                    isCorrect: false,
                },
                {
                    id: "C",
                    choiceText: "Develop",
                    isChoosen: false,
                    isCorrect: false,
                },
                {
                    id: "D",
                    choiceText: "Test",
                    isChoosen: false,
                    isCorrect: false,
                },
            ],
            point: 10,
        },
        {
            id: "2",
            questionText: "What is the main purpose of user research?",
            choices: [
                {
                    id: "A",
                    choiceText: "Identify needs",
                    isChoosen: false,
                    isCorrect: true,
                },
                {
                    id: "B",
                    choiceText: "Develop code",
                    isChoosen: false,
                    isCorrect: false,
                },
                {
                    id: "C",
                    choiceText: "Write tests",
                    isChoosen: true,
                    isCorrect: false,
                },
                {
                    id: "D",
                    choiceText: "Launch product",
                    isChoosen: false,
                    isCorrect: false,
                },
            ],
            point: 10,
        },
        {
            id: "3",
            questionText: "Which of the following is a low-fidelity prototype?",
            choices: [
                {
                    id: "A",
                    choiceText: "Wireframe",
                    isChoosen: true,
                    isCorrect: true,
                },
                {
                    id: "B",
                    choiceText: "High-fidelity mockup",
                    isChoosen: false,
                    isCorrect: false,
                },
                {
                    id: "C",
                    choiceText: "Interactive prototype",
                    isChoosen: false,
                    isCorrect: false,
                },
            ],
            point: 10,
        }
    ]
}