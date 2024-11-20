import { Avatar, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import avatar from "/png/avatar.png";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import GradientBorderGood from "../../components/GradientBorder.good";

type QuestionCardProps = {
	company: string;
	companyAvatar: string | null;
	timeAgo: string;
	question: string;
	tags: string[];
	answersCount: number;
	timeToAnswer: string;
	clarifyingQuestion: string;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
	company,
	companyAvatar,
	timeAgo,
	question,
	tags,
	answersCount,
	timeToAnswer,
	clarifyingQuestion,
}) => {
	return (
		<div className="bg-blue-chill-100 border border-solid border-blue-chill-400 p-4 rounded-2xl shadow-sm mb-4">
			<div className="flex flex-row items-center gap-3 mb-3 h-fit">
				<Avatar className="" src={companyAvatar || avatar} alt={company} />
				<div className="flex flex-col h-fit">
					<div className="flex items-center text-sm text-blue-chill-500 mb-0">
						<span className="font-semibold">Asked at {company}</span>
						<span className="mx-2">&#8226;</span>
						<span className="">{timeAgo}</span>
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
					<span className="text-md">{answersCount} answers</span>
				</div>
				<div className="flex flex-row items-center text-blue-chill-600 font-medium">
					<AccessTimeIcon className="mr-1" />
					<span className="text-md">{timeToAnswer}</span>
				</div>
			</div>
			<div className="mt-6 flex flex-row items-start bg-gray-50 rounded-xl px-6 py-4 justify-between font-sans">
				<span className=" text-blue-chill-600 italic font-medium">
					Clarifying questions: {clarifyingQuestion}
				</span>
				<div className="font-semibold flex items-center min-w-fit cursor-pointer">
					<span>View answer</span>
					<ArrowDropDownIcon />
				</div>
			</div>
		</div>
	);
};

type InterviewQuestionsPageProps = {
	questions: QuestionCardProps[]; // Array of question data
};

const TestList: React.FC<InterviewQuestionsPageProps> = ({ questions }) => {
	const [time, setTime] = useState<number | null>(null);
	const [difficulty, setDifficulty] = useState<number | null>(null);

	const handleSelectTimeChange = (event: SelectChangeEvent<string>) => {
		setTime(Number(event.target.value));
	};
	const handleSelectDifficultyChange = (event: SelectChangeEvent<string>) => {
		setDifficulty(Number(event.target.value));
	};

	return (
		<div className="p-6 max-w-7xl mx-auto">
			<header className="flex flex-col mb-8">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold">Interview Questions</h1>
					<TextField
						className="w-1/3"
						variant="outlined"
						size="small"
						placeholder="Search..."
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon color="action" />
									</InputAdornment>
								),
							},
						}}
					/>
				</div>
				<span className="text-sm text-blue-chill-500">
					Review this list of {questions.length} interview questions and answers verified by hiring managers and candidates.
				</span>
			</header>
			<main className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left column */}
				<div className="col-span-2">
					<div className="flex flex-row justify-start gap-2 mb-4">
						<FormControl size="small" variant="outlined" className="w-1/3 shadow-md">
							<InputLabel id="time-select-label">Select your time</InputLabel>
							<Select
								labelId="time-select-label"
								value={time?.toString() || ""}
								onChange={handleSelectTimeChange}
								label="Select your time"
							>
								<MenuItem value={60}>1 hour</MenuItem>
								<MenuItem value={45}>45 minutes</MenuItem>
								<MenuItem value={30}>30 minutes</MenuItem>
							</Select>
						</FormControl>
						<FormControl size="small" variant="outlined" className="w-1/3 shadow-md">
							<InputLabel id="time-select-label">Select difficulty</InputLabel>
							<Select
								labelId="time-select-label"
								value={difficulty?.toString() || ""}
								onChange={handleSelectDifficultyChange}
								label="Select your difficulty"
							>
								<MenuItem value={3}>Hard</MenuItem>
								<MenuItem value={2}>Medium</MenuItem>
								<MenuItem value={1}>Easy</MenuItem>
							</Select>
						</FormControl>
					</div>

					{/* List of questions */}
					<div className="shadow-primary px-6 py-8 rounded-xl">
						{questions.map((question, index) => (
							<QuestionCard key={index} {...question} />
						))}
					</div>
				</div>

				{/* Right column */}
				<aside>
					<section className="shadow-primary mb-8 px-6 pt-4 pb-8 rounded-lg">
						<h2 className="text-lg font-semibold mb-4">Popular roles</h2>
						<div className="flex flex-wrap gap-2">
							{[
								"Product Manager",
								"Software Engineer",
								"Engineering Manager",
								"Data scientist",
								"Solution Architect",
								"Data Engineer",
							].map((role, index) => (
								<GradientBorderGood className="cursor-pointer" key={index}>
									{role}
								</GradientBorderGood>
							))}
						</div>
					</section>
					<section className="shadow-secondary mb-8 px-6 pt-4 pb-8 rounded-lg">
						<h2 className="text-lg font-semibold mb-4">Interviewed recently</h2>
						<p className="text-sm text-gray-700">
							Help improve our question database (and earn karma) by telling us
							about your experience
						</p>
					</section>
				</aside>
			</main>
		</div>
	);
};

export default TestList;
export type { QuestionCardProps };