import React, { createContext, useContext, ReactNode } from 'react';

interface PracticeContextType {
	// Add your context data types here when needed
}

// Create context with default empty value
const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

interface PracticeProviderProps {
	children: ReactNode;
}

export const PracticeProvider: React.FC<PracticeProviderProps> = ({ children }) => {
	// Add your state and logic here when needed


	const value = {
		// Add your context values here when needed
	};

	return (
		<PracticeContext.Provider value={value as PracticeContextType}>
			{children}
		</PracticeContext.Provider>
	);
};

export const usePracticeContext = (): PracticeContextType => {
	const context = useContext(PracticeContext);

	if (context === undefined) {
		throw new Error('usePracticeContext must be used within a PracticeProvider');
	}

	return context;
};