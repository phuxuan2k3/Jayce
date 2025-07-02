import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LeftLayoutTemplateDefault from "../../../../../components/layouts/LeftLayoutTemplateDefault";
import { parseQueryError } from "../../../../../helpers/fetchBaseQuery.error";
import paths from "../../../../../router/paths";
import { useDeleteTestModalContext } from "../components/delete-test-modal.context";
import { EditTabs } from "./page";
import Sidebar from "./components/Sidebar";
import { usePutTestsByTestIdMutation, testApiGenV2 } from "../../../../../features/tests/api/test.api-gen-v2";
import useActionStateWatch from "../../../../../features/tests/hooks/useActionStateWatch";
import useArrayManage from "../../../../../features/tests/hooks/useArrayManage";
import useDraftValue from "../../../../../features/tests/hooks/useDraftValue";
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import useZodParseLazy from "../../../../../features/tests/hooks/useZodParseLazy";
import { ExamPersistCoreSchema } from "../../../../../features/tests/ui-items/test/types";
import ConfigTab from "../../../../../features/tests/ui-shared/test-persist-pages/config-tab";
import ExamPersistValidationErrorsDialog from "../../../../../features/tests/ui-shared/test-persist-pages/ExamPersistValidationErrorsDialog";
import QuestionsConfigTab from "../../../../../features/tests/ui-shared/test-persist-pages/questions-config-tab";
import { ExamPersistZodSchema } from "../../../../../features/tests/schemas/exam-persist-zod";

export default function ManagerTestEditMain({
	data,
}: {
	data: ExamPersistCoreSchema;
}) {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const [tab, setTab] = useState<EditTabs>("info");

	const { setTest } = useDeleteTestModalContext();
	const { errors, handleParse, clearErrors } = useZodParseLazy(ExamPersistZodSchema);

	const {
		draftValue,
		setDraftValue,
		confirmDraft,
	} = useDraftValue({
		value: data, onValueConfirm: (value) => {
			const parsed = handleParse(value);
			if (!parsed) {
				toast.error("Validation failed. Please fix the errors.");
				return;
			}
			updateTest({
				testId,
				body: parsed,
			});
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
			navigate(paths.manager.tests.in(testId).ROOT);
		},
		onError: (error) => {
			const message = parseQueryError(error);
			toast.error(`Failed to update test: ${message}`);
		},
	});

	const getTabComponent = useCallback(() => {
		switch (tab) {
			case "info":
				return <ConfigTab
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
		<LeftLayoutTemplateDefault
			header={{
				title: data.title,
				description: data.description,
			}}
			left={
				<Sidebar
					onModeChange={(tab) => setTab(tab)}
					tab={tab}
					onSave={() => confirmDraft()}
					onDelete={() => setTest({
						id: testId,
						title: data.title,
					})}
				/>
			}
		>
			<>
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
			</>
		</LeftLayoutTemplateDefault>
	);
}
