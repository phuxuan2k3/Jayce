import { useState } from "react";
import StepDone from "./step-done";
import BuilderWizzardTabMain from "./main";
import { useLazyGetGenerateExamQuestionsQuery } from "../apis/exam-generation.api";
import { transformAllStepDataToGenerateArgs, transformExamPersistToAllStepData, transformGenerateResponseToQuestionsPersistCore } from "../common/transform";
import { AllStepData } from "../common/types";
import { QuestionPersistCoreSchema } from "../../../../../features/tests/ui-items/question/types";
import { ExamPersistCoreSchema } from "../../../../../features/tests/ui-items/test/types";
import ErrorDialog from "../../../../../features/tests/ui/fetch-states/ErrorDialog";
import LoadingDialog from "../../../../../features/tests/ui/fetch-states/LoadingDialog";

export default function BuilderWizzardTab({
	initialExam,
	onBulkAddQuestions,
	onReplaceQuestions,
	onGenerationDisposal,
}: {
	initialExam: ExamPersistCoreSchema;
	onBulkAddQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	onReplaceQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	onGenerationDisposal: () => void;
}) {
	const [mainData, setMainData] = useState<AllStepData>(transformExamPersistToAllStepData(initialExam));

	const [generate, { isLoading, error, data }] = useLazyGetGenerateExamQuestionsQuery();

	return (
		<>
			{isLoading && <LoadingDialog />}
			{error && <ErrorDialog error={error} />}

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
				<BuilderWizzardTabMain
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

