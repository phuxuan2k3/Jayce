import React from 'react';

interface QuestionOptionsProps {
	options: string[];
	correctOption: number;
}

const QuestionOptions: React.FC<QuestionOptionsProps> = ({ options, correctOption }) => {
	return (
		<div className='flex flex-col gap-2'>
			{options.map((option, index) => (
				<div
					key={index}
					className={`p-2 text-gray-700 border border-gray-300 rounded-md 
            ${index === correctOption
							? 'bg-green-100 border-green-500'
							: 'bg-gray-50'
						}`}
				>
					<div className="flex items-center">
						<div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${index === correctOption ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
							{String.fromCharCode(65 + index)}
						</div>
						<span>{option}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default QuestionOptions;
