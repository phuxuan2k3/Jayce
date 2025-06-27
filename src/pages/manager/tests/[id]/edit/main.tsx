import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LeftLayoutTemplateDefault from "../../../../../components/layouts/LeftLayoutTemplateDefault";
import { parseQueryError } from "../../../../../helpers/fetchBaseQuery.error";
import { usePutTestsByTestIdMutation, testApiGenV2 } from "../../../../../infra-test/api/test.api-gen-v2";
import useActionStateWatch from "../../../../../infra-test/hooks/useActionStateWatch";
import useArrayManage from "../../../../../infra-test/hooks/useArrayManage";
import useDraftValue from "../../../../../infra-test/hooks/useDraftValue";
import useGetTestIdParams from "../../../../../infra-test/hooks/useGetTestIdParams";
import useZodParseLazy from "../../../../../infra-test/hooks/useZodParseLazy";
import { ExamPersistValidationSchema } from "../../../../../infra-test/ui-items/test/persist-schema";
import { ExamPersistCoreSchema } from "../../../../../infra-test/ui-items/test/types";
import ConfigTab from "../../../../../infra-test/ui-shared/config-tab";
import ExamPersistValidationErrorsDialog from "../../../../../infra-test/ui-shared/ExamPersistValidationErrorsDialog";
import paths from "../../../../../router/paths";
import { useDeleteTestModalContext } from "../components/delete-test-modal.context";
import { EditTabs } from "./page";
import QuestionsTab from "../../../../../infra-test/ui-shared/questions-tab";
import Sidebar from "./components/Sidebar";

export default function ManagerTestEditMain({
	data,
}: {
	data: ExamPersistCoreSchema;
}) {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const [tab, setTab] = useState<EditTabs>("info");

	const { setTest } = useDeleteTestModalContext();
	const { errors, handleParse, clearErrors } = useZodParseLazy(ExamPersistValidationSchema);

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
				return <QuestionsTab
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
