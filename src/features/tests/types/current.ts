import { GetCurrentAttemptStateApiResponse } from "../api/test.api-gen";

export type CurrentAttempt = NonNullable<GetCurrentAttemptStateApiResponse["currentAttempt"]>;