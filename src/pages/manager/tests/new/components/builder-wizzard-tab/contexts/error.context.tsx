import { createContext, useContext } from 'react';

type ErrorContextProps = {
	errorMessages: string[];
	onErrorMessageAdd: (message: string) => void;
	onErrorMessageReset: () => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export function ErrorContextProvider({
	children,
	errorMessages,
	setErrorMessages,
}: {
	children: React.ReactNode;
	errorMessages: string[];
	setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>;
}) {
	const onErrorMessageAdd = (message: string) => {
		setErrorMessages(prev => [...prev, message]);
	};

	const onErrorMessageReset = () => {
		setErrorMessages([]);
	}

	return (
		<ErrorContext.Provider value={{ errorMessages, onErrorMessageAdd, onErrorMessageReset }}>
			{children}
		</ErrorContext.Provider>
	);

}

export const useErrorContext = () => {
	const context = useContext(ErrorContext);
	if (!context) {
		throw new Error('useErrorContext must be used within an ErrorContextProvider');
	}
	return context;
}