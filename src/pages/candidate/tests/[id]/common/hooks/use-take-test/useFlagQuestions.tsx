import { useState } from "react";

export default function useFlagQuestions() {
	const [flaggedQuestionIds, setFlaggedQuestionIds] = useState<Set<number>>(new Set());

	const handleQuestionFlagToggled = (questionId: number) => {
		setFlaggedQuestionIds((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(questionId)) {
				newSet.delete(questionId);
			} else {
				newSet.add(questionId);
			}
			return newSet;
		});
	};

	const isQuestionFlagged = (questionId: number) => {
		return flaggedQuestionIds.has(questionId);
	};

	return {
		handleQuestionFlagToggled,
		isQuestionFlagged,
	};
}
