import { useEffect } from "react";
import StepDone from "./step-done";
import BuilderWizzardTabMain from "./main";
import { useLazyGetGenerateExamQuestionsQuery } from "../apis/exam-generation.api";
import { transformAllStepDataToGenerateArgs } from "../common/transform";
import { AllStepData } from "../common/types";
import { QuestionPersistCoreSchema } from "../../../../../features/tests/ui-items/question/types";
import ErrorDialog from "../../../../../features/tests/ui/fetch-states/ErrorDialog";

export default function BuilderWizzardTab({
	allStepData,
	setAllStepData,
	onBulkAddQuestions,
	onReplaceQuestions,
	onGenerationDisposal,
	generatedQuestions,
	onGeneratedQuestions,
}: {
	allStepData: AllStepData;
	setAllStepData: (data: AllStepData) => void;
	onBulkAddQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	onReplaceQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	onGenerationDisposal: () => void;
	generatedQuestions: QuestionPersistCoreSchema[] | null;
	onGeneratedQuestions: (questions: QuestionPersistCoreSchema[]) => void;
}) {
	const [generate, { isLoading, isFetching, isSuccess, error, data }] = useLazyGetGenerateExamQuestionsQuery({});

	useEffect(() => {
		if (isSuccess === true && data != null && isFetching === false) {
			onGeneratedQuestions(data.questions);
		}
	}, [isSuccess, data, isFetching]);

	return (
		<>
			{error && <ErrorDialog error={error} />}

			{(isLoading || isFetching) ? (
				<div className="flex flex-col items-center justify-center h-full">
					<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
					<p className="mt-4 text-lg text-gray-600">{"Generating questions..."}</p>
				</div>
			) : (generatedQuestions != null ? (
				<StepDone
					questions={generatedQuestions}
					onRegenerateQuestions={() => {
						generate(transformAllStepDataToGenerateArgs(allStepData));
					}}
					onReplaceQuestions={onReplaceQuestions}
					onAppendQuestions={onBulkAddQuestions}
					onGenerationDisposal={onGenerationDisposal}
				/>
			) : (
				<BuilderWizzardTabMain
					stepData={allStepData}
					onStepDataChange={(data) => {
						setAllStepData(data);
					}}
					onGenerationConfirm={() => {
						generate(transformAllStepDataToGenerateArgs(allStepData));
					}}
				/>
			))}
		</>
	);
}

