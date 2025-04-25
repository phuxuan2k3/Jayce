import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import GradientBorderGood from '../../../../../../components/ui/border/GradientBorder.good';
import paths from '../../../../../../router/paths';
import CardTemplate from '../../../components/PrimaryCardTemplate';
import { Avatar } from '@mui/material';

type AttemptCardProps = {
	id: number;
	score: number;
	totalScore: number;
	secondsSpent: number;
	startDate: string;
	test: {
		title: string;
	};
	testDetail: {
		createdAt: string;
	};
	author: {
		company: string;
		avatar: string;
	};
};

const AttemptCard: React.FC<AttemptCardProps> = (props) => {
	const navigate = useNavigate();

	const handleOnAttemptClick = () => {
		navigate(paths.candidate.tests.attempts.in(props.id).ROOT);
	};

	return (
		<CardTemplate
			handleOnCardClick={handleOnAttemptClick}>
			<div className="flex flex-row items-center gap-3 mb-3 h-fit">
				<Avatar src={props.author.avatar} alt={props.author.company} />
				<div className="flex flex-col h-fit">
					<div className="flex items-center text-sm text-blue-chill-500 mb-0">
						<span className="font-semibold">Asked at {props.author.company}</span>
						<span className="mx-2">&#8226;</span>
						<span className="">{formatDistanceToNow(new Date(props.testDetail.createdAt))}</span>
					</div>
					<h3 className="text-lg font-semibold text-gray-800 my-0">
						{props.test.title}
					</h3>
				</div>
			</div>

			<hr className="my-4 border-blue-chill-300" />

			<div className='flex flex-col gap-2 text-primary-toned-700'>
				<div className="text-primary font-bold flex items-center gap-2">
					<div>Your performance</div>
					<GradientBorderGood>
						<span className="font-semibold">
							{props.score} / {props.totalScore}
						</span>
					</GradientBorderGood>
				</div>

				<div className="flex flex-row items-center gap-2">
					<div>Time spent:</div>
					<div className='font-bold'>
						{`${Math.floor(props.secondsSpent / 60)}m ${props.secondsSpent % 60}s`}
					</div>
				</div>
				<div className="flex flex-row items-center gap-2">
					<div>Started at:</div>
					<div className='font-bold'>
						{`${format(new Date(props.startDate), "PPp")}`}
					</div>
				</div>
			</div>
		</CardTemplate>
	);
};

export default AttemptCard;