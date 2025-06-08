import { ExamPersistState } from '../../../../../infra-test/reducers/exam-persist.store'
import { usePostExamsMutation } from '../../../../../features/tests/api/test.api-gen'
import { useCallback, useEffect, useMemo } from 'react';
import { examPersistSelectors } from '../../../../../infra-test/reducers/exam-persist.selector';
import { parseQueryError } from '../../../../../helpers/fetchBaseQuery.error';
import { stateToPostExamArgs } from "../../../../../infra-test/reducers/exam-persist.selector";

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

	const {
		configErrors,
		questionsErrors,
		errors,
	} = useMemo(() => {
		return examPersistSelectors(state);
	}, [state])

	const handlePostExam = useCallback(async () => {
		onPostingStarted();
		if (errors.length > 0) {
			console.warn("Cannot post exam, validation errors present.");
			console.warn("Validation errors:", errors);
			return;
		}
		const args = stateToPostExamArgs(state);
		postExam(args);
	}, [state]);

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

