import React, { createContext, useContext, useState, ReactNode } from 'react';

type TestCreateTabContextType = {
	activeTab: number;
	setActiveTab: (tab: number) => void;
};

const TestCreateTabContext = createContext<TestCreateTabContextType | undefined>(undefined);

interface TestCreateTabProviderProps {
	children: ReactNode;
}

export const TestCreateTabProvider: React.FC<TestCreateTabProviderProps> = ({ children }) => {
	const [activeTab, setActiveTab] = useState<number>(0);
	return (
		<TestCreateTabContext.Provider
			value={{
				activeTab,
				setActiveTab,
			}}
		>
			{children}
		</TestCreateTabContext.Provider>
	);
};

export const useTestCreateTab = () => {
	const context = useContext(TestCreateTabContext);
	if (!context) {
		throw new Error('useTestCreateTab must be used within a TestCreateTabProvider');
	}
	return context;
};