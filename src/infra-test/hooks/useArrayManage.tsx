import React from 'react'

export default function useArrayManage<T>({
	array,
	setArray,
}: {
	array: T[],
	setArray: (value: T[]) => void;
}) {
	const add = React.useCallback((value: T) => {
		const newArray = [...array, value];
		setArray(newArray);
	}, [setArray]);

	const update = React.useCallback((index: number, value: Partial<T>) => {
		const newArray = [...array];
		newArray[index] = { ...newArray[index], ...value };
		setArray(newArray);
	}, [setArray]);

	const remove = React.useCallback((index: number) => {
		const newArray = array.filter((_, i) => i !== index);
		setArray(newArray);
	}, [setArray]);

	return {
		add,
		update,
		remove,
	};
}
