import z from 'zod';
import useDraftValue from '../../../../../../infra-test/hooks/useDraftValue';
import useZodParseLazy from '../../../../../../infra-test/hooks/useZodParseLazy';
import { useCallback } from 'react';

/**
 * Generic hook for step draft management and validation
 * @param data - initial step data
 * @param setData - setter for step data
 * @param schema - Zod schema for validation
 */
function useStepDraft<T>({
	data,
	setData,
	schema,
}: {
	data: T;
	setData: (data: T) => void;
	schema: z.ZodType<T>;
}) {
	const {
		draftValue,
		setDraftValue,
		confirmDraft,
	} = useDraftValue({
		value: data,
		onValueConfirm: (value: T) => setData(value),
	});

	const {
		errorMessages,
		handleParse,
	} = useZodParseLazy(schema);

	const isValid = useCallback(() => {
		const parsedData = handleParse(draftValue);
		if (parsedData !== undefined) {
			confirmDraft();
			return true;
		}
		return false;
	}, [draftValue, handleParse, confirmDraft]);

	return {
		draftValue,
		setDraftValue,
		errorMessages,
		isValid,
	};
}

export default useStepDraft;
