import useGetTestIdParams from '../../../../../../features/tests/hooks/useGetTestIdParams'
import { useGetExamsByTestIdQuery, useGetExamsByTestIdQuestionsWithAnswerQuery } from '../../../../../../features/tests/api/test.api-gen';
import useFetchStatesCombine from '../../../../../../components/hooks/useFetchStates';
import { ManagerTestEditPageModel } from '../type';
import { FetchState } from '../../../../../../app/types';

export default function usePageData(): FetchState<ManagerTestEditPageModel> {
	const testId = useGetTestIdParams();
	const examQuery = useGetExamsByTestIdQuery({ testId });
	const examQuestionsQuery = useGetExamsByTestIdQuestionsWithAnswerQuery({ testId });

	const fetchState = useFetchStatesCombine({
		fetchStates: [examQuery, examQuestionsQuery],
	});

	if (
		examQuery.data == null ||
		examQuestionsQuery.data == null
	) {
		return {
			isLoading: fetchState.isLoading,
			error: fetchState.error,
			data: undefined,
		};
	}

	return {
		isLoading: fetchState.isLoading,
		error: fetchState.error,
		data: {
			exam: examQuery.data,
			questions: examQuestionsQuery.data,
		},
	}
}
