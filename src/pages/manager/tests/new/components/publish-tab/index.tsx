import { ExamPersistState } from "../../../../../../infra-test/reducers/exam-persist.store";

export default function PublishTab({
	examPersistState,
	onPublish,
}: {
	examPersistState: ExamPersistState;
	onPublish: () => void;
}) {
	const { config, questions } = examPersistState;

	// Calculate summary statistics
	const totalQuestions = questions.questions.length;
	const totalPoints = questions.questions.reduce((sum, q) => sum + q.points, 0);
	const averagePoints = totalQuestions > 0 ? (totalPoints / totalQuestions).toFixed(1) : 0;

	const formatDateDisplay = (date: Date): string => {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		});
	};

	return (
		<div className="w-full h-full py-6 px-4 bg-gray-50 overflow-y-auto">
			<div className="max-w-4xl mx-auto space-y-6">

				{/* Header */}
				<div className="bg-white rounded-lg shadow-md border border-primary-toned-200 p-6">
					<h1 className="text-2xl font-bold text-primary mb-2">{config.title || "Untitled Exam"}</h1>
					<p className="text-gray-700">{config.description || "No description provided"}</p>
				</div>

				{/* Summary Statistics */}
				<div className="bg-white rounded-lg shadow-md border border-primary-toned-200 p-6">
					<h2 className="text-xl font-semibold text-primary-toned-700 mb-4">Exam Summary</h2>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div className="bg-primary-toned-50 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-primary">{totalQuestions}</div>
							<div className="text-sm text-primary-toned-600">Questions</div>
						</div>
						<div className="bg-primary-toned-50 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-primary">{totalPoints}</div>
							<div className="text-sm text-primary-toned-600">Total Points</div>
						</div>
						<div className="bg-primary-toned-50 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-primary">{averagePoints}</div>
							<div className="text-sm text-primary-toned-600">Avg Points/Question</div>
						</div>
						<div className="bg-primary-toned-50 rounded-lg p-4 text-center">
							<div className="text-2xl font-bold text-primary">{config.minutesToAnswer}</div>
							<div className="text-sm text-primary-toned-600">Minutes</div>
						</div>
					</div>
				</div>

				{/* Exam Configuration */}
				<div className="bg-white rounded-lg shadow-md border border-primary-toned-200 p-6">
					<h2 className="text-xl font-semibold text-primary-toned-700 mb-4">Configuration</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

						{/* Basic Settings */}
						<div className="space-y-3">
							<h3 className="text-lg font-medium text-gray-700 mb-3">Basic Settings</h3>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Language:</span>
									<span className="text-gray-800">{config.language}</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Duration:</span>
									<span className="text-gray-800">{config.minutesToAnswer} minutes</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Password Protected:</span>
									<span className={`px-2 py-1 rounded-full text-xs font-medium ${config.password ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
										}`}>
										{config.password ? "Yes" : "No"}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Attempts Allowed:</span>
									<span className="text-gray-800">
										{config.numberOfAttemptsAllowed ?? "Unlimited"}
									</span>
								</div>
							</div>
						</div>

						{/* Access Settings */}
						<div className="space-y-3">
							<h3 className="text-lg font-medium text-gray-700 mb-3">Access Settings</h3>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Show Answers:</span>
									<span className={`px-2 py-1 rounded-full text-xs font-medium ${config.isAnswerVisible ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
										}`}>
										{config.isAnswerVisible ? "Yes" : "No"}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-medium text-gray-600">Show Others' Results:</span>
									<span className={`px-2 py-1 rounded-full text-xs font-medium ${config.isAllowedToSeeOtherResults ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
										}`}>
										{config.isAllowedToSeeOtherResults ? "Yes" : "No"}
									</span>
								</div>
							</div>
						</div>

						{/* Schedule */}
						<div className="md:col-span-2 space-y-3">
							<h3 className="text-lg font-medium text-gray-700 mb-3">Schedule</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="bg-gray-50 rounded-lg p-4">
									<div className="font-medium text-gray-600 mb-1">Opens At:</div>
									<div className="text-gray-800">{formatDateDisplay(config.openDate)}</div>
								</div>
								<div className="bg-gray-50 rounded-lg p-4">
									<div className="font-medium text-gray-600 mb-1">Closes At:</div>
									<div className="text-gray-800">{formatDateDisplay(config.closeDate)}</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Questions */}
				<div className="bg-white rounded-lg shadow-md border border-primary-toned-200 p-6">
					<h2 className="text-xl font-semibold text-primary-toned-700 mb-4">Questions</h2>

					{totalQuestions === 0 ? (
						<div className="text-center py-8 text-gray-500">
							<p>No questions have been added yet.</p>
						</div>
					) : (
						<div className="space-y-6">
							{questions.questions.map((question, index) => (
								<div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">

									{/* Question Header */}
									<div className="flex justify-between items-start mb-3">
										<div className="flex items-center gap-3">
											<span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
												Q{index + 1}
											</span>
											<h3 className="text-lg font-medium text-gray-800">
												{question.text || "No question text provided"}
											</h3>
										</div>
										<span className="bg-primary-toned-100 text-primary-toned-800 px-3 py-1 rounded-full text-sm font-bold">
											{question.points} {question.points === 1 ? "point" : "points"}
										</span>
									</div>

									{/* Question Options */}
									<div className="space-y-2 ml-12">
										{question.options.map((option, optionIndex) => (
											<div
												key={optionIndex}
												className={`p-3 rounded-md border flex items-start gap-3 ${optionIndex === question.correctOption
													? "border-green-500 bg-green-50"
													: "border-gray-200 bg-white"
													}`}
											>
												<div className={`w-6 h-6 flex items-center justify-center rounded-full flex-shrink-0 ${optionIndex === question.correctOption
													? "bg-green-500 text-white"
													: "bg-gray-200 text-gray-700"
													}`}>
													{String.fromCharCode(65 + optionIndex)}
												</div>
												<span className="text-gray-700">{option || "No option text"}</span>
												{optionIndex === question.correctOption && (
													<span className="ml-auto text-green-600 font-medium text-sm">
														✓ Correct Answer
													</span>
												)}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Footer Note */}
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<div className="flex items-start gap-3">
						<div className="text-blue-600 mt-0.5">
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
							</svg>
						</div>
						<div>
							<h4 className="font-medium text-blue-800 mb-1">Ready to Publish</h4>
							<p className="text-blue-700 text-sm">
								Review all the information above before publishing your exam. Once published, students will be able to access and take this exam according to the configured schedule and settings.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
