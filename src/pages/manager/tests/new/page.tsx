import { useCallback, useEffect, useState } from "react";
import { CreateTab } from "./common/types";
import { useNavigate } from "react-router-dom";
import { usePostTestsMutation } from "../../../../features/tests/api/test.api-gen-v2";
import { QuestionPersistCoreSchema } from "../../../../features/tests/ui-items/question/types";
import { ExamPersistCoreSchema } from "../../../../features/tests/ui-items/test/types";
import ConfigTab from "../../../../features/tests/ui-shared/test-persist-pages/config-tab";
import ExamPersistValidationErrorsDialog from "../../../../features/tests/ui-shared/test-persist-pages/ExamPersistValidationErrorsDialog";
import ErrorDialog from "../../../../features/tests/ui/fetch-states/ErrorDialog";
import LoadingDialog from "../../../../features/tests/ui/fetch-states/LoadingDialog";
import paths from "../../../../router/paths";
import BuilderWizzardTab from "./builder-wizzard-tab";
import PublishTab from "./publish-tab";
import QuestionsConfigTab from "../../../../features/tests/ui-shared/test-persist-pages/questions-config-tab";
import Sidebar from "./components/Sidebar";
import { z } from "zod";
import { ExamPersistZodSchema, ExamPersistZodSchemaType } from "../../../../features/tests/schemas/exam-persist-zod";
import RightLayoutTemplate from "../../../../components/layouts/RightLayoutTemplate";


export default function ManagerTestNewPage() {
	const navigate = useNavigate();
	const [tab, setTab] = useState<CreateTab>("info");
	const [isPostingExam, setIsPostingExam] = useState(false);
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

	const [createTest, createTestState] = usePostTestsMutation();
	useEffect(() => {
		if (createTestState.isSuccess) {
			setIsPostingExam(false);
			const { testId } = createTestState.data;
			navigate(paths.manager.tests.in(testId).ROOT);
		}
	}, [createTestState.isSuccess, createTestState.data, navigate]);

	useEffect(() => {
		if (tab === "publish") {

		}
	}, [tab, examPersist]);

	const handleBulkAddQuestions = useCallback((questions: QuestionPersistCoreSchema[]) => {
		setExamPersist((prev) => ({
			...prev,
			questions: [...prev.questions, ...(questions as ExamPersistCoreSchema["questions"])],
		}));
	}, []);

	const handleReplaceQuestions = useCallback((questions: QuestionPersistCoreSchema[]) => {
		setExamPersist((prev) => ({
			...prev,
			questions: questions as ExamPersistCoreSchema["questions"],
		}));
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

	const getTab = (tab: CreateTab) => {
		switch (tab) {
			case "info":
				return <ConfigTab
					examPersist={examPersist}
					onExamPersistChange={(patch) => setExamPersist((prev) => ({ ...prev, ...patch }))}
				/>;
			case "questions":
				return <QuestionsConfigTab
					questions={examPersist.questions}
					onQuestionDelete={(index) => handleRemoveQuestion(index)}
					onQuuestionAdd={(question) => handleAddQuestion(question)}
					onQuestionUpdate={(index, question) => handleUpdateQuestion(index, question)}
				/>;
			case "generate":
				return <BuilderWizzardTab
					onBulkAddQuestions={handleBulkAddQuestions}
					onReplaceQuestions={handleReplaceQuestions}
					initialExam={examPersist}
					onGenerationDisposal={() => {
						setTab("questions");
					}}
				/>;
			case "publish":
				return <PublishTab
					examPersist={examPersist}
					onPublish={() => {
						setIsPostingExam(true);
						createTest({ body: examPersist });
					}}
				/>
			default:
				return null;
		}
	}

	return (
		<RightLayoutTemplate
			header={
				<RightLayoutTemplate.Header
					title="Create your Exam"
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
					tab={tab}
					onTabChange={(tab) => {
						if (tab === "publish") {
							const result = ExamPersistZodSchema.safeParse(examPersist);
							if (!result.success) {
								setZodErrors(result.error);
								setIsPostingExam(false);
								return;
							}
							setZodErrors(undefined);
						}
						setTab(tab);
					}}
				/>
			}
		>
			{getTab(tab)}

			{zodErrors != undefined && (
				<ExamPersistValidationErrorsDialog
					errors={zodErrors}
					onClose={() => {
						setZodErrors(undefined);
						setIsPostingExam(false);
					}}
					onConfigEdit={() => {
						setZodErrors(undefined);
						setTab("info");
						setIsPostingExam(false);
					}}
					onQuestionsEdit={() => {
						setZodErrors(undefined);
						setTab("questions");
						setIsPostingExam(false);
					}}
				/>
			)}

			{(isPostingExam) && (
				<>
					{createTestState.isLoading && <LoadingDialog />}
					{createTestState.error && <ErrorDialog error={createTestState.error} />}
				</>
			)}
		</RightLayoutTemplate>
	);
}

