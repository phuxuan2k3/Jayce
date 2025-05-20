import React from 'react';

interface QuestionHeaderProps {
	index: number;
	points: number;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({ index, points }) => {
	return (
		<div className="mt-2 flex justify-between items-center">
			<h3 className="text-lg font-semibold">Question #{index + 1}</h3>
			<div className="bg-primary-toned-100 text-primary-toned-800 px-3 py-1 rounded-full text-sm font-bold">
				Points: {points}
			</div>
		</div>
	);
};

export default QuestionHeader;
