import React from 'react';
import { useQuestion } from './context';

const Stats: React.FC = () => {
	const { question, mode } = useQuestion();

	if (mode !== 'stats' && mode !== 'manage') return null;

	const { numberOfAnswers, numberOfCorrectAnswers, averageScore } = question._aggregate_test;
	const successRate = numberOfAnswers > 0 ? Math.round((numberOfCorrectAnswers / numberOfAnswers) * 100) : 0;

	return (
		<div className="px-4 pb-4">
			<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
				<h4 className="text-sm font-semibold text-gray-700 mb-3">Question Statistics</h4>

				<div className="grid grid-cols-2 gap-4">
					<div className="bg-white p-3 rounded-md shadow-sm">
						<p className="text-xs text-gray-500">Total Answers</p>
						<div className="flex items-center gap-2">
							<p className="font-semibold text-lg">{numberOfAnswers}</p>
						</div>
					</div>

					<div className="bg-white p-3 rounded-md shadow-sm">
						<p className="text-xs text-gray-500">Correct Answers</p>
						<div className="flex items-center gap-2">
							<p className="font-semibold text-lg text-green-600">{numberOfCorrectAnswers}</p>
						</div>
					</div>

					<div className="bg-white p-3 rounded-md shadow-sm">
						<p className="text-xs text-gray-500">Success Rate</p>
						<div className="flex items-center gap-2">
							<p className="font-semibold text-lg text-blue-600">{successRate}%</p>
						</div>
						<div className="w-full h-2 bg-gray-200 rounded-full mt-1">
							<div
								className="h-2 bg-blue-500 rounded-full transition-all duration-300"
								style={{ width: `${successRate}%` }}
							/>
						</div>
					</div>

					<div className="bg-white p-3 rounded-md shadow-sm">
						<p className="text-xs text-gray-500">Avg. Score</p>
						<div className="flex items-center gap-2">
							<p className="font-semibold text-lg text-purple-600">{averageScore.toFixed(1)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stats;
