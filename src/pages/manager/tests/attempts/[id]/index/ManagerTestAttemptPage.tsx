import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import GradientBorderNotGood from "../../../../../../components/ui/border/GradientBorder.notgood";
import { useGetUserAttemptsByAttemptIdAnswersQuery, useGetUserAttemptsByAttemptIdQuery, useGetTestsByTestIdQuery } from "../../../../../../features/tests/api/test.api-gen";
import useGetTestIdParams from "../../../../../../features/tests/hooks/useGetTestIdParams";
import useGetAttemptIdParams from "../../../../../../features/tests/hooks/useGetAttemptIdParams";
import paths from "../../../../../../router/paths";

const ManagerTestAttemptPage = () => {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const attemptId = useGetAttemptIdParams();

	const { data: test } = useGetTestsByTestIdQuery({ testId });
	const { data: attempt } = useGetUserAttemptsByAttemptIdQuery({ attemptId });
	const { data: answers } = useGetUserAttemptsByAttemptIdAnswersQuery({
		attemptId,
		page: 1,
		perPage: 10,
	});

	const handleBackToAttemptsList = () => {
		navigate(paths.manager.tests.in(testId).ATTEMPTS);
	}

	if (!test || !attempt || !answers) return null;
	return (
		<>

			<div className="w-full flex-grow flex flex-col items-center px-4">
				<div className="w-full max-w-7xl py-6">
					<div className="flex-col text-center">
						<h1 className="text-2xl font-bold mb-6">Attempt #order</h1>
						<div className="flex flex-col font-semibold">
							<span> Submitter: #name</span>
							<span> Test: {test.title}</span>
						</div>

					</div>

					<div className="flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
							<span>Answer List ({answers.data.length})</span>
							<span>Total Score: {attempt.score}/{attempt.totalScore}</span>
						</div>

						{/* Questions List */}
						{answers.data.map((answer, index) => (
							<div key={index} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-between mb-4">
								<span className="font-bold mb-2 opacity-50">
									Question {index + 1}
								</span>

								{/* Question and Options */}
								<div className="w-3/5 flex flex-col">
									{/* Question */}
									<div className="w-11/12 mb-4">
										<GradientBorderNotGood className="w-full h-fit font-semibold">
											{answer.question.text}
										</GradientBorderNotGood>
									</div>

									{/* Options */}
									{answer.question.options.map((option, optIndex) => (
										<div key={optIndex} className="w-full flex flex-row mt-2" >
											<GradientBorderNotGood className="w-11/12 h-fit">
												{String.fromCharCode(97 + optIndex)}. {option}
											</GradientBorderNotGood>
											<div className="w-1/12 flex items-center justify-center">
												{answer.chosenOption === optIndex ? (
													answer.chosenOption === optIndex ? (
														<span className="text-green-600 font-semibold">
															<FontAwesomeIcon icon={faCircleCheck} />
														</span>
													) : (
														<span className="text-red-600 font-semibold">
															<FontAwesomeIcon icon={faCircleXmark} />
														</span>
													)
												) : null}
											</div>
										</div>
									))}
								</div>

								{/* Points */}
								<GradientBorderNotGood className="font-bold h-fit">
									{answer.chosenOption === answer.question.correctOption ? answer.question.points : 0}
								</GradientBorderNotGood>
							</div>
						))}
					</div>

					<div className="flex flex-row justify-center">
						<button className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBackToAttemptsList}>
							Back
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ManagerTestAttemptPage