import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import GradientBorderNotGood from "../../../../../../components/ui/border/GradientBorder.notgood";
import { useGetInQuery } from "./testsubmissiondetail-api";
import { useEffect, useState } from "react";
import { Answer } from "../types";

const ManagerTestAttemptPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { submission } = location.state || {};
	const { attemptId, candidateId } = submission || {};
	const { data } = useGetInQuery({ attemptId, candidateId });
	console.log(data);
	const handleGoToSubmissionListView = () => {
		navigate("/test/submission/list");
	};
	const [testInfo, setTestInfo] = useState({
		testNumber: 0,
		submitter: "",
		testName: "",
	});
	const [answerList, setAnswerList] = useState<Answer[]>([]);

	useEffect(() => {
		if (data) {
			// Cập nhật thông tin bài kiểm tra và danh sách câu trả lời
			setTestInfo({
				testNumber: data.testId,
				submitter: "Nguyen Van A", // Giả sử là thông tin mặc định
				testName: data.title,
			});

			if (data.attempts && data.attempts[0]?.answer) {
				setAnswerList(data.attempts[0].answer);
			}
		}
	}, [data]);
	const totalPoints = answerList.reduce(
		(total, item) => (item.chosenAnswer === item.correctAnswer ? total + item.score : total),
		0
	);

	const maxPoints = answerList.reduce((total, item) => total + item.score, 0);

	return (
		<>

			<div className="w-full flex-grow flex flex-col items-center px-4">
				<div className="w-full max-w-7xl py-6">
					<div className="flex-col text-center">
						<h1 className="text-2xl font-bold mb-6">Test Detail: #{testInfo.testNumber}</h1>
						<div className="flex flex-col font-semibold">
							<span> Submitter: {testInfo.submitter}</span>
							<span> Test: {testInfo.testName}</span>
						</div>

					</div>

					<div className="flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
							<span>Answer List ({answerList.length})</span>
							<span>Total Score: {totalPoints}/{maxPoints}</span>
						</div>

						{/* Questions List */}
						{answerList.map((answer, index) => (
							<div key={index} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-between mb-4">
								<span className="font-bold mb-2 opacity-50">
									Question {index + 1}
								</span>

								{/* Question and Options */}
								<div className="w-3/5 flex flex-col">
									{/* Question */}
									<div className="w-11/12 mb-4">
										<GradientBorderNotGood className="w-full h-fit font-semibold">
											{answer.question}
										</GradientBorderNotGood>
									</div>

									{/* Options */}
									{answer.options.map((option, optIndex) => (
										<div key={optIndex} className="w-full flex flex-row mt-2" >
											<GradientBorderNotGood className="w-11/12 h-fit">
												{String.fromCharCode(97 + optIndex)}. {option}
											</GradientBorderNotGood>
											<div className="w-1/12 flex items-center justify-center">
												{answer.chosenAnswer === optIndex ? (
													answer.correctAnswer === optIndex ? (
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
									{answer.chosenAnswer === answer.correctAnswer ? answer.score : 0}
								</GradientBorderNotGood>
							</div>
						))}
					</div>

					<div className="flex flex-row justify-center">
						<button className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleGoToSubmissionListView}>
							Back
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ManagerTestAttemptPage