import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type TestMinimal = {
	id: string;
	title: string;
};

interface Props {
	test: TestMinimal | null;
	setTest: (test: TestMinimal | null) => void;
}

const DeleteTestModalContext = createContext<Props | undefined>(undefined);

export const useDeleteTestModalContext = () => {
	const context = useContext(DeleteTestModalContext);
	if (!context) {
		throw new Error('useDeleteTest must be used within a DeleteTestProvider');
	}
	return context;
};

export const DeleteTestModalProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [test, _setTest] = useState<TestMinimal | null>(null);
	const setTest = useCallback((test: TestMinimal | null) => {
		_setTest(test);
	}, []);

	return (
		<DeleteTestModalContext.Provider value={{ test, setTest }}>
			{children}
		</DeleteTestModalContext.Provider>
	);
};