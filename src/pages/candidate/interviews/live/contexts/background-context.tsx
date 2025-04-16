import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Backgrounds } from '../types/render';

interface BackgroundContextType {
	setBackground: React.Dispatch<React.SetStateAction<Backgrounds>>;
	background: Backgrounds;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

interface BackgroundProviderProps {
	children: ReactNode;
}

export const BackgroundContextProvider: React.FC<BackgroundProviderProps> = ({
	children,
}) => {
	const [background, setBackground] = useState<Backgrounds>(1);
	return (
		<BackgroundContext.Provider
			value={{
				background,
				setBackground,
			}}
		>
			{children}
		</BackgroundContext.Provider>
	);
};

export const useBackgroundContext = (): BackgroundContextType => {
	const context = useContext(BackgroundContext);
	if (!context) {
		throw new Error('useBackground must be used within a BackgroundProvider');
	}
	return context;
};