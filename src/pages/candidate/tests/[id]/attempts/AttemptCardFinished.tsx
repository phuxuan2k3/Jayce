import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import GradientBorderGood from '../../../../../components/ui/border/GradientBorder.good';
import paths from '../../../../../router/paths';

type Props = {
	company: {
		name: string;
		imageUrl: string;
	};
	test: {
		id: number
		title: string;
		tags: string[];
		createdAt: string;
	};
	attempt: {
		id: number;
		score: number;
		secondsSpent: number;
		startDate: string;
	}
}

const AttemptCardFinished: React.FC<Props> = ({ company, test, attempt }) => {
	const navigate = useNavigate();

	const handleOnAttemptClick = () => {
		navigate(paths.candidate.tests.attempts.in(attempt.id)._layout);
	};

	return (
		<div key={attempt.id} className="bg-[#EAF6F8] p-4 mb-4 rounded-lg shadow-md cursor-pointer" onClick={handleOnAttemptClick}>
			<div className="flex flex-row border-b border-primary pb-4 items-center gap-3 mb-3 h-fit">
				<img className="w-12 h-12 rounded-full" src={company.imageUrl} alt={company.name} />
				<div className="flex flex-col h-fit">
					<div className="flex items-center text-sm text-blue-chill-500 mb-0">
						<span className="font-semibold">Asked at {company.name}</span>
						<span className="mx-2">&#8226;</span>
						<span className="">{formatDistanceToNow(new Date(test.createdAt))} ago</span>
					</div>
					<h3 className="text-lg font-semibold text-gray-800 my-0">{test.title}</h3>
				</div>
			</div>
			<div className="flex flex-wrap gap-2 mb-4">
				{test.tags.map((tag, index: number) => (
					<GradientBorderGood key={index}>
						{tag}
					</GradientBorderGood>
				))}
			</div>
			<div className="flex flex-row text-xl font-bold mb-2">
				<span className="text-[#39A0AD] whitespace-pre">
					{attempt.score === null ? null : "Your grade for this quiz is: "}
				</span>
				<span className="text-[#2E808A]">
					{attempt.score === null ? null : `${attempt.score}`}
				</span>
			</div>
			<div className="flex flex-row font-semibold mb-2 text-[#39A0AD] items-center">
				<div className="text-lg">
					{`Time spent: ${Math.floor(attempt.secondsSpent / 60)}m ${attempt.secondsSpent % 60}s`}
				</div>
				<div className="ml-20">
					{`Started at: ${format(new Date(attempt.startDate), "PPPP")}`}
				</div>
			</div>
			<div className="mt-6 flex flex-row items-start bg-gray-50 rounded-xl px-6 py-4 justify-between font-sans">
				<span className=" text-blue-chill-600 italic font-medium">
					Answer: {attempt.score ?? "Not yet graded"}
				</span>
				<div className="font-semibold flex items-center min-w-fit cursor-pointer">
					<span className="whitespace-pre">Review</span>
					<FontAwesomeIcon icon={faCaretDown} />
				</div>
			</div>
		</div>
	);
};

export default AttemptCardFinished;