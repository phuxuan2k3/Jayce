import interviewApi from "../api/interview.api";
import { getInterviewQuestionMock2 } from "./mocks";

export function getInterviewApiMock(endpointName: string): { data: any } | null {
	if (endpointName === interviewApi.endpoints.getQuestion.name) {
		return { data: getInterviewQuestionMock2 };
	}
	return null;
}