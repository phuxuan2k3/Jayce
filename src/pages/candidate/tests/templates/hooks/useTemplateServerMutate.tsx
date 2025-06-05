import { useCallback, useEffect, useState } from "react";
import { useDeleteTemplatesByTemplateIdMutation, usePostTemplatesMutation, usePutTemplatesByTemplateIdMutation } from "../apis/template.api-enhance";
import { useAppSelector } from "../../../../../app/hooks";
import { authSelectors } from "../../../../../features/auth/store/authSlice";
import { TemplateCore } from "../../../../../infra-test/core/test.model";

type MutationState = {
	isLoading: boolean;
	isSuccess: boolean;
	error: any;
};

export default function useTemplateServerMutate() {
	const userId = useAppSelector(authSelectors.selectUserId);
	const [mutationState, setMutationState] = useState<MutationState>({
		isLoading: false,
		isSuccess: false,
		error: null,
	});
	const [_createTemplate, createState] = usePostTemplatesMutation();
	const [_editTemplate, editState] = usePutTemplatesByTemplateIdMutation();
	const [deleteTemplate, deleteState] = useDeleteTemplatesByTemplateIdMutation();

	useEffect(() => {
		setMutationState({
			isLoading: createState.isLoading || editState.isLoading || deleteState.isLoading,
			isSuccess: createState.isSuccess || editState.isSuccess || deleteState.isSuccess,
			error: createState.error || editState.error || deleteState.error,
		});
	}, [createState, editState, deleteState]);

	useEffect(() => {
		if (mutationState.isSuccess) {
		}
	}, [mutationState.isSuccess]);

	const createTemplate = useCallback((template: Omit<TemplateCore, "id">) => {
		if (!userId) return;
		_createTemplate({
			body: {
				...template,
			}
		});
	}, [userId, _createTemplate]);

	const editTemplate = useCallback((template: TemplateCore) => {
		if (!userId) return;
		editTemplate({
			...template,
		});
	}, [userId, _editTemplate]);

	return {
		mutationState,
		createTemplate,
		editTemplate,
		deleteTemplate,
	};
}