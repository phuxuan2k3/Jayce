import { createContext, useContext } from "react";

type StepContextProps = {
	step: 1 | 2 | 3 | 4;
	setStep: (step: 1 | 2 | 3 | 4) => void;
};

const StepContext = createContext<StepContextProps | undefined>(undefined);

export function StepContextProvider({
	children,
	step,
	setStep,
}: {
	children: React.ReactNode;
	step: 1 | 2 | 3 | 4;
	setStep: (step: 1 | 2 | 3 | 4) => void;
}) {
	return (
		<StepContext.Provider value={{ step, setStep }}>
			{children}
		</StepContext.Provider>
	);
}

export const useStepContext = () => {
	const context = useContext(StepContext);
	if (!context) {
		throw new Error("useStepContext must be used within a StepContextProvider");
	}
	return context;
}
