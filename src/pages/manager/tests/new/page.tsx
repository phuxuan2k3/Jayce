import { useCallback, useEffect, useState } from "react";
import { AllStepData, CreateTab } from "./common/types";
import { useNavigate } from "react-router-dom";
import { QuestionPersistCoreSchema } from "../../../../features/tests/ui-items/question/types";
import { ExamPersistCoreSchema } from "../../../../features/tests/ui-items/test/types";
import ConfigTab from "../../../../features/tests/ui-shared/test-persist-pages/config-tab";
import ExamPersistValidationErrorsDialog from "../../../../features/tests/ui-shared/test-persist-pages/ExamPersistValidationErrorsDialog";
import paths from "../../../../router/paths";
import BuilderWizzardTab from "./builder-wizzard-tab";
import PublishTab from "./publish-tab";
import QuestionsConfigTab from "../../../../features/tests/ui-shared/test-persist-pages/questions-config-tab";
import Sidebar from "./components/Sidebar";
import { z } from "zod";
import { ExamPersistZodSchema, ExamPersistZodSchemaType } from "../../../../features/tests/schemas/exam-persist-zod";
import RightLayoutTemplate from "../../../../components/layouts/RightLayoutTemplate";
import { transformExamPersistToAllStepData } from "./common/transform";
import MyTabs from "../../../../features/tests/ui/MyTabs";
import useBuilderStepsData from "./builder-wizzard-tab/hooks/useBuilderStepsData";

