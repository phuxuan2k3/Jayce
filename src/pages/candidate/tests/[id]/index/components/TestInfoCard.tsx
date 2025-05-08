import React from 'react';

interface TestInfoCardProps {
	test: {
		title: string;
		author: {
			name: string;
		};
		minutesToAnswer: number;
		language: string;
		mode: string;
	};
}

const TestInfoCard: React.FC<TestInfoCardProps> = ({ test }) => {
	return (
		<div className="bg-[#eaf6f8] p-6 rounded-lg mb-6 flex justify-between">
			<div className="w-full flex flex-col items-center h-[200px]">
				<h4 className="font-semibold mb-2 text-center">Test Information</h4>
				<div className="flex flex-col items-center justify-center h-full">
					{test && (
						<>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Author:</span> {test.author.name}
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Time Limit:</span> {test.minutesToAnswer} minutes
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Language:</span> {test.language}
							</p>
							<p className="text-gray-700">
								<span className="font-semibold">Mode:</span> {test.mode}
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default TestInfoCard;