import { ExamCore } from '../../../../../../infra-test/core/test.model';
import { AttemptsOfTestAggregate } from '../../../../../../infra-test/core/attempt.model';
import { format } from 'date-fns';

interface ConfigurationTabContentProps {
	examData?: ExamCore;
	attemptsAggregate?: AttemptsOfTestAggregate;
}

export default function ConfigurationTabContent({
	examData,
	attemptsAggregate,
}: ConfigurationTabContentProps) {
	return (
		<div className="space-y-8">
			{/* Exam Configuration Section */}
			<section>
				<h2 className="text-xl font-bold text-primary-toned-700 mb-4">Exam Configuration</h2>

				{examData && (
					<div className="bg-white rounded-lg border border-primary-toned-200 shadow-sm p-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<div>
									<h3 className="text-sm font-semibold text-gray-500">Title</h3>
									<p className="text-lg font-medium text-gray-800">{examData.title}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-gray-500">Description</h3>
									<p className="text-base text-gray-700">{examData.description}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-gray-500">Language</h3>
									<p className="text-base text-gray-700">{examData.language}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-gray-500">Mode</h3>
									<p className="text-base text-gray-700">{examData.mode}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-gray-500">Time Limit</h3>
									<p className="text-base text-gray-700">{examData.minutesToAnswer} minutes</p>
								</div>
							</div>

							<div className="space-y-4">
								<div>
									<h3 className="text-sm font-semibold text-gray-500">Room ID</h3>
									<p className="text-base text-gray-700">{examData.roomId}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-gray-500">Password Protected</h3>
									<p className="text-base text-gray-700">{examData.hasPassword ? 'Yes' : 'No'}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-gray-500">Attempts Allowed</h3>
									<p className="text-base text-gray-700">{examData.numberOfAttemptsAllowed}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-gray-500">Show Answers After Completion</h3>
									<p className="text-base text-gray-700">{examData.isAnswerVisible ? 'Yes' : 'No'}</p>
								</div>

								<div>
									<h3 className="text-sm font-semibold text-gray-500">Show Others' Results</h3>
									<p className="text-base text-gray-700">{examData.isAllowedToSeeOtherResults ? 'Yes' : 'No'}</p>
								</div>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-sm font-semibold text-gray-500">Open Date</h3>
								<p className="text-base text-gray-700">{formatDateTime(examData.openDate)}</p>
							</div>

							<div>
								<h3 className="text-sm font-semibold text-gray-500">Close Date</h3>
								<p className="text-base text-gray-700">{formatDateTime(examData.closeDate)}</p>
							</div>
						</div>
					</div>
				)}

				{!examData && (
					<div className="bg-white rounded-lg border border-primary-toned-200 shadow-sm p-6">
						<p className="text-base text-gray-700">No exam data available.</p>
					</div>
				)}
			</section>

			{/* Attempts Statistics Section */}
			{attemptsAggregate && (
				<section>
					<h2 className="text-xl font-bold text-primary-toned-700 mb-4">Attempts Statistics</h2>
					<div className="bg-white rounded-lg border border-primary-toned-200 shadow-sm p-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-primary-toned-50 p-4 rounded-lg border border-primary-toned-100">
								<h3 className="text-sm font-semibold text-gray-500 mb-2">Total Participants</h3>
								<p className="text-2xl font-bold text-primary-toned-700">{attemptsAggregate.totalParticipants}</p>
							</div>

							<div className="bg-primary-toned-50 p-4 rounded-lg border border-primary-toned-100">
								<h3 className="text-sm font-semibold text-gray-500 mb-2">Total Attempts</h3>
								<p className="text-2xl font-bold text-primary-toned-700">{attemptsAggregate.totalAttempts}</p>
							</div>

							<div className="bg-primary-toned-50 p-4 rounded-lg border border-primary-toned-100">
								<h3 className="text-sm font-semibold text-gray-500 mb-2">Average Time</h3>
								<p className="text-2xl font-bold text-primary-toned-700">{formatSeconds(attemptsAggregate.averageTime)}</p>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-primary-toned-50 p-4 rounded-lg border border-primary-toned-100">
								<h3 className="text-sm font-semibold text-gray-500 mb-2">Average Score</h3>
								<p className="text-2xl font-bold text-primary-toned-700">{Math.round(attemptsAggregate.averageScore * 10) / 10}%</p>
							</div>

							<div className="bg-primary-toned-50 p-4 rounded-lg border border-primary-toned-100">
								<h3 className="text-sm font-semibold text-gray-500 mb-2">Highest Score</h3>
								<p className="text-2xl font-bold text-primary-toned-700">{attemptsAggregate.highestScore}%</p>
							</div>

							<div className="bg-primary-toned-50 p-4 rounded-lg border border-primary-toned-100">
								<h3 className="text-sm font-semibold text-gray-500 mb-2">Lowest Score</h3>
								<p className="text-2xl font-bold text-primary-toned-700">{attemptsAggregate.lowestScore}%</p>
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}

const formatDateTime = (dateString: string) => {
	try {
		const date = new Date(dateString);
		return format(date, 'MMM dd, yyyy h:mm a');
	} catch (error) {
		return 'Invalid date';
	}
};

const formatSeconds = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	return `${minutes} min${minutes !== 1 ? 's' : ''}`;
};
