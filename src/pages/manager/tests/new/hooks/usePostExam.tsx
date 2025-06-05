import { ExamPersistState } from '../../../../../infra-test/reducers/exam-persist.store'
import { PostExamsApiArg, usePostExamsMutation } from '../../../../../features/tests/api/test.api-gen'
import { useCallback, useEffect } from 'react';
import { examPersistSelectors } from '../../../../../infra-test/reducers/exam-persist.selector';
import { parseQueryError } from '../../../../../helpers/fetchBaseQuery.error';

export default function usePostExam({
	state,
	onPostingStarted,
	onSuccess,
}: {
	state: ExamPersistState;
	onPostingStarted: () => void;
	onSuccess: (testId: string) => void;
}) {
	const [postExam, postExamState] = usePostExamsMutation();

	useEffect(() => {
		if (postExamState.isSuccess) {
			onSuccess(postExamState.data.testId);
		}
	}, [postExamState.isSuccess]);

	useEffect(() => {
		const errorMessage = parseQueryError(postExamState.error);
		if (errorMessage != null) {
			console.error("Error posting exam:", errorMessage);
		}
	}, [postExamState.error]);

	const handlePostExam = useCallback(async () => {
		onPostingStarted();
		if (errors.length > 0) {
			console.warn("Cannot post exam, validation errors present.");
			return;
		}
		const args = stateToPostExamArgs(state);
		postExam(args);
	}, []);

	const {
		configErrors,
		questionsErrors,
		errors,
	} = examPersistSelectors(state);

	return {
		handlePostExam,
		postExamState,
		hasValidationError: errors.length > 0,
		validationError: {
			configErrors,
			questionsErrors,
		}
	}
}

function stateToPostExamArgs(state: ExamPersistState): PostExamsApiArg {
	return {
		body: {
			exam: {
				...state.config,
				openDate: state.config.openDate.toISOString(),
				closeDate: state.config.closeDate.toISOString(),
				password: state.config.password ?? undefined,
				numberOfAttemptsAllowed: state.config.numberOfAttemptsAllowed ?? 0,
			},
			test: {
				...state.config,
				mode: "exam",
			},
			questions: state.questions.questions
		}
	}
}