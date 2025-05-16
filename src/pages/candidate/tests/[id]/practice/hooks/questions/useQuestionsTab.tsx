import useArrayPagination from "../../../../../../../components/hooks/useArrayPagination";
import usePracticePage from "../usePracticePage";
import useGetQuestionsWithAnswers from "./useGetQuestionsWithAnswers";
import useShowAnswers from "./useShowAnswers";
import useShowQuestions from "./useShowQuestions";

export default function useQuestionsTab() {
	const { data: {
		practiceAggregate,
		practice,
	} } = usePracticePage();
	const {
		showQuestions,
		showWarning,
		handleShowQuestions,
	} = useShowQuestions();

	const {
		data: { questionsWithAnswers },
		isLoading,
	} = useGetQuestionsWithAnswers({
		showQuestions,
	});

	const {
		showAllAnswers,
		isQuesionAnswerVisible,
		handleToggleAllAnswers,
		handleToggleAnswer,
	} = useShowAnswers(questionsWithAnswers);

	const paging = useArrayPagination(questionsWithAnswers, 10);

	return {
		isLoading,
		practice,
		practiceAggregate,
		showQuestions,
		showWarning,
		showAllAnswers,
		isQuesionAnswerVisible,
		handleShowQuestions,
		handleToggleAllAnswers,
		handleToggleAnswer,
		page: paging.page,
		setPage: paging.setPage,
		totalPages: paging.totalPages,
		pageItems: paging.pageItems,
	}
}
