import { useMemo } from 'react';
import { calculateExamStats } from '../utils';
import { ExamStats } from '../types';

export const useExamStats = (questions: any[], duration: number): ExamStats => {
	return useMemo(() => {
		const stats = calculateExamStats(questions);
		return {
			...stats,
			duration
		};
	}, [questions, duration]);
};
