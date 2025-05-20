import React from 'react';

interface StatisticsCardsProps {
	numberOfAnswers: number;
	numberOfCorrectAnswers: number;
	averagePoints: number;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ numberOfAnswers, numberOfCorrectAnswers, averagePoints }) => {
	return (
		<div className="grid grid-cols-3 gap-4">
			<div className="bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
				<p className="text-xs text-gray-500">Number of Answers</p>
				<div className="flex items-center gap-2">
					<svg className="w-4 h-4 text-primary-toned-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
					</svg>
					<p className="font-semibold">{numberOfAnswers}</p>
				</div>
			</div>
			<div className="bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
				<p className="text-xs text-gray-500">Number of Correct Answers</p>
				<div className="flex items-center gap-2">
					<svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
					<p className="font-semibold">{numberOfCorrectAnswers}</p>
				</div>
			</div>
			<div className="bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
				<p className="text-xs text-gray-500">Average Points</p>
				<div className="flex items-center gap-2">
					<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
					</svg>
					<p className="font-semibold">{averagePoints.toFixed(1)}</p>
				</div>
			</div>
		</div>
	);
};

export default StatisticsCards;
