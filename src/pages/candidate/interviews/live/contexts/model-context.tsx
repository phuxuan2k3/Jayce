import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Models } from '../types/render';

interface ModelContextType {
	setModel: React.Dispatch<React.SetStateAction<Models>>;
	model: Models;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

interface ProviderProps {
	children: ReactNode;
}

export const ModelContextProvider: React.FC<ProviderProps> = ({
	children,
}) => {
	const [model, setModel] = useState<Models>("Alice");
	return (
		<ModelContext.Provider
			value={{
				model,
				setModel,
			}}
		>
			{children}
		</ModelContext.Provider>
	);
};

export const useModelContext = (): ModelContextType => {
	const context = useContext(ModelContext);
	if (!context) {
		throw new Error('useModelContext must be in its provider');
	}
	return context;
};