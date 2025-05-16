import { useMemo, useState } from 'react'
import { useGetPracticesByTestIdAttemptsAggregateQuery } from '../../../../../../../features/tests/api/test.api-gen';
import useGetTestIdParams from '../../../../../../../features/tests/hooks/useGetTestIdParams';

export default function useShowQuestions() {
	const [showQuestions, setShowQuestions] = useState(false);
	const [showQuestionAgreement, setShowQuestionAgreement] = useState(false);
	const [showQuestionAnswers, setShowQuestionAnswers] = useState(false);
	const [visibleAnswers, setVisibleAnswers] = useState<{}>({});
}
