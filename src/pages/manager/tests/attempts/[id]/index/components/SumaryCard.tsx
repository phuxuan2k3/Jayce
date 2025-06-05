import { ExamCore, TestAggregateCore } from '../../../../../../../infra-test/core/test.model';
import { CandidateCore, ManagerCore } from '../../../../../../../infra-test/core/user.model';
import { AttemptAggregate, AttemptCore } from '../../../../../../../infra-test/core/attempt.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUser,
	faEnvelope,
	faUserTie,
	faCalendarAlt,
	faClock,
	faFileAlt,
	faChartLine,
	faTrophy,
	faStopwatch,
	faCheckCircle,
	faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

interface SummaryCardProps {
	exam: ExamCore;
	testAggregate: TestAggregateCore;
	manager: ManagerCore;
	candidate: CandidateCore;
	attempt: AttemptCore;
	attemptAggregate: AttemptAggregate;
}

export default function SummaryCard({
	exam,
	testAggregate,
	manager,
	candidate,
	attempt,
	attemptAggregate,
}: SummaryCardProps) {
	// Calculate performance metrics
	const totalQuestions = testAggregate.numberOfQuestions;
	const totalPoints = testAggregate.totalPoints;
	const accuracy = attemptAggregate.answered > 0 ? (attemptAggregate.answeredCorrect / attemptAggregate.answered) * 100 : 0;
	const completionRate = (attemptAggregate.answered / totalQuestions) * 100;
	const pointsPerQuestion = totalPoints > 0 ? totalPoints / totalQuestions : 0;
	const earnedPoints = (attempt.score / 100) * totalPoints;

	// Helper functions
	const formatTime = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		if (hours > 0) {
			return `${hours}h ${minutes}m ${secs}s`;
		}
		if (minutes > 0) {
			return `${minutes}m ${secs}s`;
		}
		return `${secs}s`;
	};
	const formatDate = (dateString: string): string => {
		try {
			const date = new Date(dateString);
			return format(date, 'MMM dd, yyyy h:mm a');
		} catch (error) {
			return 'Invalid date';
		}
	};

	const getScoreBadgeColor = (score: number) => {
		if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
		if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
		return 'bg-red-100 text-red-800 border-red-200';
	};

	return (
		<div className="bg-white rounded-lg shadow-md border border-primary-toned-200">
			{/* Header */}
			<div className="bg-primary-toned-50 border-b border-primary-toned-200 p-6 rounded-t-lg">
				<h2 className="text-xl font-bold text-gray-900 mb-2">Exam Attempt Summary</h2>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<FontAwesomeIcon icon={faFileAlt} className="text-primary-toned-600 w-4 h-4" />
						<span className="text-sm text-gray-600">Attempt ID: {attempt.id}</span>
					</div>
					<div className="flex items-center space-x-2">
						{attempt.hasEnded ? (
							<>
								<FontAwesomeIcon icon={faCheckCircle} className="text-green-600 w-4 h-4" />
								<span className="text-sm text-green-600 font-medium">Completed</span>
							</>
						) : (
							<>
								<FontAwesomeIcon icon={faTimesCircle} className="text-yellow-600 w-4 h-4" />
								<span className="text-sm text-yellow-600 font-medium">In Progress</span>
							</>
						)}
					</div>
				</div>
			</div>

			<div className="p-6 space-y-6">
				{/* Candidate Information */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<FontAwesomeIcon icon={faUser} className="text-primary-toned-600 w-5 h-5 mr-2" />
						Candidate Information
					</h3>
					<div className="bg-primary-toned-50 rounded-lg p-4">
						<div className="flex items-center space-x-4">
							{candidate.avatarPath ? (
								<img
									src={candidate.avatarPath}
									alt={candidate.fullname}
									className="w-16 h-16 rounded-full object-cover border-2 border-primary-toned-300"
								/>
							) : (
								<div className="w-16 h-16 rounded-full bg-primary-toned-200 flex items-center justify-center">
									<span className="text-xl font-semibold text-primary-toned-700">
										{candidate.fullname.charAt(0).toUpperCase()}
									</span>
								</div>
							)}
							<div className="flex-1">
								<h4 className="text-lg font-semibold text-gray-900">{candidate.fullname}</h4>
								<div className="space-y-1 text-sm text-gray-600">
									<div className="flex items-center space-x-2">
										<FontAwesomeIcon icon={faUser} className="w-3 h-3 text-gray-400" />
										<span>@{candidate.username}</span>
									</div>
									<div className="flex items-center space-x-2">
										<FontAwesomeIcon icon={faEnvelope} className="w-3 h-3 text-gray-400" />
										<span>{candidate.email}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Exam Information */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<FontAwesomeIcon icon={faFileAlt} className="text-primary-toned-600 w-5 h-5 mr-2" />
						Exam Details
					</h3>
					<div className="bg-gray-50 rounded-lg p-4 space-y-3">
						<div>
							<h4 className="font-semibold text-gray-900">{exam.title}</h4>
							<p className="text-sm text-gray-600 mt-1">{exam.description}</p>
						</div>						<div className="grid grid-cols-2 gap-4 text-sm">
							<div className="flex items-center space-x-2">
								<FontAwesomeIcon icon={faClock} className="w-3 h-3 text-gray-400" />
								<span className="text-gray-600">Duration: {exam.minutesToAnswer} minutes</span>
							</div>
							<div className="flex items-center space-x-2">
								<FontAwesomeIcon icon={faFileAlt} className="w-3 h-3 text-gray-400" />
								<span className="text-gray-600">Questions: {totalQuestions}</span>
							</div>
							<div className="flex items-center space-x-2">
								<FontAwesomeIcon icon={faTrophy} className="w-3 h-3 text-gray-400" />
								<span className="text-gray-600">Total Points: {totalPoints}</span>
							</div>
							<div className="flex items-center space-x-2">
								<FontAwesomeIcon icon={faChartLine} className="w-3 h-3 text-gray-400" />
								<span className="text-gray-600">Points/Question: {pointsPerQuestion.toFixed(1)}</span>
							</div>
						</div>
						<div className="pt-2 border-t border-gray-200">
							<div className="flex items-center space-x-2">
								<FontAwesomeIcon icon={faUserTie} className="w-3 h-3 text-gray-400" />
								<span className="text-xs text-gray-500">
									Created by: {manager.fullname} (@{manager.username})
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Performance Summary */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<FontAwesomeIcon icon={faChartLine} className="text-primary-toned-600 w-5 h-5 mr-2" />
						Performance Summary
					</h3>
					{/* Score Badge */}
					<div className="flex justify-center mb-4">
						<div className={`inline-flex flex-col items-center px-6 py-3 rounded-xl border-2 ${getScoreBadgeColor(attempt.score)}`}>
							<div className="flex items-center mb-1">
								<FontAwesomeIcon icon={faTrophy} className="w-5 h-5 mr-2" />
								<span className="text-2xl font-bold">{attempt.score.toFixed(1)}%</span>
							</div>
							<span className="text-sm font-medium opacity-75">{earnedPoints.toFixed(1)} / {totalPoints} points</span>
						</div>
					</div>{/* Statistics Grid */}
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-blue-50 rounded-lg p-4 text-center">
							<div className="flex items-center justify-center mb-2">
								<FontAwesomeIcon icon={faStopwatch} className="text-blue-600 w-5 h-5" />
							</div>
							<div className="text-lg font-bold text-blue-800">{formatTime(attempt.secondsSpent)}</div>
							<div className="text-xs text-blue-600">Time Spent</div>
						</div>

						<div className="bg-green-50 rounded-lg p-4 text-center">
							<div className="flex items-center justify-center mb-2">
								<FontAwesomeIcon icon={faCheckCircle} className="text-green-600 w-5 h-5" />
							</div>
							<div className="text-lg font-bold text-green-800">{attemptAggregate.answered}</div>
							<div className="text-xs text-green-600">Questions Answered</div>
						</div>

						<div className="bg-purple-50 rounded-lg p-4 text-center">
							<div className="flex items-center justify-center mb-2">
								<FontAwesomeIcon icon={faTrophy} className="text-purple-600 w-5 h-5" />
							</div>
							<div className="text-lg font-bold text-purple-800">{attemptAggregate.answeredCorrect}</div>
							<div className="text-xs text-purple-600">Correct Answers</div>
						</div>

						<div className="bg-yellow-50 rounded-lg p-4 text-center">
							<div className="flex items-center justify-center mb-2">
								<FontAwesomeIcon icon={faChartLine} className="text-yellow-600 w-5 h-5" />
							</div>
							<div className="text-lg font-bold text-yellow-800">{accuracy.toFixed(1)}%</div>
							<div className="text-xs text-yellow-600">Accuracy Rate</div>
						</div>

						<div className="bg-indigo-50 rounded-lg p-4 text-center col-span-2">
							<div className="flex items-center justify-center mb-2">
								<FontAwesomeIcon icon={faTrophy} className="text-indigo-600 w-5 h-5" />
							</div>
							<div className="text-lg font-bold text-indigo-800">{earnedPoints.toFixed(1)} / {totalPoints}</div>
							<div className="text-xs text-indigo-600">Points Earned</div>
						</div>
					</div>
				</div>

				{/* Timeline */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
						<FontAwesomeIcon icon={faCalendarAlt} className="text-primary-toned-600 w-5 h-5 mr-2" />
						Timeline
					</h3>
					<div className="bg-gray-50 rounded-lg p-4 space-y-3 text-sm">
						<div className="flex justify-between items-center">
							<span className="text-gray-600">Started:</span>
							<span className="font-medium text-gray-900">{formatDate(attempt.createdAt)}</span>
						</div>
						{attempt.hasEnded && (
							<div className="flex justify-between items-center">
								<span className="text-gray-600">Completed:</span>
								<span className="font-medium text-gray-900">{formatDate(attempt.updatedAt)}</span>
							</div>
						)}
						<div className="flex justify-between items-center pt-2 border-t border-gray-200">
							<span className="text-gray-600">Completion Rate:</span>
							<span className={`font-medium ${completionRate === 100 ? 'text-green-600' : 'text-yellow-600'}`}>
								{completionRate.toFixed(1)}%
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
