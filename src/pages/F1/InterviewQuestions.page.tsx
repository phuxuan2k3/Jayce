import React from "react";

type QuestionCardProps = {
	company: string;
	timeAgo: string;
	question: string;
	tags: string[];
	answersCount: number;
	timeToAnswer: string;
	clarifyingQuestion: string;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
	company,
	timeAgo,
	question,
	tags,
	answersCount,
	timeToAnswer,
	clarifyingQuestion,
}) => {
	return (
		<div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm mb-4">
			<div className="flex items-center text-sm text-gray-600 mb-2">
				<span className="font-semibold">Asked at {company}</span>
				<span className="mx-2">&#8226;</span>
				<span>{timeAgo}</span>
			</div>
			<h3 className="text-lg font-semibold text-gray-800 mb-3">{question}</h3>
			<div className="flex flex-wrap gap-2 mb-4">
				{tags.map((tag, index) => (
					<span
						key={index}
						className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full border border-blue-300"
					>
						{tag}
					</span>
				))}
			</div>
			<div className="flex items-center justify-between text-sm text-gray-700">
				<button className="text-blue-600 font-medium">Save</button>
				<span>{answersCount} answers</span>
				<span>{timeToAnswer}</span>
			</div>
			<p className="mt-3 text-gray-700 italic">
				Clarifying questions: {clarifyingQuestion}
			</p>
			<button className="mt-2 text-blue-600 font-medium">View answer</button>
		</div>
	);
};

type InterviewQuestionsPageProps = {
	questions: QuestionCardProps[]; // Array of question data
};

const InterviewQuestionsPage: React.FC<InterviewQuestionsPageProps> = ({ questions }) => {
	return (
		<div className="p-6 max-w-7xl mx-auto">
			<header className="flex justify-between items-center mb-8">
				<h1 className="text-2xl font-bold">Interview Questions</h1>
				<input
					type="text"
					placeholder="Search for questions, companies"
					className="border border-gray-300 rounded-lg px-4 py-2 w-64"
				/>
			</header>
			<main className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left column */}
				<div className="col-span-2">
					<div className="flex justify-between mb-4">
						<select className="border border-gray-300 rounded-lg px-4 py-2">
							<option>Select your Time</option>
						</select>
						<select className="border border-gray-300 rounded-lg px-4 py-2">
							<option>Select your level</option>
						</select>
					</div>
					{questions.map((question, index) => (
						<QuestionCard key={index} {...question} />
					))}
				</div>

				{/* Right column */}
				<aside>
					<section className="mb-8">
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
								<span
									key={index}
									className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full border border-blue-300"
								>
									{role}
								</span>
							))}
						</div>
					</section>
					<section>
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

export default InterviewQuestionsPage;
export type { InterviewQuestionsPageProps, QuestionCardProps };