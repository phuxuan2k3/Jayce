import { useCallback, useState } from 'react'
import { QuestionAggregate, QuestionCore } from '../../../../../../../infra-test/core/question.model'

export default function QuestionManageCard({
	index,
	totalAttempts,
	question,
	questionAggregate,
}: {
	index: number;
	totalAttempts: number;
	question: QuestionCore;
	questionAggregate: QuestionAggregate;
}) {
	const [showStatistics, setShowStatistics] = useState(false);
	const { correctOption, options, points, text } = question;
	const { numberOfAnswers, numberOfCorrectAnswers, averagePoints } = questionAggregate;

	// Calculate percentage of correct answers
	const correctAnswerPercentage = numberOfAnswers > 0
		? Math.round((numberOfCorrectAnswers / numberOfAnswers) * 100)
		: 0;

	const renderOptions = useCallback(() => {
		return options.map((option, index) => (
			<div
				key={index}
				className={`p-2 text-gray-700 border border-gray-300 rounded-md 
					${index === correctOption
						? 'bg-green-100 border-green-500'
						: 'bg-gray-50'
					}`}
			>
				<div className="flex items-center">
					<div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${index === correctOption ? 'bg-green-500 text-white' : 'bg-gray-200'
						}`}>
						{String.fromCharCode(65 + index)}
					</div>
					<span>{option}</span>
				</div>
			</div>
		));
	}, [options, correctOption]);

	return (
		<div className="bg-primary-toned-50 border border-primary rounded-lg shadow-md py-4 px-6 flex flex-col gap-2 text-primary-toned-700">
			<div className="mt-2 flex justify-between items-center">
				<h3 className="text-lg font-semibold">Question #{index + 1}</h3>
				<div className="bg-primary-toned-100 text-primary-toned-800 px-3 py-1 rounded-full text-sm font-bold">
					Points: {points}
				</div>
			</div>

			<hr className='border-primary-toned-300 my-2' />

			<p className="font-bold"><span>Question</span>: {text}</p>
			<hr className='border-primary-toned-300 my-2' />

			<div className='flex flex-col gap-2'>
				{renderOptions()}
			</div>

			{/* Statistics */}
			<div className="mt-2">
				<button
					className="flex w-full items-center justify-between  text-primary-toned-900 font-semibold px-4 py-2 rounded-md hover:bg-primary-toned-100 transition-colors duration-200"
					onClick={() => setShowStatistics(!showStatistics)}
				>
					<span className="">Question Statistics</span>
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

				<div
					className={`overflow-hidden transition-all duration-300 ease-in-out ${showStatistics ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
						}`}
				>
					<hr className='border-primary-toned-300 my-2' />

					<div className="flex flex-col gap-4 p-2">
						{/* Statistics cards */}
						<div className="grid grid-cols-4 gap-4">
							<div className="bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
								<p className="text-xs text-gray-500">Total Attempts</p>
								<div className="flex items-center gap-2">
									<svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
									</svg>
									<p className="font-semibold">{totalAttempts}</p>
								</div>
							</div>

							<div className="bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
								<p className="text-xs text-gray-500">Number of Answers</p>
								<div className="flex items-center gap-2">
									<svg className="w-4 h-4 text-primary-toned-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
									</svg>
									<p className="font-semibold">{numberOfAnswers}</p>
								</div>
							</div>
							<div className="bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
								<p className="text-xs text-gray-500">Correct Answers</p>
								<div className="flex items-center gap-2">
									<svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
									</svg>
									<p className="font-semibold">{numberOfCorrectAnswers}</p>
								</div>
							</div>
							<div className="bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
								<p className="text-xs text-gray-500">Average Points</p>
								<div className="flex items-center gap-2">
									<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
									</svg>
									<p className="font-semibold">{averagePoints.toFixed(1)}</p>
								</div>
							</div>
						</div>

						{/* Visualization: Attempts & Answers Bar Chart */}
						<div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
							<h4 className="text-sm font-semibold text-primary-toned-800 mb-2">Attempts & Answers Overview</h4>
							<div className="flex justify-between text-xs mb-2">
								<span className="text-gray-600">Total Attempts</span>
								<span className="font-bold text-blue-600">{totalAttempts}</span>
							</div>
							<hr className='border-gray-300 my-2' />

							<div className="flex flex-col gap-3">

								{/* Number of Answers */}
								<div>
									<div className="flex justify-between text-xs mb-1">
										<span className="text-gray-600">Number of Answers</span>
										<span className="font-bold text-primary-toned-700">{numberOfAnswers}</span>
									</div>
									<div className="w-full h-2 bg-primary-toned-100 rounded-full">
										<div
											className="h-2 bg-primary-toned-700 rounded-full transition-all duration-300"
											style={{ width: `${totalAttempts > 0 ? Math.round((numberOfAnswers / totalAttempts) * 100) : 0}%` }}
										></div>
									</div>
								</div>
								{/* Number of Correct Answers */}
								<div>
									<div className="flex justify-between text-xs mb-1">
										<span className="text-gray-600">Correct Answers</span>
										<span className="font-bold text-green-600">{numberOfCorrectAnswers}</span>
									</div>
									<div className="w-full h-2 bg-green-100 rounded-full">
										<div
											className="h-2 bg-green-500 rounded-full transition-all duration-300"
											style={{ width: `${numberOfAnswers > 0 ? Math.round((numberOfCorrectAnswers / numberOfAnswers) * 100) : 0}%` }}
										></div>
									</div>
								</div>

								{/* Success rate */}
								<div>
									<div className="flex justify-between text-xs mb-1">
										<span className="text-gray-600">Success Rate</span>
										<span className="font-bold text-green-600">{correctAnswerPercentage}%</span>
									</div>
									<div className="w-full h-2 bg-green-100 rounded-full">
										<div
											className={`h-2 rounded-full ${correctAnswerPercentage >= 70 ? 'bg-green-500' :
												correctAnswerPercentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
												}`}
											style={{ width: `${correctAnswerPercentage}%` }}
										></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
