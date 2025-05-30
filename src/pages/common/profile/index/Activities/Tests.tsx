import * as React from 'react';
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const attemptsData = {
	labels: ["All", "Data Engineering", "Programming", "Common Skills"], // Get these from the API
	datasets: [
		{
			label: "Attempts",
			data: [9, 4, 2, 2], // Get these from the API
			backgroundColor: ["#000", "#2ca5c9", "#6ab5d8", "#88c5e3"], // Generate more colors
			borderRadius: 4,
		},
	],
};

const responseTimeData = {
	labels: ["Your time", "Average time"],
	datasets: [
		{
			label: "Response Time (s)",
			data: [702, 921], // Get these from the API
			backgroundColor: ["#2ca5c9", "#f08b74"],
			borderRadius: 4,
		},
	],
};

const acceptanceRateData = {
	labels: ["Not correct", "Correct"],
	datasets: [
		{
			data: [9, 40], // Get these from the API
			backgroundColor: ["#d9534f", "#5bc0de"],
		},
	],
};

const Tests = () => {
	const [selectedOption, setSelectedOption] = React.useState<string>("");

	return (
		<div>
			<div className="bg-[#eaf6f8] h-[280px] p-6 rounded-lg mb-6 flex justify-between">
				{/* Attempts Chart */}
				<div className="w-1/3 flex flex-col items-center h-full border-r-gradient">
					<h4 className="font-semibold mb-2 text-center">Attempts</h4>
					<div className="w-full h-full">
						<Bar
							data={attemptsData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								indexAxis: "y",
								plugins: { legend: { display: false } },
								scales: {
									x: { display: false },
									y: {
										ticks: { font: { size: 14, weight: "bold" } },
										grid: { display: false },
									},
								},
							}}
						/>
					</div>
				</div>

				{/* Response Time Chart */}
				<div className="w-1/3 flex flex-col items-center h-full">
					<h4 className="font-semibold mb-2 text-center">Response time (for the tests)</h4>
					<div className="w-3/4 h-full">
						<Bar
							data={responseTimeData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								plugins: { legend: { display: false } },
							}}
						/>
					</div>
				</div>

				{/* Acceptance Rate Pie Chart */}
				<div className="w-1/3 flex flex-col items-center h-full border-l-gradient">
					<h4 className="font-semibold mb-2 text-center">Acceptance rate of tests responses</h4>
					<div className="relative w-[180px] h-[180px] flex justify-center items-center">
						<Pie
							data={acceptanceRateData}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								plugins: { legend: { display: false } },
							}}
						/>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between mb-2">
				<h2 className="text-xl font-bold mb-4">Test Topics</h2>

				<div className="flex items-center gap-2">
					<label className="text-gray-800 text-sm">Filter by</label>
					<select
						className="border rounded-md p-2"
						value={selectedOption}
						onChange={(e) => setSelectedOption(e.target.value)}
					>
						<option value="">Select</option>
						<option value="Recently">Recently</option>
						<option value="Recently">Completed</option>
						<option value="All">All</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default Tests