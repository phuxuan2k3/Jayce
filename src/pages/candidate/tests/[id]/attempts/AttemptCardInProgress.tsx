import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import FetchState from '../../../../../components/wrapper/FetchState';
import paths2 from '../../../../../router/paths';
import GradientBorderGood from '../../../../../components/ui/border/GradientBorder.good';
import TestTimer from '../../../../../features/Test/partials/TestTimer';
import { useGetCurrentAttemptStateQuery } from '../../../../../features/Test/api/test.api-gen';

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
}

const AttemptCardInProgress: React.FC<Props> = ({
	company,
	test,
}) => {
	const navigate = useNavigate();
	const { data, isLoading, error } = useGetCurrentAttemptStateQuery({});

	const handleOnInProgressAttemptClick = () => {
		navigate(paths2.candidate.tests.in(test.id).DO);
	};

	if (data == null) return <>Loading...</>;
	if (data.currentAttempt == null) return <>No current attempt</>;
	const currentAttempt = data.currentAttempt;
	return (
		<FetchState
			isLoading={isLoading}
			error={error}>
			<div className="bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
				<div className="bg-secondary-toned-50 p-4 mb-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleOnInProgressAttemptClick()}>
					<div className="flex flex-row border-b border-secondary pb-4 items-center gap-3 mb-3 h-fit">
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
					<div className="flex flex-row text-xl font-bold mb-2 text-primary">
						<TestTimer
							timeLeft={currentAttempt.secondsLeft}
						/>
					</div>
					<div className="flex flex-row font-semibold mb-2 text-[#39A0AD] items-center">
						<div className="text-lg">In Progress</div>
						<div className="ml-20">
							{`Submitted at: ${currentAttempt ? format(new Date(currentAttempt.createdAt), "PPPP") : "Not yet submitted"}`}
						</div>
					</div>
					<div className="mt-6 flex flex-row items-start bg-gray-50 rounded-xl px-6 py-4 justify-between font-sans">
						<span className=" text-blue-chill-600 italic font-medium">Not yet graded</span>
						<div className="font-semibold flex items-center min-w-fit cursor-pointer">
							<span className="whitespace-pre">Continue</span>
							<FontAwesomeIcon icon={faCaretDown} />
						</div>
					</div>
				</div>
			</div>
		</FetchState>
	);
};

export default AttemptCardInProgress;