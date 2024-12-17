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
