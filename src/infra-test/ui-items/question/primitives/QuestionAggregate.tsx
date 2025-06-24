import React from 'react'
import { QuestionContext } from './contexts';
import { TriggerSlider } from '../../../ui/TriggerSlider';
import { QuestionCoreSchema } from '../../../api/test.api-gen-v2';
import { ArrowUpCircleIcon, ChartLine, CopyCheckIcon, PercentCircle, Users } from 'lucide-react';
import { cn } from '../../../../app/cn';

export default function QuestionAggregate() {
	const { question, showAggregate } = QuestionContext.useQuestion();
	if (showAggregate !== true) return null;

	return (
		<TriggerSlider
			trigger={({ onClick, isShow }) => (
				<div className='flex flex-row items-center gap-4'>
					<hr className='border-gray-300 flex-1' />

					<button onClick={onClick} className={cn("flex items-center gap-2 bg-white border border-gray-300 shadow-sm rounded-md px-4 py-1 font-semibold text-sm")} >
						{isShow ? 'Hide Statistics' : 'Show Statistics'}
						<ArrowUpCircleIcon className={cn('w-4 h-4 transition-all duration-300 ease-in-out',
							isShow && "rotate-180"
						)} />
					</button>

					<hr className='border-gray-300 flex-1' />
				</div>
			)}
		>
			<div className='grid grid-cols-2 md:grid-cols-4 p-8 md:gap-12 gap-4'>
				{AggregateList.map((aggregate, index) => (
					<div key={index} className='flex flex-col items-center gap-2 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300'>
						<div className='text-gray-500 text-sm'>{aggregate.label}</div>
						<div className='text-lg font-semibold flex items-center'>
							{aggregate.icon && <span className='mr-2'>{aggregate.icon}</span>}
							{aggregate.value(question)}
						</div>
					</div>
				))}
			</div>
		</TriggerSlider>
	);
}

type AggregateProps = {
	label: string;
	value: (question: QuestionCoreSchema) => string | number;
	icon?: React.ReactNode;
};

const AggregateList: AggregateProps[] = [
	{
		label: 'Average Score',
		value: (question: QuestionCoreSchema) => question._aggregate_test.averageScore.toFixed(2),
		icon: <ChartLine className='w-4 h-4' />,
	},
	{
		label: 'No. Answers',
		value: (question: QuestionCoreSchema) => question._aggregate_test.numberOfAnswers,
		icon: <Users className='w-4 h-4' />,
	},
	{
		label: 'Correct Answers',
		value: (question: QuestionCoreSchema) => question._aggregate_test.numberOfCorrectAnswers,
		icon: <CopyCheckIcon className='w-4 h-4' />,
	},
	{
		label: 'Correct Rate',
		value: (question: QuestionCoreSchema) => {
			const rate = question._aggregate_test.numberOfAnswers > 0
				? (question._aggregate_test.numberOfCorrectAnswers / question._aggregate_test.numberOfAnswers) * 100
				: 0;
			return `${rate.toFixed(2)}%`;
		},
		icon: <PercentCircle className='w-4 h-4' />,
	},
];
