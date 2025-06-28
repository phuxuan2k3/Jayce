import z from 'zod';
import { useCallback } from 'react';
import useZodParseLazy from '../../../../../../features/tests/hooks/useZodParseLazy';
import useDraftValue from '../../../../../../features/tests/hooks/useDraftValue';

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
