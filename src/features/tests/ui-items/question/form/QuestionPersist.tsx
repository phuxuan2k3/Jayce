import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { LongAnswerDetail, MCQDetail, QuestionPersistCoreSchema } from '../types';
import MCQPersistDetail from './MCQPersistDetail';
import LongAnswerPersistDetail from './LongAnswerPersistDetail';
import MyInput from '../../../ui/forms/MyInput';
import MyLabel from '../../../ui/forms/MyLabel';
import MyTextArea from '../../../ui/forms/MyTextArea';
import MyButton from '../../../ui/buttons/MyButton';
import { cn } from '../../../../../app/cn';

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
			: { type: 'MCQ', options: ['', ''], correctOption: 0 }
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
			onQuestionChange({
				type: "MCQ",
				detail: mcqDetail
			});
		} else {
			onQuestionChange({
				type: "LONG_ANSWER",
				detail: longDetail
			});
		}
	};

	// Handle detail change for current type and save to local state
	const handleDetailChange = (edit: Partial<MCQDetail | LongAnswerDetail>) => {
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
				onTypeChange={handleTypeChange}
			/>
			<hr className='border-primary-toned-300' />

			{question.detail.type === 'MCQ' && (
				<MCQPersistDetail
					detail={question.detail}
					questionId={index || -1}
					onQuestionChange={handleDetailChange}
				/>
			)}
			{question.detail.type === 'LONG_ANSWER' && (
				<LongAnswerPersistDetail
					detail={question.detail}
					onQuestionChange={handleDetailChange}
				/>
			)}

			{onDeleteQuestion && (
				<>
					<hr className='border-primary-toned-300' />

					<div className='flex justify-end'>
						<MyButton
							type="button"
							variant="destructive"
							size="small"
							onClick={onDeleteQuestion}
						>
							<FontAwesomeIcon icon={faTrashCan} className="mr-2" />
							Delete Question
						</MyButton>
					</div>
				</>
			)}
		</QuestionPersistLayout>
	);
}

function QuestionPersistLayout({ children, className }: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("w-full flex flex-col gap-4 rounded-lg border border-primary px-8 py-6 text-primary bg-white shadow-md", className)}>
			{children}
		</div>
	);
}

function QuestionPersistHeader({
	index,
	points,
	text,
	onQuestionChange,
	questionType,
	onTypeChange,
}: {
	index?: number;
	points: number;
	text: string;
	onQuestionChange: (edit: Partial<any>) => void;
	questionType: 'MCQ' | 'LONG_ANSWER';
	onTypeChange?: (type: 'MCQ' | 'LONG_ANSWER') => void;
}) {
	// Ensure points is a number and not NaN
	return (
		<div className="flex-1 flex flex-col gap-2">

			{/* Question Index and Points */}
			<div className='flex items-baseline gap-4 w-full'>
				<MyLabel>{`Question ${index || 0 + 1}:`}</MyLabel>
				<div className='flex items-baseline gap-2 flex-shrink-0'>
					<MyInput
						id='points'
						type="number"
						variant={{ size: 'small' }}
						className='w-[100px] font-semibold'
						value={points}
						min="0"
						step="1"
						onChange={(e) => onQuestionChange({ points: Number(e.target.value) || 0 })}
					/>
					<MyLabel htmlFor='points'>Points</MyLabel>
				</div>
			</div>

			{/* Question Text */}
			<MyTextArea
				value={text}
				onChange={(e) => onQuestionChange({ text: e.target.value })}
				placeholder="Question content goes here..."
				minRows={1}
				className='mt-2'
			/>

			{/* Type Switcher */}
			<div className='flex gap-2 items-center mt-2'>
				<MyLabel className='text-sm'>Type:</MyLabel>
				<div className="flex gap-2">
					<MyButton
						type="button"
						variant={questionType === "MCQ" ? "primary" : "outline"}
						size={"small"}
						onClick={() => onTypeChange && onTypeChange('MCQ')}
					>
						MCQ
					</MyButton>
					<MyButton
						type="button"
						variant={questionType === "LONG_ANSWER" ? "primary" : "outline"}
						size={"small"}
						onClick={() => onTypeChange && onTypeChange('LONG_ANSWER')}
					>
						Long Answer
					</MyButton>
				</div>
			</div>
		</div>
	);
}
