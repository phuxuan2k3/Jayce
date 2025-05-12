import { useEffect, useState } from "react";
import { useDeleteTemplatesByTemplateIdMutation, usePostTemplatesMutation, usePutTemplatesMutation } from "../apis/enhance";

type MutationState = {
	isLoading: boolean;
	isSuccess: boolean;
	error: any;
};

export default function useTemplateServerMutate() {
	const [mutationState, setMutationState] = useState<MutationState>({
		isLoading: false,
		isSuccess: false,
		error: null,
	});
	const [createTemplate, createState] = usePostTemplatesMutation();
	const [editTemplate, editState] = usePutTemplatesMutation();
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

	return {
		mutationState,
		createTemplate,
		editTemplate,
		deleteTemplate,
	};
}