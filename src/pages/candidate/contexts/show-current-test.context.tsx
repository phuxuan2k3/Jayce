import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShowCurrentTestContextProps {
	showCurrentTest: boolean;
	setShowCurrentTest: (value: boolean) => void;
}

const ShowCurrentTestContext = createContext<ShowCurrentTestContextProps | undefined>(undefined);

export const ShowCurrentTestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [showCurrentTest, setShowCurrentTest] = useState(false);

	return (
		<ShowCurrentTestContext.Provider value={{ showCurrentTest, setShowCurrentTest }}>
			{children}
		</ShowCurrentTestContext.Provider>
	);
};

export const useShowCurrentTest = (): ShowCurrentTestContextProps => {
	const context = useContext(ShowCurrentTestContext);
	if (!context) {
		throw new Error('useShowCurrentTest must be used within a ShowCurrentTestProvider');
	}
	return context;
};