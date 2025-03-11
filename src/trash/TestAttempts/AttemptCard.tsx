import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import GradientBorderGood from '../../components/ui/border/GradientBorder.good';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Attempt, TestAttemptsProps, TestStatus } from './types';

interface AttemptCardProps {
	attempt: Attempt;
	companyProps: { imageUrl: string; name: string };
	testAttemptsProps: TestAttemptsProps;
	handleOnAttemptClick: (attemptId: string, attemptStatus: TestStatus) => void;
}

const AttemptCard: React.FC<AttemptCardProps> = ({ attempt, companyProps, testAttemptsProps, handleOnAttemptClick }) => {
	return (
		<div key={attempt.ID} className="bg-[#EAF6F8] p-4 mb-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleOnAttemptClick(attempt.ID, attempt.status)}>
			<div className="flex flex-row border-b border-primary pb-4 items-center gap-3 mb-3 h-fit">
				<img className="w-12 h-12 rounded-full" src={companyProps.imageUrl} alt={companyProps.name} />
				<div className="flex flex-col h-fit">
					<div className="flex items-center text-sm text-blue-chill-500 mb-0">
						<span className="font-semibold">Asked at {companyProps.name}</span>
						<span className="mx-2">&#8226;</span>
						<span className="">{formatDistanceToNow(new Date(testAttemptsProps.createdAt))} ago</span>
					</div>
					<h3 className="text-lg font-semibold text-gray-800 my-0">{testAttemptsProps.title}</h3>
				</div>
			</div>
			<div className="flex flex-wrap gap-2 mb-4">
				{testAttemptsProps.tags.map((tag, index: number) => (
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
					{`${attempt.status}`}
				</div>
				<div className="ml-20">
					{`Submitted at ${format(new Date(attempt.createdAt), "PPPP")}`}
				</div>
			</div>
			<div className="mt-6 flex flex-row items-start bg-gray-50 rounded-xl px-6 py-4 justify-between font-sans">
				<span className=" text-blue-chill-600 italic font-medium">
					Answer: {attempt.score ?? "Not yet graded"}
				</span>
				<div className="font-semibold flex items-center min-w-fit cursor-pointer">
					<span className="whitespace-pre">{attempt.status === "Finished" ? "Review" : "Continue"} </span>
					<FontAwesomeIcon icon={faCaretDown} />
				</div>
			</div>
		</div>
	);
};

export default AttemptCard;