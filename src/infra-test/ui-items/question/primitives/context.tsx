import { createContext, useContext } from 'react';
import { QuestionContextType } from './types';

// Context
export const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

export const useQuestion = () => {
	const context = useContext(QuestionContext);
	if (!context) {
		throw new Error('Question compound components must be used within Question component');
	}
	return context;
};

// Helper functions
export const getOptionState = (
	optionIndex: number,
	chosenOption?: number,
	correctOption?: number,
	showCorrectAnswer = false
) => {
	if (!showCorrectAnswer) return 'neutral';

	const isCorrect = correctOption !== undefined && optionIndex === correctOption;
	const isChosen = chosenOption !== undefined && optionIndex === chosenOption;

	if (isCorrect) return 'correct';
	if (isChosen && !isCorrect) return 'incorrect';
	return 'neutral';
};

export const getAnswerStatusColor = (isAnswered: boolean, isCorrect?: boolean) => {
	if (!isAnswered) return 'bg-gray-100 text-gray-600';
	if (isCorrect) return 'bg-green-100 text-green-700';
	return 'bg-red-100 text-red-700';
};
