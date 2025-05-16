import { useGetPracticesByTestIdQuestionsWithAnswerQuery } from '../../../../../../../features/tests/api/test.api-gen';
import useGetTestIdParams from '../../../../../../../features/tests/hooks/useGetTestIdParams';
import usePracticePage from '../usePracticePage';
import useQuestionDisplay from './useQuestionDisplay';

export default function useQuestionsTab() {
	const testId = useGetTestIdParams();

	const { isShowingQuestions } = useQuestionDisplay();
	const { data: {
		attemptAggregate,
		practiceAggregate,
	} } = usePracticePage();

	const questionsWithAnswersQuery = useGetPracticesByTestIdQuestionsWithAnswerQuery({
		testId,
	}, {
		skip: !isShowingQuestions,
	});

	return {
		data: {
			questionsWithAnswers: questionsWithAnswersQuery.data || [],
			practiceAggregate,
		},
		isLoading: questionsWithAnswersQuery.isLoading,
		hasAttempts: attemptAggregate.totalAttempts > 0,
	};
}
