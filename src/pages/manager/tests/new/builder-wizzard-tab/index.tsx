import { useEffect } from "react";
import StepDone from "./step-done";
import BuilderWizzardTabMain from "./main";
import { useLazyGetGenerateExamQuestionsQuery } from "../apis/exam-generation.api";
import { transformAllStepDataToGenerateArgs } from "../common/transform";
import { AllStepData } from "../common/types";
import { QuestionPersistCoreSchema } from "../../../../../features/tests/ui-items/question/types";
import ErrorDialog from "../../../../../features/tests/ui/fetch-states/ErrorDialog";
import useBuilderStepsData from "./hooks/useBuilderStepsData";
import { mcqOptionsRemoveOptionalLabel } from "../../../../../helpers/string";
import { useLanguage } from "../../../../../LanguageProvider";

export default function BuilderWizzardTab({
	allStepData,
	onBulkAddQuestions,
	onReplaceQuestions,
	onGenerationDisposal,
	generatedQuestions,
	onGeneratedQuestions,
	builderStepData,
}: {
	allStepData: AllStepData;
	onBulkAddQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	onReplaceQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	onGenerationDisposal: () => void;
	generatedQuestions: QuestionPersistCoreSchema[] | null;
	onGeneratedQuestions: (questions: QuestionPersistCoreSchema[]) => void;
	builderStepData: ReturnType<typeof useBuilderStepsData>;
}) {
	const { t } = useLanguage();

	const [generate, { isLoading, isFetching, isSuccess, error, data }] = useLazyGetGenerateExamQuestionsQuery({});

	useEffect(() => {
		if (isSuccess === true && data != null && isFetching === false) {
			// Preprocess the generated questions
			const processedQuestions = data.questions.map((question) => {
				// Remove optional labels from MCQ options
				if (question.detail.type === "MCQ") {
					const newOptions = question.detail.options.map(option => mcqOptionsRemoveOptionalLabel(option));
					return {
						...question,
						detail: {
							...question.detail,
							options: newOptions,
						},
					};
				}
				return question;
			});

			onGeneratedQuestions(processedQuestions);
		}
	}, [isSuccess, data, isFetching]);

	return (
		<>
			{error && <ErrorDialog error={error} />}

			{(isLoading || isFetching) ? (
				<div className="flex flex-col items-center justify-center h-full w-full">
					<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
					<p className="mt-4 text-lg text-gray-600">{t("builder_generating_questions")}</p>
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
					builderAllStepData={builderStepData}
					onGenerationConfirm={() => {
						generate(transformAllStepDataToGenerateArgs(allStepData));
					}}
				/>
			))}
		</>
	);
}

