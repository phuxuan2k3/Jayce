import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../../router/paths';
import TestTimer from '../../../../../../features/tests/ui/TestTimer';
import { ClipboardPen } from "lucide-react";

export type AttemptCardInProgressProps = {
	currentAttempt: {
		id: number;
		secondsLeft: number;
		createdAt: string;
	};
	test: {
		id: number
		title: string;
	};
}

const AttemptCardInProgress: React.FC<AttemptCardInProgressProps> = ({
	test,
	currentAttempt,
}) => {
	const navigate = useNavigate();
	const handleOnInProgressAttemptClick = () => {
		navigate(paths.candidate.tests.in(test.id).DO);
	};
	return (
		<div
			className="bg-white rounded-lg text-secondary-toned-500 shadow-secondary p-6 cursor-pointer"
			onClick={handleOnInProgressAttemptClick}>

			<div className='font-semibold text-xl'>{test.title}</div>

			<hr className="my-4" />

			<div className='flex flex-col'>
				<div className='font-bold flex items-center gap-2 my-2'>
					<span>Current attmpt in progress</span>
					<ClipboardPen size={20} />
				</div>
				<div className="flex items-center gap-2">
					<div>Time left:</div>
					<TestTimer
						timeLeft={currentAttempt.secondsLeft}
					/>
				</div>
				<div className='flex items-center gap-2'>
					{`Started at: ${format(new Date(currentAttempt.createdAt), 'Pp')}`}
				</div>
			</div>
		</div>
	);
};

export default AttemptCardInProgress;