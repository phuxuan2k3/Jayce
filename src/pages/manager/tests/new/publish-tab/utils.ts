import { QuestionPersistCoreSchema } from "../../../../../features/tests/ui-items/question/types";

export const formatDateDisplay = (date: Date): string => {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	});
};

export const calculateExamStats = (questions: QuestionPersistCoreSchema[]) => {
	const totalQuestions = questions.length;
	const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
	const averagePoints = totalQuestions > 0 ? (totalPoints / totalQuestions).toFixed(1) : '0';

	return {
		totalQuestions,
		totalPoints,
		averagePoints
	};
};

export const getStatusStyles = (type: 'success' | 'danger' | 'neutral') => {
	const styles = {
		success: 'bg-green-100 text-green-800',
		danger: 'bg-red-100 text-red-800',
		neutral: 'bg-gray-100 text-gray-600'
	};

	return styles[type];
};
