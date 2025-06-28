import React from 'react'

/**
 * This hooks is to create a copy of the value passed to it and let you modify it without affecting the original value.
 * When you are done with the modifications, you can call `onValueConfirm` to update the original value.
 */
export default function useDraftValue<T>({
	value,
	onValueConfirm,
}: {
	value: T;
	onValueConfirm: (value: T) => void;
}) {
	const [draftValue, setDraftValue] = React.useState<T>(value);

	// Initialize the draft value with the original value
	// This is useful when the value changes externally, e.g., when the parent component updates
	React.useEffect(() => {
		setDraftValue(value);
	}, [value]);

	const confirmDraft = React.useCallback(() => {
		onValueConfirm(draftValue);
	}, [draftValue, onValueConfirm]);

	return {
		draftValue,
		setDraftValue,
		confirmDraft,
	};
}
