import { useState } from "react";
import StepDone from "./step-done";
import LoadingDialog from "./components/LoadingDialog";
import ErrorDialog from "./components/ErrorDialog";
import { parseQueryError } from "../../../../../helpers/fetchBaseQuery.error";
import MainStep from "./MainStep";
import { useLazyGetGenerateExamQuestionsQuery } from "../apis/exam-generation.api";
import { transformAllStepDataToGenerateArgs, transformExamPersistToAllStepData, transformGenerateResponseToQuestionsPersistCore } from "../common/transform";
import { QuestionPersistCoreSchema } from "../../../../../infra-test/ui-items/question/types";
import { ExamPersistCore } from "../../../../../infra-test/ui-items/test/types";
import { AllStepData } from "../common/types";

export default function BuilderWizzardTab({
	initialExam,
	onBulkAddQuestions,
	onReplaceQuestions,
	onGenerationDisposal,
}: {
	initialExam: ExamPersistCore;
	onBulkAddQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	onReplaceQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	onGenerationDisposal: () => void;
}) {
	const [mainData, setMainData] = useState<AllStepData>(transformExamPersistToAllStepData(initialExam));

	const [generate, { isLoading, error, data }] = useLazyGetGenerateExamQuestionsQuery();

	return (
		<>
			{isLoading && (
				<LoadingDialog />
			)}

			{error && (
				<ErrorDialog
					error={parseQueryError(error) || "An error occurred while generating exam questions."}
					onRetry={() => {
						generate(transformAllStepDataToGenerateArgs(mainData));
					}}
				/>
			)}
			{data != null ? (
				<StepDone
					questions={transformGenerateResponseToQuestionsPersistCore(data)}
					onRegenerateQuestions={() => {
						generate(transformAllStepDataToGenerateArgs(mainData));
					}}
					onReplaceQuestions={onReplaceQuestions}
					onAppendQuestions={onBulkAddQuestions}
					onGenerationDisposal={onGenerationDisposal}
				/>
			) : (
				<MainStep
					initialData={mainData}
					onDataConfirm={(data) => {
						setMainData(data);
						generate(transformAllStepDataToGenerateArgs(data));
					}}
				/>
			)}
		</>
	);
}

