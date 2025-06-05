import useGetTestIdParams from '../../../../../../features/tests/hooks/useGetTestIdParams'
import { useGetExamsByTestIdQuery, useGetExamsByTestIdQuestionsWithAnswerQuery } from '../../../../../../features/tests/api/test.api-gen';
import useFetchStatesCombine from '../../../../../../components/hooks/useFetchStates';
import { ManagerTestEditPageModel } from '../type';
import { EMPTY_EXAM_CORE } from '../../../../../../infra-test/core/test.model';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export default function usePageData(): {
	isLoading: boolean;
	error?: FetchBaseQueryError | SerializedError | unknown;
	errorMessage: string | null;
	model: ManagerTestEditPageModel;
} {
	const testId = useGetTestIdParams();
	const examQuery = useGetExamsByTestIdQuery({ testId });
	const examQuestionsQuery = useGetExamsByTestIdQuestionsWithAnswerQuery({ testId });

	const fetchState = useFetchStatesCombine({
		fetchStates: [examQuery, examQuestionsQuery],
	});

	return {
		isLoading: fetchState.isLoading,
		error: fetchState.error,
		errorMessage: fetchState.errorMessage,
		model: {
			exam: examQuery.data || EMPTY_EXAM_CORE,
			questions: examQuestionsQuery.data || [],
		},
	}
}
