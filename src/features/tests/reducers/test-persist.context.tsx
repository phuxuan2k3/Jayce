import { createContext, useContext, ReactNode, useReducer } from 'react';
import { initialState as reducerInitialState, TestPersistAction, TestPersistState, testPersistReducer } from './test-persist.reducer';

interface TestPersistContextType {
	dispatch: React.Dispatch<TestPersistAction>;
	state: TestPersistState;
	fields: Omit<TestPersistState["data"], "questions">;
	questions: TestPersistState["data"]["questions"];
}

const TestPersistContext = createContext<TestPersistContextType | undefined>(undefined);

interface Props {
	children: ReactNode;
	initialState?: TestPersistState;
}

export const TestPersistProvider = ({
	children,
	initialState = reducerInitialState,
}: Props) => {
	const [state, dispatch] = useReducer(testPersistReducer, initialState);
	const { questions, ...fields } = state.data;

	return (
		<TestPersistContext.Provider value={{
			dispatch,
			state,
			fields,
			questions,
		}}>
			{children}
		</TestPersistContext.Provider>
	);
};

// Custom hook to use the context
export const useTestPersistContext = (): TestPersistContextType => {
	const context = useContext(TestPersistContext);
	if (context === undefined) {
		throw new Error('useTestPersistContext must be used within a TestPersistProvider');
	}
	return context;
};