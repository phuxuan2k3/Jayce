import { http, HttpResponse } from 'msw'
import { url } from '../../../../../app/env'
import { mockGetGenerateExamQuestionsApiResponse } from './exam-generation.mock'

export const handlers = [
	http.post(`${url.darius}/exam/generate`, () => {
		return HttpResponse.json(mockGetGenerateExamQuestionsApiResponse);
	}),
];
