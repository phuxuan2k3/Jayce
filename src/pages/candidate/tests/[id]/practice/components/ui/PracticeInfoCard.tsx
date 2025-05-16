import React from 'react';
import usePracticePage from '../../hooks/usePracticePage';

const PracticeInfoCard: React.FC = () => {
	const {
		data: { practice, currentAttempt, attemptAggregate: aggregate, author },
		state: { isLoading },
	} = usePracticePage();

	return (
		<div className="bg-[#eaf6f8] p-6 rounded-lg mb-6 flex justify-between">
			<div className="w-full flex flex-col items-center h-[200px]">
				<h4 className="font-semibold mb-2 text-center">Test Information</h4>
				<div className="flex flex-col items-center justify-center h-full">
					{isLoading ? (
						<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
					) : (practice && (
						<>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Author:</span> {author?.username}
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Time Limit:</span> {practice.minutesToAnswer} minutes
							</p>
							<p className="text-gray-700 mb-2">
								<span className="font-semibold">Language:</span> {practice.language}
							</p>
							<p className="text-gray-700">
								<span className="font-semibold">Mode:</span> {practice.mode}
							</p>
						</>
					))}
				</div>
			</div>
		</div>
	);
};

export default PracticeInfoCard;