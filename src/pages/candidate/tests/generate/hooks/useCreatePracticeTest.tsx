import { usePostPracticesMutation } from '../../../../../features/tests/api/test.api-gen'
import { QuestionCoreCreate, TestPracticeCoreCreate } from '../../../../../features/tests/types/create';

export default function useCreatePracticeTest() {
	const [_createPractice, createPracticeState] = usePostPracticesMutation();
	const createPractice = async (testData: TestPracticeCoreCreate, generatedQuestions: QuestionCoreCreate[]) => {
		return await _createPractice({
			body: {
				practice: {
					...testData,
					difficulty: testData.difficulty as "easy" | "medium" | "hard" || "easy",
				},
				test: {
					...testData,
				},
				questions: generatedQuestions.map((question) => ({
					...question,
				})),
			},
		}).unwrap();
	}
	return {
		createPractice,
		createPracticeState,
	}
}
