import { useCallback, useState } from "react";
import { CreateTab } from "./common/types";
import LeftLayoutTemplateDefault from "../../../../components/layouts/LeftLayoutTemplateDefault";
import ConfigTab from "./config-tab";
import Sidebar from "./components/Sidebar";
import QuestionsTab from "./questions-tab";
import PublishTab from "./publish-tab";
import BuilderWizzardTab from "./builder-wizzard-tab";
import LoadingDialog from "./components/LoadingDialog";
import ValidationErrorDialog from "../../../../infra-test/ui/dialogs/ExamValidationDialog";
import ErrorDialog from "./components/ErrorDialog";
import { useNavigate } from "react-router-dom";
import { parseQueryError } from "../../../../helpers/fetchBaseQuery.error";
import { ExamPersistCore } from "../../../../infra-test/ui-items/test/types";
import { QuestionPersistCoreSchema } from "../../../../infra-test/ui-items/question/types";
import { usePostTestsMutation } from "../../../../infra-test/api/test.api-gen-v2";

export default function ManagerTestNewPage() {
	const navigate = useNavigate();
	const [tab, setTab] = useState<CreateTab>("info");
	const [isPostingExam, setIsPostingExam] = useState(false);

	const [examPersist, setExamPersist] = useState<ExamPersistCore>({
		title: "",
		description: "",
		language: "English",
		minutesToAnswer: 60,
		mode: "EXAM",
		detail: {
			roomId: "",
			openDate: null,
			closeDate: null,
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

	const handleBulkAddQuestions = useCallback((questions: QuestionPersistCoreSchema[]) => {
		setExamPersist((prev) => ({
			...prev,
			questions: [...prev.questions, ...(questions as ExamPersistCore["questions"])],
		}));
	}, []);

	const handleReplaceQuestions = useCallback((questions: QuestionPersistCoreSchema[]) => {
		setExamPersist((prev) => ({
			...prev,
			questions: questions as ExamPersistCore["questions"],
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
			questions: [...prev.questions, question as ExamPersistCore["questions"][number]],
		}));
	}, []);

	const handleUpdateQuestion = useCallback((index: number, question: Partial<QuestionPersistCoreSchema>) => {
		setExamPersist((prev) => {
			const updatedQuestions = [...prev.questions];
			updatedQuestions[index] = { ...updatedQuestions[index], ...question } as ExamPersistCore["questions"][number];
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
				return <QuestionsTab
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
					examPersistState={state}
					onPublish={() => handlePostExam()}
				/>
			default:
				return null;
		}
	}

	return (
		<LeftLayoutTemplateDefault
			header={{
				title: "Create your test",
				description: "Configure your test settings and questions.",
			}}
			left={
				<Sidebar
					tab={tab}
					onTabChange={(tab) => {
						setTab(tab);
					}}
				/>
			}
		>
			{getTab(tab)}

			{tab === "publish" && hasValidationError === true && (
				<ValidationErrorDialog
					questionsErrors={validationError.questionsErrors}
					configErrors={validationError.configErrors}
					onClose={() => {
						setIsPostingExam(false);
						setTab("info");
					}}
					onConfigEdit={() => {
						setTab("info");
						setIsPostingExam(false);
					}}
					onQuestionsEdit={() => {
						setTab("questions");
						setIsPostingExam(false);
					}}
				/>
			)}

			{(isPostingExam) && (
				<>
					{postExamState.isLoading && (
						<LoadingDialog />
					)}
					{postExamState.error && (
						<ErrorDialog
							errorMessage={parseQueryError(postExamState.error) || undefined}
							onClose={() => setIsPostingExam(false)}
							onRetry={() => {
								setIsPostingExam(true);
								handlePostExam();
							}}
						/>
					)}
				</>
			)}


		</LeftLayoutTemplateDefault>
	);
}

