import { ExamGenerationState } from "../models/exam-generation.model";
import { FetchState } from "../../../../../app/types";
import { QuestionPersistOfTest } from "../../../../../infra-test/commands/question.persist";
import { useLazyGetGenerateExamQuestionsQuery, GetGenerateExamQuestionsApiRequest } from "../apis/exam-generation.api";

export default function useExamQuestionsGeneration(): {
	generateExamQuestions: (state: ExamGenerationState) => void;
	state: FetchState<QuestionPersistOfTest[]>;
} {
	const [generate, generateState] = useLazyGetGenerateExamQuestionsQuery();
	return {
		generateExamQuestions: (state: ExamGenerationState) => {
			generate(transformStateToRequest(state));
		},
		state: {
			...generateState,
			data: generateState.data?.questions,
		},
	}
}

function transformStateToRequest(state: ExamGenerationState): GetGenerateExamQuestionsApiRequest {
	return {
		...state.step1,
		...state.step2,
		...state.step3,
	};
}