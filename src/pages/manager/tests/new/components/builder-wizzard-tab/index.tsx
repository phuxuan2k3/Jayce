import { useCallback, useEffect, useMemo } from "react";
import { ExamConfigPersist } from "../../../../../../infra-test/commands/exam.persist";
import StepsBar from "./components/StepsBar";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import ErrorMessages from "./components/ErrorMessage";
import Header from "./components/Header";
import { ExamGenerationAction } from "../../models/exam-generation.reducer";
import { ExamGenerationModel, ExamGenerationState } from "../../models/exam-generation.model";
import useExamQuestionsGeneration from "../../hooks/useExamQuestionsGeneration";
import StepDone from "./step-done";
import LoadingDialog from "./components/LoadingDialog";
import ErrorDialog from "./components/ErrorDialog";
import { QuestionPersistOfTest } from "../../../../../../infra-test/commands/question.persist";
import { parseQueryError } from "../../../../../../helpers/fetchBaseQuery.error";
import { StepInfoKey } from "../../common/step-info";

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

	const stepSwitcher = useCallback((step: StepInfoKey) => {
		switch (step) {
			case 1:
				return <Step1
					step1Data={state.step1}
					onStep1DataChange={(data) => dispatch({
						type: 'SET_STEP1',
						payload: data,
					})}
				/>;
			case 2:
				return <Step2
					step2Data={state.step2}
					onStep2DataChange={(data) => dispatch({
						type: 'SET_STEP2',
						payload: data,
					})}
				/>; case 3:
				return <Step3
					step3Data={state.step3}
					onStep3DataChange={(data) => dispatch({
						type: 'SET_STEP3',
						payload: data,
					})}
				/>;
			case 4:
				return <Step4
					state={state}
					onConfirm={handleGenerateExamQuestions}
				/>;
			default:
				return <div>Invalid Step</div>;
		}
	}, [state.step1, state.step2, state.step3]);

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
				<div className="flex flex-col gap-4">
					<StepsBar
						step={state.step}
						onStepChange={(step) => dispatch({
							type: 'SET_STEP',
							payload: step,
						})}
					/>

					<div className="border-b border-primary-toned-300 w-full" />

					<div className="flex flex-col gap-2 p-4">
						<Header
							title={stepInfo.title}
							description={stepInfo.description}
						/>

						<ErrorMessages
							errorMessages={state.errorMessages}
						/>
					</div>

					<div className="border-b border-primary-toned-300 w-full" />
					{stepSwitcher(state.step)}
				</div>
			)}
		</div>
	);
}

