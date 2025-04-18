import { createContext, useContext, ReactNode, useReducer } from 'react';
import { initialState, TestAction, TestCreateState, testCreateReducer } from './test.reducer';

interface TestCreateContextType {
	dispatch: React.Dispatch<TestAction>;
	state: TestCreateState;
	fields: Omit<TestCreateState["data"], "questions">;
	questions: TestCreateState["data"]["questions"];
}

const TestCreateContext = createContext<TestCreateContextType | undefined>(undefined);

interface TestCreateProviderProps {
	children: ReactNode;
}

export const TestCreateProvider = ({ children }: TestCreateProviderProps) => {
	const [state, dispatch] = useReducer(testCreateReducer, initialState);
	const { questions, ...fields } = state.data;

	return (
		<TestCreateContext.Provider value={{
			dispatch,
			state,
			fields,
			questions,
		}}>
			{children}
		</TestCreateContext.Provider>
	);
};

// Custom hook to use the context
export const useTestCreate = (): TestCreateContextType => {
	const context = useContext(TestCreateContext);
	if (context === undefined) {
		throw new Error('useTestCreate must be used within a TestCreateProvider');
	}
	return context;
};