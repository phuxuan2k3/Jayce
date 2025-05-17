import { useGetPracticesByTestIdQuestionsWithAnswerQuery } from '../../../../../../features/tests/api/test.api-gen';
import useGetTestIdParams from '../../../../../../features/tests/hooks/useGetTestIdParams';

export default function useGetQuestionsWithAnswers({
	showQuestions,
}: {
	showQuestions: boolean;
}) {
	const testId = useGetTestIdParams();
	const questionsWithAnswersQuery = useGetPracticesByTestIdQuestionsWithAnswerQuery({
		testId,
	}, {
		skip: !showQuestions,
	});

	return {
		data: {
			questionsWithAnswers: questionsWithAnswersQuery.data || [],
		},
		isLoading: questionsWithAnswersQuery.isLoading,
	};
}
