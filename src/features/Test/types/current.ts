import { GetTestsByTestIdCurrentDoApiResponse } from "../api/test.api-gen";

export type AttemptAnswer = {
	questionId: number;
	optionId?: number;
}

export type AttemptQuestion = GetTestsByTestIdCurrentDoApiResponse["questions"][0];