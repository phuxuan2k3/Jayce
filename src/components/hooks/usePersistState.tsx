import { useState, useEffect } from 'react';

export default function usePersistState<T>(storageKey: string, initialState: T) {
	const [state, setInternalState] = useState<T>(initialState);
	useEffect(() => {
		const storage = localStorage.getItem(storageKey);
		if (storage) {
			const parsedStorage = JSON.parse(storage) as T;
			if (parsedStorage) {
				setInternalState(parsedStorage);
			}
		}
	}, []);
	const setState = (newState: T) => {
		const stringifiedState = JSON.stringify(newState);
		localStorage.setItem(storageKey, stringifiedState);
		setInternalState(newState);
	};

	return [state, setState];
}
