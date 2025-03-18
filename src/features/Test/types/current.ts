import { GetCurrentAttemptStateApiResponse } from "../api/test.api-gen";

// export type AttemptAnswer = GetTestsByTestIdCurrentDoApiResponse["answers"][0];

// export type CurrentAttemptQuestion = GetTestsByTestIdCurrentDoApiResponse["questions"][0];

export type CurrentAttempt = NonNullable<GetCurrentAttemptStateApiResponse["currentAttempt"]>;