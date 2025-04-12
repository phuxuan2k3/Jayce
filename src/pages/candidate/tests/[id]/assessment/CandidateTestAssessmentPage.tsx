import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";

ChartJS.register(ArcElement, Tooltip);

type SkillAssessment = {
	name: string;
	rating: number;
}

type TestEvaluateProps = {
	title: string;
	comment: string;
	skills: SkillAssessment[];
	completionOverview: {
		excellentCompletion: number;
		satifactoyCompletion: number;
		needsImprovement: number;
	}
}

const mockData: TestEvaluateProps = {
	title: "Test Evaluation",
	comment: "Great job! You have shown excellent understanding of the concepts. Keep up the good work and continue to build on your strengths. There are a few areas that need improvement, but overall, you did very well.",
	skills: [
		{ name: "JavaScript", rating: 4.5 },
		{ name: "React", rating: 4.0 },
		{ name: "CSS", rating: 3.5 },
	],
	completionOverview: {
		excellentCompletion: 50,
		satifactoyCompletion: 30,
		needsImprovement: 20,
	},
};

const evaluate = mockData;
const completionOverview = {
	legend: [
		{
			color: "#2b6cb0",
			text: "Excellent Completion",
			percentage: evaluate.completionOverview.excellentCompletion
		},
		{
			color: "#38b2ac",
			text: "Satisfactory Completion",
			percentage: evaluate.completionOverview.satifactoyCompletion
		},
		{
			color: "#81e6d9",
			text: "Needs Improvement",
			percentage: evaluate.completionOverview.needsImprovement
		},
	],
};

// TODO: complete the page

const CandidateTestAssessmentPage = () => {
	const navigate = useNavigate();
	const handleCoursesForYou = () => {
		navigate(paths.candidate.tests.in().RECOMMENDATION);
	}

	return (
		<div className="min-h-screen p-6 ">
			<h1 className="text-2xl font-bold mb-6">{evaluate.title}</h1>
			<div className="flex space-x-6">
				<div className="bg-blue-50 shadow-md rounded-md p-6 space-y-6 w-5/6">
					{/* Review Comment */}
					<div className="space-y-4">
						<h2 className="font-semibold text-lg">Review comment</h2>
						<div className="bg-white p-4 rounded-md text-gray-700">
							<p className="pb-10">{evaluate.comment}</p>
						</div>
					</div>
					{/* Courses Button */}
					<div className="flex justify-end">
						<button className="mt-4 bg-gradient-text text-md font-bold text-white px-6 py-3 rounded-lg" onClick={handleCoursesForYou}>
							Courses for you
						</button>
					</div>
				</div>

				<div className="space-y-6">
					<div className="bg-white shadow-md rounded-md p-6 space-y-6">
						{/* Skills Section */}
						<div className="space-y-4">
							<h2 className="font-semibold text-lg">Your skills</h2>
							<div className="space-y-2">
								{evaluate.skills.map((skill, index: number) => (
									<SkillRow key={index} title={skill.name} stars={skill.rating} />
								))}
							</div>
						</div>

					</div>
					<div className="bg-white shadow-md rounded-md p-6 space-y-6">
						<div className="space-y-4">
							<h2 className="font-semibold text-lg">Completion Overview</h2>
							<div className="flex items-center space-x-4">
								<PieChart legend={completionOverview.legend} />
								<ul className="space-y-2">
									{completionOverview.legend.map((item, index) => (
										<li key={index} className="flex items-center space-x-2">
											<div
												className="w-4 h-4"
												style={{ backgroundColor: item.color }}
											></div>
											<span className="text-sm text-gray-600">{item.text}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>


		</div>
	);
};



const SkillRow = ({ title, stars }: { title: string; stars: number }) => {
	const fullStars = Math.floor(stars);
	const partialStar = stars - fullStars;
	const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0);

	return (
		<div className="flex items-center justify-between">
			<span className="text-gray-700">{title}</span>
			<div className="flex space-x-1">
				{[...Array(fullStars)].map((_, i) => (
					<Star key={`full-${i}`} />
				))}
				{partialStar > 0 && <PartialStar percentage={partialStar} />}
				{[...Array(emptyStars)].map((_, i) => (
					<EmptyStar key={`empty-${i}`} />
				))}
			</div>
		</div>
	);
};

const Star = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-yellow-500">
		<path d="M8 .25a.75.75 0 0 1 .672.424l1.95 3.952 4.357.635a.75.75 0 0 1 .416 1.28l-3.149 3.07.742 4.308a.75.75 0 0 1-1.088.792L8 12.206l-3.874 2.04a.75.75 0 0 1-1.088-.792l.742-4.308-3.148-3.07a.75.75 0 0 1 .417-1.28l4.357-.635 1.95-3.952A.75.75 0 0 1 8 .25z" />
	</svg>
);

const PartialStar = ({ percentage }: { percentage: number }) => {
	const starPath = "M8 .25a.75.75 0 0 1 .672.424l1.95 3.952 4.357.635a.75.75 0 0 1 .416 1.28l-3.149 3.07.742 4.308a.75.75 0 0 1-1.088.792L8 12.206l-3.874 2.04a.75.75 0 0 1-1.088-.792l.742-4.308-3.148-3.07a.75.75 0 0 1 .417-1.28l4.357-.635 1.95-3.952A.75.75 0 0 1 8 .25z";
	const fillWidth = percentage * 100;

	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="text-yellow-500">
			<path
				d={starPath}
				fill="none"
				stroke="currentColor"
				strokeWidth="1"
			/>
			<path
				d={starPath}
				fill="#f59e0b"
				stroke="none"
				style={{
					width: `${fillWidth}%`,
					clipPath: `inset(0 ${100 - fillWidth}% 0 0)`
				}}
			/>
		</svg>
	);
};
const EmptyStar = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-300">
		<path d="M8 .25a.75.75 0 0 1 .672.424l1.95 3.952 4.357.635a.75.75 0 0 1 .416 1.28l-3.149 3.07.742 4.308a.75.75 0 0 1-1.088.792L8 12.206l-3.874 2.04a.75.75 0 0 1-1.088-.792l.742-4.308-3.148-3.07a.75.75 0 0 1 .417-1.28l4.357-.635 1.95-3.952A.75.75 0 0 1 8 .25z" />
	</svg>
);

const PieChart = ({ legend }: { legend: { color: string; text: string; percentage: number }[] }) => {
	// Prepare the data for the pie chart
	const data = {
		labels: legend.map(item => item.text),
		datasets: [
			{
				data: legend.map(item => item.percentage),
				backgroundColor: legend.map(item => item.color), // Colors based on the legend data
				borderWidth: 1,
			},
		],
	};

	return (
		<div className="w-32 h-32">
			<Pie data={data} options={{ responsive: true }} />
		</div>
	);
};
export default CandidateTestAssessmentPage;