import { http, HttpResponse } from 'msw';
import { GetSuggestQuestionsResponse } from '../features/tests/api/practice-generate.api';

let isError = false;
let count = 0;

const generateQuestions = async (): Promise<GetSuggestQuestionsResponse> => {
	count++;
	if (count > 30) {
		count = 0; // Reset count after 30 calls
	}
	if (count % 5 === 0) {
		return {
			requestKey: "mock-request-key",
			questions: [
				{
					text: 'What is the capital of France?',
					points: 5,
					type: "MCQ",
					detail: {
						type: "MCQ",
						options: ["Paris", "London", "Berlin", "Madrid"],
						correctOption: 0,
					}
				},
			]
		}
	}
	return {
		requestKey: "mock-request-key",
		questions: [],
	}
}

export const mockSuggestQuestions = http.post<
	any,
	any,
	GetSuggestQuestionsResponse | { message: string },
	'https://skillsharp-api.icu/darius/v1/suggest_questions'
>(
	'https://skillsharp-api.icu/darius/v1/suggest_questions',
	async () => {
		// await new Promise(resolve => setTimeout(resolve, 1000));
		if (isError) {
			return HttpResponse.json({
				message: "Mocked error occurred while saving the test."
			}, { status: 500 });
		}
		const data = await generateQuestions();
		return HttpResponse.json(data, { status: 200 });
	}
);


