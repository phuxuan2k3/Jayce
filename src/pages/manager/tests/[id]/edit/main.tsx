import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import paths from "../../../../../router/paths";
import { EditTabs } from "./page";
import Sidebar from "./components/Sidebar";
import { usePutTestsByTestIdMutation, testApiGenV2, useDeleteTestsByTestIdMutation } from "../../../../../features/tests/api/test.api-gen-v2";
import useActionStateWatch from "../../../../../features/tests/hooks/useActionStateWatch";
import useArrayManage from "../../../../../features/tests/hooks/useArrayManage";
import useDraftValue from "../../../../../features/tests/hooks/useDraftValue";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import useZodParseLazy from "../../../../../features/tests/hooks/useZodParseLazy";
import { ExamPersistCoreSchema } from "../../../../../features/tests/ui-items/test/types";
import ExamPersistValidationErrorsDialog from "../../../../../features/tests/ui-shared/test-persist-pages/ExamPersistValidationErrorsDialog";
import { ExamPersistZodSchema } from "../../../../../features/tests/schemas/exam-persist-zod";
import RightLayoutTemplate from "../../../../../components/layouts/RightLayoutTemplate";
import ConfigTab from "./components/config-tab";
import QuestionsConfigTab from "./components/questions-config-tab";
import EditExamDialog from "./components/EditExamDialog";
import DeleteExamDialog from "./components/DeleteExamDialog";
import ErrorDialog from "../../../../../features/tests/ui/fetch-states/ErrorDialog";

export default function ManagerTestEditMain({
	data,
	hasAttempts,
}: {
	data: ExamPersistCoreSchema;
	hasAttempts: boolean;
}) {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();

	const [tab, setTab] = useState<EditTabs>("info");
	const [showEditDialog, setShowEditDialog] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [editData, setEditData] = useState<ExamPersistCoreSchema>(data);

	const { errors, handleParse, clearErrors } = useZodParseLazy(ExamPersistZodSchema);

	const {
		draftValue,
		setDraftValue,
		confirmDraft,
	} = useDraftValue({
		value: data,
		onValueConfirm: (value) => {
			const parsed = handleParse(value);
			if (!parsed) {
				toast.error("Validation failed. Please fix the errors.");
				return;
			}
			setEditData(parsed);
			setShowEditDialog(true);
		}
	});

	const { add, remove, update, } = useArrayManage({
		array: draftValue.questions,
		setArray: (newQuestions) => {
			setDraftValue((prev) => ({
				...prev,
				questions: newQuestions,
			}));
		},
	});

	const [updateTest, updateState] = usePutTestsByTestIdMutation();
	useActionStateWatch(updateState, {
		onSuccess: () => {
			toast.success("Test updated successfully");
			testApiGenV2.util.invalidateTags(["Tests"]);
			setShowEditDialog(false);
			navigate(paths.manager.tests.in(testId).ROOT);
		},
	});

	const [deleteTest, deleteState] = useDeleteTestsByTestIdMutation();
	useActionStateWatch(deleteState, {
		onSuccess: () => {
			toast.success("Test deleted successfully");
			testApiGenV2.util.invalidateTags(["Tests"]);
			navigate(paths.manager.tests.ROOT);
		},
	});

	const apiError = deleteState.error || updateState.error;

	const getTabComponent = useCallback(() => {
		switch (tab) {
			case "info":
				return <ConfigTab
					initialValue={data}
					examPersist={draftValue}
					onExamPersistChange={(configEdit) => {
						setDraftValue((prev) => ({
							...prev,
							...configEdit,
						}));
					}}
				/>;
			case "questions":
				return <QuestionsConfigTab
					questions={draftValue.questions}
					onQuestionDelete={(questionId) => remove(questionId)}
					onQuuestionAdd={(question) => add(question)}
					onQuestionUpdate={(questionId, question) => update(questionId, question)}
				/>;
			default:
				return null;
		}
	}, [tab, draftValue, add, remove, update, setDraftValue]);

	return (
		<RightLayoutTemplate
			header={
				<RightLayoutTemplate.Header
					title={draftValue.title || "Edit Test"}
					description="Edit the test configuration and questions."
				/>
			}
			right={
				<Sidebar
					onModeChange={(tab) => setTab(tab)}
					tab={tab}
					onSave={() => confirmDraft()}
					onDelete={() => setShowDeleteDialog(true)}
					hasAttempts={hasAttempts}
				/>
			}
		>
			{getTabComponent()}

			{errors != null && (
				<ExamPersistValidationErrorsDialog
					errors={errors}
					onClose={() => clearErrors()}
					onConfigEdit={() => {
						clearErrors();
						setTab("info");
					}}
					onQuestionsEdit={() => {
						clearErrors();
						setTab("questions");
					}}
				/>
			)}

			{showEditDialog && (
				<EditExamDialog
					isLoading={updateState.isLoading}
					onCancel={() => setShowEditDialog(false)}
					onConfirm={() => updateTest({
						testId,
						body: editData,
					})}
				/>
			)}

			{showDeleteDialog && (
				<DeleteExamDialog
					isLoading={deleteState.isLoading}
					onCancel={() => setShowDeleteDialog(false)}
					onConfirm={() => deleteTest({
						testId,
					})}
				/>
			)}

			{apiError && (
				<ErrorDialog error={apiError} />
			)}

		</RightLayoutTemplate>
	);
}
