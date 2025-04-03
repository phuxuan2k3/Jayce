import { Avatar } from "@mui/material";
import React from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { toCompanyImagesDir } from "../../../../../helpers/images";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import GradientBorderGood from "../../../../../components/ui/border/GradientBorder.good";
import { GetTestsApiResponse } from "../../../../../features/tests/api/test.api-gen";

type Props = GetTestsApiResponse['data'][0] & {
	company: string;
};

const TestCard: React.FC<Props> = ({ id, managerId, minutesToAnswer, company, createdAt, title, tags, answerCount }: Props) => {
	const navigate = useNavigate();
	const avatar = toCompanyImagesDir(managerId);
	const minutesToAnswerString = minutesToAnswer === 1 ? "1 minute" : `${minutesToAnswer} minutes`;

	const handleOnCardClick = () => {
		navigate(paths.candidate.tests.in(id).ATTEMPTS);
	}

	return (
		<div className="bg-blue-chill-100 border border-solid border-blue-chill-400 p-4 rounded-2xl shadow-sm mb-4 cursor-pointer" onClick={handleOnCardClick}>
			<div className="flex flex-row items-center gap-3 mb-3 h-fit">
				<Avatar className="" src={avatar} alt={managerId} />
				<div className="flex flex-col h-fit">
					<div className="flex items-center text-sm text-blue-chill-500 mb-0">
						<span className="font-semibold">Asked at {company}</span>
						<span className="mx-2">&#8226;</span>
						<span className="">{formatDistanceToNow(new Date(createdAt))}</span>
					</div>
					<h3 className="text-lg font-semibold text-gray-800 my-0">{title}</h3>
				</div>
			</div>
			<hr className="my-4 border-blue-chill-200" />
			<div className="flex flex-wrap gap-2 mb-4">
				{tags.map((tag, index: number) => (
					<GradientBorderGood key={index}>
						{tag.name}
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
					Clarifying questions: #test.description
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