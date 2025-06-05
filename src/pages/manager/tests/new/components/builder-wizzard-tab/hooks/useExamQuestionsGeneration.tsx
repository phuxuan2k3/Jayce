import { useState } from "react";
import { GetGenerateExamQuestionsApiRequest, GetGenerateExamQuestionsApiResponse, useLazyGetGenerateExamQuestionsQuery } from "../apis/exam-generation.api";
import { ExamGenerationState } from "../models/exam-generation.model";
import { mockGetGenerateExamQuestionsApiResponse } from "../apis/exam-generation.mock";

const mock = true;

export default function useExamQuestionsGeneration({
	state,
}: {
	state: ExamGenerationState;
}) {
	const request = transformStateToRequest(state);

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<GetGenerateExamQuestionsApiResponse | null>(null);

	const [generate] = useLazyGetGenerateExamQuestionsQuery();

	const generateExamQuestions = async (request: GetGenerateExamQuestionsApiRequest): Promise<void> => {
		setIsLoading(true);
		setError(null);
		setData(null);
		console.log("Generating exam questions with request:", request);
		try {
			if (mock) {
				// Simulate a successful response
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const response: GetGenerateExamQuestionsApiResponse = mockGetGenerateExamQuestionsApiResponse;
				setData(response);
			} else {
				const response = await generate(request).unwrap();
				setData(response);
			}
		} catch (err) {
			setError("Failed to generate exam questions. Please try again.");
			console.error("Error generating exam questions:", err);
			throw err; // Re-throw the error for further handling if needed
		} finally {
			setIsLoading(false);
		}
	};
	return {
		generateExamQuestions: () => generateExamQuestions(request),
		isLoading,
		error,
		data,
	}
}

function transformStateToRequest(state: ExamGenerationState): GetGenerateExamQuestionsApiRequest {
	return {
		...state.step1,
		...state.step2,
		...state.step3,
	};
}