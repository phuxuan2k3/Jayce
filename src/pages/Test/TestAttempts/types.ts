import { TestDisplay } from "../TestList/types"

export enum TestStatus {
    Finished = "Finished",
    InProgress = "In Progress",
    NotStarted = "Not Started"
}

export type Attempt = {
    grade: number;
    status: TestStatus;
    submittedAt: string;
}

export type TestAttempts = TestDisplay & {
    attempts: Attempt[];
}