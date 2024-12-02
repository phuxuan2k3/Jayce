import { FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import GradientBorderGood from "../../../../components/GradientBorder.good";
import TestCard from "./TestCard";
import { mockData } from "./types";


const TestList: React.FC = () => {
	// todo
	const questions = mockData;

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
						{questions.map((question) => (
							<TestCard key={question.id} {...question} />
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
								"Data Scientist",
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