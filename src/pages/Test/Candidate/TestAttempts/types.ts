import { Paged } from "../../../../interfaces/paged.type";
import { TestDisplayProps } from "../TestList/props"

export type FilterParams = {
    testId: string;
    page: number;
    perPage: number;
}

export enum TestStatus {
    Finished = "Finished",
    InProgress = "In Progress",
}

export type Attempt = {
    id: string;
    grade: number | null;
    status: TestStatus;
    submittedAt: string;
}

export type TestAttemptsProps = TestDisplayProps & {
    highestScore: number;
}

export const bufferTestDisplayData: TestAttemptsProps = {
    id: '',
    company: '',
    createdAt: Date().toString(),
    title: '',
    description: '',
    minutesToAnswer: 0,
    tags: [],
    answersCount: 0,
    highestScore: 0,
};

export const bufferAttemptsData: Paged<Attempt> = {
    page: 0,
    perPage: 0,
    totalPage: 0,
    data: [],
};

// export const mockData: TestDisplayProps & Paged<Attempt> = {
//     id: '1',
//     company: 'Tech Corp',
//     createdAt: '2023-01-01',
//     title: 'JavaScript Basics',
//     description: 'A test on the basics of JavaScript.',
//     minutesToAnswer: 30,
//     tags: ['JavaScript', 'Basics'],
//     answersCount: 10,
//     page: 1,
//     perPage: 10,
//     totalPage: 1,
//     data: [
//         {
//             id: '1',
//             grade: 85,
//             status: TestStatus.Finished,
//             submittedAt: "2023-10-01T10:00:00Z"
//         },
//         {
//             id: '2',
//             grade: 90,
//             status: TestStatus.Finished,
//             submittedAt: "2023-10-02T12:00:00Z"
//         },
//         {
//             id: '3',
//             grade: null,
//             status: TestStatus.InProgress,
//             submittedAt: "2023-10-03T14:00:00Z"
//         }
//     ]
// };