import { GetUserAttemptsByAttemptIdAnswersApiResponse } from '../../../../../../../features/tests/api/test.api-gen'

export default function AttemptCard({
	answer,
	index,
}: {
	answer: GetUserAttemptsByAttemptIdAnswersApiResponse["data"][number];
	index: number;
}) {
	const answerState: "correct" | "notAnswered" | "incorrect" = answer.chosenOption !== null && answer.question.correctOption === answer.chosenOption
		? "correct"
		: answer.chosenOption == null || answer.chosenOption === -1
			? "notAnswered"
			: "incorrect";

	const answerClass = () => {
		switch (answerState) {
			case "correct":
				return "bg-green-100 text-green-700";
			case "notAnswered":
			case "incorrect":
				return "bg-red-100 text-red-700";
		}
	}

	return (
		<div className="flex gap-4">
			<div className='flex flex-col items-stretch mt-2'>
				<span className="font-bold mb-2 opacity-50">
					Question {index + 1}
				</span>
				<div className={`px-4 text-sm font-bold rounded-full ${answerClass()}`}>{answer.question.points} Points</div>
				{answerState === "notAnswered" && <div className="text-sm font-semibold text-gray-500">Not answered</div>}
			</div>

			<div className="flex-1 flex flex-col">
				<div className={`"w-full font-bold px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 mb-2 ${answerState === "correct"
					? "text-green-700 bg-green-100"
					: "text-red-700 bg-red-100"
					}`}>
					{answer.question.text}
				</div>
				{answer.question.options.map((option, index) => (
					<div key={index} className={`py-1 px-2 w-full flex items-center gap-2 justify-start border border-gray-300 rounded-lg mt-2  ${index === answer.question.correctOption
						? "text-green-700 bg-green-100"
						: index === answer.chosenOption
							? " text-red-700 bg-red-100"
							: "bg-gray-50"}
							`}>
						<span>{String.fromCharCode(97 + Number(index))}.
						</span>
						<span>{option}</span>
					</div>
				))}
			</div>
		</div>
	);
}
