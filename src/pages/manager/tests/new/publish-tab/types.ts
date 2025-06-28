export interface ExamStats {
	totalQuestions: number;
	totalPoints: number;
	averagePoints: string;
	duration: number;
}

export interface StatCardProps {
	value: string | number;
	label: string;
}

export interface ConfigItemProps {
	label: string;
	value: string | number;
	isStatus?: boolean;
	statusType?: 'success' | 'danger' | 'neutral';
}
