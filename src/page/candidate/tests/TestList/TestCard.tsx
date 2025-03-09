import { Avatar } from "@mui/material";
import React from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GradientBorderGood from "../../../../components/GradientBorder.good";
import { TestDisplayProps } from "../../../../features/Test/types/props";
import { toCompanyImagesDir } from "../../../../helpers/images";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const TestCard: React.FC<TestDisplayProps> = ({
	ID: id,
	company,
	createdAt,
	title: question,
	description: questionDescription,
	minutesToAnswer,
	tags,
	answerCount,
}) => {
	const navigate = useNavigate();

	const avatar = toCompanyImagesDir(id);
	const minutesToAnswerString = minutesToAnswer === 1 ? "1 minute" : `${minutesToAnswer} minutes`;

	function handleOnClick() {
		navigate(`/test/${id}/attempts`);
	}

	return (
		<div className="bg-blue-chill-100 border border-solid border-blue-chill-400 p-4 rounded-2xl shadow-sm mb-4 cursor-pointer" onClick={handleOnClick}>
			<div className="flex flex-row items-center gap-3 mb-3 h-fit">
				<Avatar className="" src={avatar} alt={company} />
				<div className="flex flex-col h-fit">
					<div className="flex items-center text-sm text-blue-chill-500 mb-0">
						<span className="font-semibold">Asked at {company}</span>
						<span className="mx-2">&#8226;</span>
						<span className="">{formatDistanceToNow(new Date(createdAt))}</span>
					</div>
					<h3 className="text-lg font-semibold text-gray-800 my-0">{question}</h3>
				</div>
			</div>
			<hr className="my-4 border-blue-chill-200" />
			<div className="flex flex-wrap gap-2 mb-4">
				{tags.map((tag, index: number) => (
					<GradientBorderGood key={index}>
						{tag}
					</GradientBorderGood>
				))}
			</div>
			<div className="flex items-center justify-between text-sm text-gray-700 px-8">
				<div className="flex flex-row items-center text-blue-chill-600 font-medium">
					<BookmarkIcon className="mr-1" />
					<span className="text-md">Save</span>
				</div>
				<div className="flex flex-row items-center text-blue-chill-600 font-medium">
					<QuestionAnswerIcon className="mr-1" />
					<span className="text-md">{answerCount} answers</span>
				</div>
				<div className="flex flex-row items-center text-blue-chill-600 font-medium">
					<AccessTimeIcon className="mr-1" />
					<span className="text-md">{minutesToAnswerString}</span>
				</div>
			</div>
			<div className="mt-6 flex flex-row items-start bg-gray-50 rounded-xl px-6 py-4 justify-between font-sans">
				<span className=" text-blue-chill-600 italic font-medium pr-4 line-clamp-1 text-ellipsis">
					Clarifying questions: {questionDescription}
				</span>
				<div className="font-semibold flex items-center min-w-fit cursor-pointer">
					<span>View answer</span>
					<ArrowDropDownIcon />
				</div>
			</div>
		</div>
	);
};

export default TestCard;