export default function ManagerTestNewPage() {
	const navigate = useNavigate();
	const [tab, setTab] = useState<CreateTab>("exam");
	const [examTabs, setExamTabs] = useState<"info" | "questions">("info");

	const [zodErrors, setZodErrors] = useState<z.ZodError<ExamPersistZodSchemaType> | undefined>(undefined);

	const [examPersist, setExamPersist] = useState<ExamPersistCoreSchema>({
		title: "",
		description: "",
		language: "English",
		minutesToAnswer: 60,
		mode: "EXAM",
		detail: {
			roomId: "",
			openDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
			closeDate: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
			isAllowedToSeeOtherResults: false,
			isAnswerVisible: false,
			mode: "EXAM",
			isPublic: false,
			numberOfAttemptsAllowed: 1,
			numberOfParticipants: undefined,
			password: undefined,
		},
		questions: [],
	});

	const [generatedQuestions, setGeneratedQuestions] = useState<QuestionPersistCoreSchema[] | null>(null);
	const [allStepData, setAllStepData] = useState<AllStepData>(() => {
		return transformExamPersistToAllStepData(examPersist);
	});

	const builderAllStepData = useBuilderStepsData({
		stepData: allStepData,
		onStepDataChange: (data) => {
			setAllStepData(data);
		},
	});

	useEffect(() => {
		if (tab === "generate" && generatedQuestions === null) {
			setAllStepData(
				transformExamPersistToAllStepData(examPersist, allStepData)
			);
		}
	}, [tab, generatedQuestions, examPersist, allStepData]);

	const handleBulkAddQuestions = useCallback((questions: QuestionPersistCoreSchema[]) => {
		setExamPersist((prev) => ({
			...prev,
			questions: [...prev.questions, ...(questions as ExamPersistCoreSchema["questions"])],
		}));
		setTab("exam");
		setExamTabs("questions");
		setGeneratedQuestions(null);
	}, []);

	const handleReplaceQuestions = useCallback((questions: QuestionPersistCoreSchema[]) => {
		setExamPersist((prev) => ({
			...prev,
			questions: questions as ExamPersistCoreSchema["questions"],
		}));
		setTab("exam");
		setExamTabs("questions");
		setGeneratedQuestions(null);
	}, []);

	const handleRemoveQuestion = useCallback((index: number) => {
		setExamPersist((prev) => ({
			...prev,
			questions: prev.questions.filter((_, i) => i !== index),
		}));
	}, []);

	const handleAddQuestion = useCallback((question: QuestionPersistCoreSchema) => {
		setExamPersist((prev) => ({
			...prev,
			questions: [...prev.questions, question as ExamPersistCoreSchema["questions"][number]],
		}));
	}, []);

	const handleUpdateQuestion = useCallback((index: number, question: Partial<QuestionPersistCoreSchema>) => {
		setExamPersist((prev) => {
			const updatedQuestions = [...prev.questions];
			updatedQuestions[index] = { ...updatedQuestions[index], ...question } as ExamPersistCoreSchema["questions"][number];
			return {
				...prev,
				questions: updatedQuestions,
			};
		});
	}, []);

	const validateExamPersist = useCallback(() => {
		const result = ExamPersistZodSchema.safeParse(examPersist);
		if (!result.success) {
			setZodErrors(result.error);
			return false;
		}
		setZodErrors(undefined);
		setAllStepData(transformExamPersistToAllStepData(result.data));
		setExamPersist(result.data);
		return true;
	}, [examPersist]);

	return (
		<RightLayoutTemplate
			header={
				<RightLayoutTemplate.Header
					title="Create Exam"
					description="Configure your exam settings and questions."
					backButton={
						<RightLayoutTemplate.BackButton
							onClick={() => navigate(paths.manager.tests.ROOT)}
						/>
					}
				/>
			}
			right={
				<Sidebar
					builderStep={builderAllStepData.step}
					tab={tab}
					onTabChange={(newTab) => {
						if (newTab === "publish") {
							if (validateExamPersist() === true) {
								setTab(newTab);
							}
						} else {
							setTab(newTab);
						}
					}}
				/>
			}
		>
			<style>
				{`
				@keyframes fadeIn {
					0% { opacity: 0; }
					100% { opacity: 1; }
				}
				`}
			</style>

			{/* Exam Tabs */}
			{tab === "exam" && (
				<MyTabs
					tabs={[
						{
							label: "Configuration",
							id: "info",
							content: <ConfigTab
								examPersist={examPersist}
								onExamPersistChange={(patch) => setExamPersist((prev) => ({ ...prev, ...patch }))}
							/>
						},
						{
							label: "Questions",
							id: "questions",
							content: <QuestionsConfigTab
								questions={examPersist.questions}
								onQuestionDelete={(index) => handleRemoveQuestion(index)}
								onQuuestionAdd={(question) => handleAddQuestion(question)}
								onQuestionUpdate={(index, question) => handleUpdateQuestion(index, question)}
							/>
						}
					]}
					activeTabIdInject={examTabs}
				/>
			)}


			{tab === "publish" && (
				<div style={{
					animation: "fadeIn 0.2s ease-in-out",
					animationFillMode: "forwards",
				}}
					className="w-full h-full flex flex-col"
				>
					<PublishTab
						examPersist={examPersist}
					/>
				</div>
			)}

			{tab === "generate" && (
				<div style={{
					animation: "fadeIn 0.2s ease-in-out",
					animationFillMode: "forwards",
				}}
					className="w-full h-full flex flex-col"
				>
					<BuilderWizzardTab
						builderStepData={builderAllStepData}
						allStepData={allStepData}
						onBulkAddQuestions={handleBulkAddQuestions}
						onReplaceQuestions={handleReplaceQuestions}
						onGenerationDisposal={() => {
							setTab("exam");
							setExamTabs("questions");
							setGeneratedQuestions(null);
						}}
						generatedQuestions={generatedQuestions}
						onGeneratedQuestions={(questions) => setGeneratedQuestions(questions)}
					/>
				</div>
			)}

			{zodErrors != undefined && (
				<ExamPersistValidationErrorsDialog
					errors={zodErrors}
					onClose={() => {
						setZodErrors(undefined);
					}}
					onConfigEdit={() => {
						setZodErrors(undefined);
						setTab("exam");
						setExamTabs("info");
					}}
					onQuestionsEdit={() => {
						setZodErrors(undefined);
						setTab("exam");
						setExamTabs("questions");
					}}
				/>
			)}
		</RightLayoutTemplate>
	);
}

