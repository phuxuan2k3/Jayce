import { ExamPersistState } from "../../../../../../infra-test/reducers/exam-persist.store";

export interface PublishTabProps {
	examPersistState: ExamPersistState;
	onPublish: () => void;
}

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

export interface QuestionItemProps {
	question: any;
	index: number;
}
