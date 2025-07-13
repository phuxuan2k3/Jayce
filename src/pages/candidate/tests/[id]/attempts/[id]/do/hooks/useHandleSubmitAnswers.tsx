import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks'
import useGetAttemptIdParams from '../../../../../../../../features/tests/hooks/useGetAttemptIdParams'
import testDoSlice from '../../../../../../../../features/tests/stores/testDoSlice';
import useActionStateWatch from '../../../../../../../../features/tests/hooks/useActionStateWatch';
import { usePostAttemptsByAttemptIdAnswersMutation } from '../apis/answer';
import { AnswerForQuestionTypeSchema } from '../../../../../../../../features/tests/api/test.api-gen-v2';
import { toast } from 'react-toastify';
import { parseQueryError } from '../../../../../../../../helpers/fetchBaseQuery.error';
import { useCallback, useState } from 'react';
import { useLanguage } from '../../../../../../../../LanguageProvider';

export default function useHandleSubmitAnswers({
	onSuccess,
}: {
	onSuccess?: () => void;
}) {
	const { t } = useLanguage();

	const attemptId = useGetAttemptIdParams();
	const attemptState = useAppSelector((state) => testDoSlice.selectors.selectAttempt(state, attemptId));
	const dispatch = useAppDispatch();

	const [pendingActionIds, setPendingActionIds] = useState<number[]>([]);

	const [postAnswers, state] = usePostAttemptsByAttemptIdAnswersMutation();
	useActionStateWatch(state, {
		onSuccess: () => {
			dispatch(testDoSlice.actions.submittedAnswersToServer({
				attemptId,
				questionIds: pendingActionIds,
			}));
			onSuccess?.();
		},
		onError: (error) => {
			const message = parseQueryError(error);
			toast.error(t("submit_answers_failed") + ": " + message);
			console.error("Failed to submit answers:", error);
		}
	});

	const handleSubmitAnswers = useCallback(() => {
		let answerQuestionIds: {
			questionId: number;
			answer: AnswerForQuestionTypeSchema | null;
		}[] = [];
		for (const questionId of attemptState.indexedQuestionIds) {
			const question = attemptState.questions[questionId];
			if (question != null && question.isSynced === false) {
				answerQuestionIds.push({
					questionId: questionId,
					answer: question.answer
				});
			}
		}
		if (answerQuestionIds.length > 0) {
			setPendingActionIds(answerQuestionIds.map((item) => item.questionId));
			postAnswers({
				attemptId,
				body: {
					answers: answerQuestionIds.map((answerQuestionId) => {
						if (answerQuestionId.answer?.type === "MCQ") {
							return {
								questionId: answerQuestionId.questionId,
								answer: {
									type: "MCQ",
									chosenOption: answerQuestionId.answer.chosenOption,
								},
							};
						} else if (answerQuestionId.answer?.type === "LONG_ANSWER") {
							return {
								questionId: answerQuestionId.questionId,
								answer: {
									type: "LONG_ANSWER",
									answer: answerQuestionId.answer.answer,
								},
							};
						} else {
							return {
								questionId: answerQuestionId.questionId,
								// answer is omitted (undefined)
							};
						}
					}),
				}
			});
		}
	}, [attemptState, attemptId]);

	return {
		handleSubmitAnswers,
	};
}
