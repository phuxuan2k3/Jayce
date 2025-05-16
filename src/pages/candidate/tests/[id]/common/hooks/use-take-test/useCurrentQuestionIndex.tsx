import { useState } from 'react'

export default function useCurrentQuestionIndex(questionsLength: number, initialIndex: number = 0) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(initialIndex);

	const handleCurrentQuestionIndexChange = (index: number) => {
		if (index < 0 || index >= questionsLength) {
			return;
		}
		setCurrentQuestionIndex(index);
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < questionsLength - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	return {
		currentQuestionIndex,
		handleCurrentQuestionIndexChange,
		handleNextQuestion,
		handlePreviousQuestion,
	}
}
