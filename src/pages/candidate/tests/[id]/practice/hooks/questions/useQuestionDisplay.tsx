import { useState } from "react";

export default function useQuestionDisplay() {
	const [isShowingAnswers, setIsShowingAnswers] = useState(false);
	const [isShowingQuestions, setIsShowingQuestions] = useState(false);

	return {
		isShowingAnswers,
		isShowingQuestions,
	};
}
