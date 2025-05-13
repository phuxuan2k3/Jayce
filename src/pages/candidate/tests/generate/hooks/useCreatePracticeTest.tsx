import { usePostPracticeTestsMutation } from '../../../../../features/tests/api/test.api-gen'
import { QuestionCoreCreate, TestPracticeCoreCreate } from '../../../../../features/tests/types/create';
import { authSelectors } from '../../../../../features/auth/store/authSlice';
import { useAppSelector } from '../../../../../app/hooks';

export default function useCreatePracticeTest() {
	const [createPractice, createState] = usePostPracticeTestsMutation();
	const userId = useAppSelector(authSelectors.selectUserId);
	const handleCreatePracticeTest = async (testData: TestPracticeCoreCreate, generatedQuestions: QuestionCoreCreate[]) => {
		if (!userId) {
			throw new Error("User ID is not available");
		}
		return await createPractice({
			body: {
				practice: {
					...testData,
					difficulty: testData.difficulty as "easy" | "medium" | "hard" || "easy",
				},
				test: {
					...testData,
					authorId: userId,
				},
				questions: generatedQuestions.map((question) => ({
					...question,
				})),
			},
		}).unwrap();
	}
	return {
		handleCreatePracticeTest,
		createState,
	}
}
