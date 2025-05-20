import React from 'react';

interface SuccessRateBarProps {
	correctAnswerPercentage: number;
}

const SuccessRateBar: React.FC<SuccessRateBarProps> = ({ correctAnswerPercentage }) => {
	return (
		<div className="bg-gray-50 p-4 rounded-md shadow-sm">
			<div className="flex justify-between items-center mb-2">
				<p className="text-sm font-medium">Success Rate</p>
				<p className="text-sm font-bold">{correctAnswerPercentage}%</p>
			</div>
			<div className="h-2.5 w-full bg-gray-200 rounded-full">
				<div
					className={`h-2.5 rounded-full ${correctAnswerPercentage >= 70 ? 'bg-green-500' :
						correctAnswerPercentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
						}`}
					style={{ width: `${correctAnswerPercentage}%` }}
				></div>
			</div>
		</div>
	);
};

export default SuccessRateBar;
