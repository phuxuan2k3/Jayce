import { QuestionCoreSchema, AnswerCoreSchema } from '../../../api/test.api-gen-v2';
import { ReactNode } from 'react';

export type QuestionDisplayMode = 'exam' | 'list' | 'stats' | 'review' | 'manage';

export type QuestionAnswer = {
	answer: AnswerCoreSchema | null;
	isCorrect?: boolean;
	isChosen?: boolean;
};

export interface QuestionContextType {
	question: QuestionCoreSchema;
	answer?: QuestionAnswer;
	mode: QuestionDisplayMode;
	showCorrectAnswer?: boolean;
	onAnswerChange?: (optionIndex: number) => void;
	onToggleFlag?: () => void;
	isFlagged?: boolean;
	questionIndex?: number;
	totalQuestions?: number;
}

export interface QuestionProps {
	question: QuestionCoreSchema;
	answer?: QuestionAnswer;
	mode: QuestionDisplayMode;
	showCorrectAnswer?: boolean;
	onAnswerChange?: (optionIndex: number) => void;
	onToggleFlag?: () => void;
	isFlagged?: boolean;
	questionIndex?: number;
	totalQuestions?: number;
	children: ReactNode;
}
