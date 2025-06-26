import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import { QuestionPersistCoreSchema } from '../types';
import { QuestionDetailCommonSchema } from '../../../api/test.api-gen-v2';
import MCQPersistDetail from './MCQPersistDetail';
import LongAnswerPersistDetail from './LongAnswerPersistDetail';

// Type aliases for question details
export type MCQDetail = Extract<QuestionDetailCommonSchema, { type: 'MCQ' }>;
export type LongAnswerDetail = Extract<QuestionDetailCommonSchema, { type: 'LONG_ANSWER' }>;

export default function QuestionPersistCard({
	index,
	question,
	onQuestionChange,
	onDeleteQuestion,
}: {
	index?: number;
	question: QuestionPersistCoreSchema;
	onQuestionChange: (edit: Partial<QuestionPersistCoreSchema>) => void;
	onDeleteQuestion: () => void;
}) {
	// Store details for both types, now type-safe
	const [mcqDetail, setMcqDetail] = useState<MCQDetail>(() =>
		question.detail.type === 'MCQ'
			? question.detail
			: { type: 'MCQ', options: ['', ''], correctOption: null }
	);
	const [longDetail, setLongDetail] = useState<LongAnswerDetail>(() =>
		question.detail.type === 'LONG_ANSWER'
			? question.detail
			: { type: 'LONG_ANSWER', correctAnswer: '', extraText: '', imageLinks: [] }
	);

	// When question.detail changes from parent, update local state
	useEffect(() => {
		if (question.detail.type === 'MCQ') {
			setMcqDetail(question.detail as MCQDetail);
		} else if (question.detail.type === 'LONG_ANSWER') {
			setLongDetail(question.detail as LongAnswerDetail);
		}
	}, [question.detail]);

	// Handle type switch
	const handleTypeChange = (type: 'MCQ' | 'LONG_ANSWER') => {
		if (type === question.detail.type) return;
		if (type === 'MCQ') {
			onQuestionChange({ detail: mcqDetail });
		} else {
			onQuestionChange({ detail: longDetail });
		}
	};

	// Handle detail change for current type and save to local state
	const handleDetailChange = (edit: Partial<QuestionDetailCommonSchema>) => {
		if (question.detail.type === 'MCQ') {
			const newDetail: MCQDetail = {
				...mcqDetail,
				...edit,
				type: 'MCQ', // ensure type is correct
			};
			setMcqDetail(newDetail);
			onQuestionChange({ detail: newDetail });
		} else if (question.detail.type === 'LONG_ANSWER') {
			const newDetail: LongAnswerDetail = {
				...longDetail,
				...edit,
				type: 'LONG_ANSWER', // ensure type is correct
			};
			setLongDetail(newDetail);
			onQuestionChange({ detail: newDetail });
		}
	};

	return (
		<QuestionPersistLayout>
			<QuestionPersistHeader
				index={index}
				points={question.points}
				text={question.text}
				questionType={question.detail.type}
				onQuestionChange={onQuestionChange}
				onDeleteQuestion={onDeleteQuestion}
				onTypeChange={handleTypeChange}
			/>
			{question.detail.type === 'MCQ' && (
				<MCQPersistDetail
					detail={question.detail}
					questionId={question.id}
					onQuestionChange={handleDetailChange}
				/>
			)}
			{question.detail.type === 'LONG_ANSWER' && (
				<LongAnswerPersistDetail
					detail={question.detail}
					onQuestionChange={handleDetailChange}
				/>
			)}
		</QuestionPersistLayout>
	);
}

function QuestionPersistLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full flex flex-col gap-4 rounded-lg border border-primary px-8 py-6 text-primary bg-white shadow-md">
			{children}
		</div>
	);
}

function QuestionPersistHeader({
	index,
	points,
	text,
	onQuestionChange,
	onDeleteQuestion,
	questionType,
	onTypeChange,
}: {
	index?: number;
	points: number;
	text: string;
	onQuestionChange: (edit: Partial<any>) => void;
	onDeleteQuestion: () => void;
	questionType: 'MCQ' | 'LONG_ANSWER';
	onTypeChange?: (type: 'MCQ' | 'LONG_ANSWER') => void;
}) {
	return (
		<div className="flex items-start gap-4 w-full">
			{/* Left Info Section */}
			<div className="w-fit flex flex-col gap-4 items-start justify-center">
				<div className='flex flex-wrap items-center gap-2 w-full'>
					<span className="text-sm text-primary-toned-500">Points:</span>
					<input
						className="border border-primary rounded-lg font-semibold px-2 py-1 text-primary focus:outline-none w-[50px]"
						type="number"
						value={points}
						min="0"
						step="1"
						onChange={(e) => onQuestionChange({ points: Number(e.target.value) || 0 })}
					/>
				</div>
				{/* Type Switcher */}
				<div className="flex gap-2 mt-2">
					<button
						type="button"
						className={`px-2 py-1 rounded text-xs font-semibold border ${questionType === 'MCQ' ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary-toned-300'}`}
						onClick={() => onTypeChange && onTypeChange('MCQ')}
					>
						MCQ
					</button>
					<button
						type="button"
						className={`px-2 py-1 rounded text-xs font-semibold border ${questionType === 'LONG_ANSWER' ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-primary-toned-300'}`}
						onClick={() => onTypeChange && onTypeChange('LONG_ANSWER')}
					>
						Long Answer
					</button>
				</div>
			</div>
			{/* Center Content Section */}
			<div className="flex-1 flex flex-col gap-2">
				{/* Question */}
				<div className="w-11/12 mb-4 flex items-center border border-primary rounded-lg font-bold text-gray-600 bg-gray-50">
					{typeof index === 'number' && (
						<span className="pl-3 pr-2 text-primary-toned-600 whitespace-nowrap">Question {index + 1}.</span>
					)}
					<TextareaAutosize
						value={text}
						onChange={(e) => onQuestionChange({ text: e.target.value })}
						className="w-full bg-transparent border-none outline-none resize-none overflow-hidden px-4 py-1"
						placeholder="Question text"
						minRows={1}
					/>
				</div>
			</div>
			{/* Right Delete Section */}
			<div className="w-fit h-fit flex justify-center items-center">
				<FontAwesomeIcon
					className="w-5 h-5 cursor-pointer text-red-500 mt-2"
					icon={faTrashCan}
					onClick={() => onDeleteQuestion()}
				/>
			</div>
		</div>
	);
}
