import React from 'react';

interface StatisticsToggleProps {
	showStatistics: boolean;
	setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatisticsToggle: React.FC<StatisticsToggleProps> = ({ showStatistics, setShowStatistics }) => {
	return (
		<button
			className="flex w-full items-center justify-between bg-primary-toned-100 text-primary-toned-700 px-4 py-2 rounded-md hover:bg-primary-toned-200 transition-colors duration-200"
			onClick={() => setShowStatistics(!showStatistics)}
		>
			<span className="font-medium">Question Statistics</span>
			<svg
				className={`w-5 h-5 transform transition-transform duration-300 ${showStatistics ? 'rotate-180' : ''}`}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
			</svg>
		</button>
	);
};

export default StatisticsToggle;
