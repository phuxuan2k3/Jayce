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
    ID: string;
    score: number | null;
    status: TestStatus;
    createdAt: string;
}

export type TestAttemptsProps = TestDisplayProps & {
    highestScore: number;
}
