import { TestDisplayProps } from "../TestList/types"

export enum TestStatus {
    Finished = "Finished",
    InProgress = "In Progress",
    NotStarted = "Not Started"
}

type Attempt = {
    id: string;
    grade: number | null;
    status: TestStatus;
    submittedAt: string;
}

export type TestAttemptsProps = TestDisplayProps & {
    attempts: Attempt[];
}

export const mockData: TestAttemptsProps = {
    id: '1',
    company: 'Tech Corp',
    createdAt: '2023-01-01',
    title: 'JavaScript Basics',
    description: 'A test on the basics of JavaScript.',
    minutesToAnswer: 30,
    tags: ['JavaScript', 'Basics'],
    answersCount: 10,
    attempts: [
        {
            id: '1',
            grade: 85,
            status: TestStatus.Finished,
            submittedAt: "2023-10-01T10:00:00Z"
        },
        {
            id: '2',
            grade: 90,
            status: TestStatus.Finished,
            submittedAt: "2023-10-02T12:00:00Z"
        },
        {
            id: '3',
            grade: null,
            status: TestStatus.InProgress,
            submittedAt: "2023-10-03T14:00:00Z"
        }
    ]
};