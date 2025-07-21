import { http, HttpResponse } from "msw";

let isError = true;

export const mockPostTest = http.post<
	any,
	any,
	any,
	'https://skillsharp-api.icu/thresh/tests'
>(
	'https://skillsharp-api.icu/thresh/tests',
	async () => {
		await new Promise(resolve => setTimeout(resolve, 10000));
		if (isError) {
			return HttpResponse.json({
				message: "Mocked error occurred while saving the test."
			}, { status: 500 });
		}
		return HttpResponse.json({
			testId: "mock-test-id"
		});
	}
);