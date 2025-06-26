import { useCallback, useEffect, useMemo } from "react";
import { ExamConfigPersist } from "../../../../../infra-test/commands/exam.persist";
import { ExamGenerationAction } from "../models/exam-generation.reducer";
import { ExamGenerationModel, ExamGenerationState } from "../models/exam-generation.model";
import useExamQuestionsGeneration from "../hooks/useExamQuestionsGeneration";
import StepDone from "./step-done";
import LoadingDialog from "./components/LoadingDialog";
import ErrorDialog from "./components/ErrorDialog";
import { QuestionPersistOfTest } from "../../../../../infra-test/commands/question.persist";
import { parseQueryError } from "../../../../../helpers/fetchBaseQuery.error";
import MainStep from "./MainStep";

export default function BuilderWizzardTab({
	examInitialConfig,
	onBulkAddQuestions,
	onReplaceQuestions,
	onGenerationDisposal,
	examGeneration,
	state,
	dispatch,
}: {
	examInitialConfig: ExamConfigPersist;
	onBulkAddQuestions: (questions: QuestionPersistOfTest[]) => void;
	onReplaceQuestions: (questions: QuestionPersistOfTest[]) => void;
	onGenerationDisposal: () => void;
	examGeneration: ReturnType<typeof useExamQuestionsGeneration>;
	state: ExamGenerationState;
	dispatch: React.Dispatch<ExamGenerationAction>;
}) {
	useEffect(() => {
		dispatch({
			type: 'SET_STEP1',
			payload: {
				...state.step1,
				title: examInitialConfig.title,
				description: examInitialConfig.description,
			},
		});
	}, [examInitialConfig]);

	const model = useMemo(() => ExamGenerationModel(state), [state]);
	const stepInfo = model.getStepInfo();

	const { generateExamQuestions, state: { data, isLoading, error } } = examGeneration;

	const handleGenerateExamQuestions = useCallback(() => {
		generateExamQuestions(state);
	}, [state]);


	return (
		<div>
			{isLoading && (
				<LoadingDialog />
			)}

			{error && (
				<ErrorDialog
					error={parseQueryError(error) || "An error occurred while generating exam questions."}
					onRetry={handleGenerateExamQuestions}
				/>
			)}

			{data != null ? (
				<StepDone
					questions={data}
					onRegenerateQuestions={handleGenerateExamQuestions}
					onReplaceQuestions={onReplaceQuestions}
					onAppendQuestions={onBulkAddQuestions}
					onGenerationDisposal={onGenerationDisposal}
				/>
			) : (
				<MainStep
					onDataConfirm={onReplaceQuestions}
				/>
			)}
		</div>
	);
}

