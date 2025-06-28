import { MySlider } from '../../../ui/MySlider';
import { ArrowUpCircleIcon, ChartLine, CopyCheckIcon, PercentCircle, Users } from 'lucide-react';
import { cn } from '../../../../app/cn';

export default function QuestionAggregate({
	aggregate,
}: {
	aggregate: {
		averageScore: number;
		numberOfAnswers: number;
		numberOfCorrectAnswers: number;
	};
}) {
	const correctRate = aggregate.numberOfAnswers > 0
		? (aggregate.numberOfCorrectAnswers / aggregate.numberOfAnswers) * 100
		: 0;

	const AggregateList = [
		{
			label: 'Average Score',
			value: aggregate.averageScore.toFixed(2),
			icon: <ChartLine className='w-4 h-4' />,
		},
		{
			label: 'No. Answers',
			value: aggregate.numberOfAnswers,
			icon: <Users className='w-4 h-4' />,
		},
		{
			label: 'Correct Answers',
			value: aggregate.numberOfCorrectAnswers,
			icon: <CopyCheckIcon className='w-4 h-4' />,
		},
		{
			label: 'Correct Rate',
			value: `${correctRate.toFixed(2)}%`,
			icon: <PercentCircle className='w-4 h-4' />,
		},
	];

	return (
		<MySlider
			trigger={({ onClick, isShow }) => (
				<div className='flex flex-row items-center gap-4'>
					<hr className='border-gray-300 flex-1' />
					<button onClick={onClick} className={cn("flex items-center gap-2 bg-white border border-gray-300 shadow-sm rounded-md px-4 py-1 font-semibold text-sm")} >
						{isShow ? 'Hide Statistics' : 'Show Statistics'}
						<ArrowUpCircleIcon className={cn('w-4 h-4 transition-all duration-300 ease-in-out', isShow && "rotate-180")} />
					</button>
					<hr className='border-gray-300 flex-1' />
				</div>
			)}
		>
			<div className='grid grid-cols-2 md:grid-cols-4 p-8 md:gap-12 gap-4'>
				{AggregateList.map((item, index) => (
					<div key={index} className='flex flex-col items-center gap-2 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300'>
						<div className='text-gray-500 text-sm'>{item.label}</div>
						<div className='text-lg font-semibold flex items-center'>
							{item.icon && <span className='mr-2'>{item.icon}</span>}
							{item.value}
						</div>
					</div>
				))}
			</div>
		</MySlider>
	);
}
