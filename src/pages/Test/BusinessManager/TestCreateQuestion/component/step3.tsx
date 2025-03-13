import { faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GradientBorderNotGood from "../../../../../components/ui/border/GradientBorder.notgood";
import React from "react";
import { useLocation } from "react-router-dom";
import { useCriteriaMutation } from "../questionai.test-api";
import { Question } from "../types";
interface Step1Props {
	onNext: () => void;
}

export const Step3: React.FC<Step1Props> = ({ onNext }) => {
	const location = useLocation();
	// const { testID, testTitle, testDescription, testDifficulty, testDuration } = location.state || { testID: null, testTitle: "", testDescription: "", testDifficulty: "", testDuration: 0 };
	const [criteriaList, setCriteriaList] = React.useState<{ criteria: string, optionList: string[], customOption: string }[]>([]);
	const [maxNumberOfQuestions, setMaxNumberOfQuestions] = React.useState<number>(5);
	const [error, setError] = React.useState<string | null>(null);
	const [cooldowns, setCooldowns] = React.useState<number[]>([]);
	const [addAllCooldown, setAddAllCooldown] = React.useState<number>(0);
	const [criteria] = useCriteriaMutation();

	React.useEffect(() => {
		// const fetchCriteria = async () => {
		// 	try {
		// 		const generalInfo = {
		// 			title: testTitle,
		// 			description: testDescription,
		// 			duration: testDuration + " minutes",
		// 			difficulty: testDifficulty,
		// 			maxNumberOfQuestions,
		// 		}

		// 		const input = {
		// 			generalInfo,
		// 			criteriaList: [],
		// 		}

		// 		const { data, error } = await criteria(input);

		// 		if (error) {
		// 			console.log("Error getting criteria:", error);
		// 			setError("An error occurred while getting the criteria. Please try again later.");
		// 		}

		// 		if (data) {
		// 			const newCriteria = data.criteriaList.map((c) => ({ ...c, customOption: "" }));
		// 			setCriteriaList(newCriteria);
		// 		}
		// 	} catch (error) {
		// 		console.log("Error getting criteria:", error);
		// 		setError("An error occurred while getting the criteria. Please try again later.");
		// 	}
		// };

		// fetchCriteria();
	}, []);



	const [questionList, setQuestionList] = React.useState<Question[]>([
		{
			text: "What is the first step in the design process?",
			options: ["Research", "Design", "Develop", "Test"],
			correctAnswer: 0,
			points: 10,
		},
		{
			text: "What is the main purpose of user research?",
			options: ["Identify needs", "Develop code", "Write tests", "Launch product"],
			correctAnswer: 0,
			points: 10,
		},
	]);

	const handlePointChange = (index: number, value: number) => {
		const updatedQuestions = [...questionList];
		updatedQuestions[index].points = value;
		setQuestionList(updatedQuestions);
	};

	const handleQuestionChange = (index: number, newValue: string) => {
		const updatedQuestions = [...questionList];
		updatedQuestions[index].text = newValue;
		setQuestionList(updatedQuestions);
	};

	const handleOptionChange = (questionIndex: number, optionIndex: number, newValue: string) => {
		const updatedQuestions = [...questionList];
		updatedQuestions[questionIndex].options[optionIndex] = newValue;
		setQuestionList(updatedQuestions);
	};

	const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
		const updatedQuestions = [...questionList];
		updatedQuestions[questionIndex].correctAnswer = optionIndex;
		setQuestionList(updatedQuestions);
	};

	const handleAddOption = (index: number) => {
		const updatedQuestions = [...questionList];
		updatedQuestions[index].options.push(`Option ${updatedQuestions[index].options.length + 1}`);
		setQuestionList(updatedQuestions);
	};

	const handleDeleteOption = (questionIndex: number, optionIndex: number) => {
		const updatedQuestions = [...questionList];
		updatedQuestions[questionIndex].options.splice(optionIndex, 1);

		if (updatedQuestions[questionIndex].correctAnswer === optionIndex) {
			updatedQuestions[questionIndex].correctAnswer = 0;
		} else if (updatedQuestions[questionIndex].correctAnswer > optionIndex) {
			updatedQuestions[questionIndex].correctAnswer--;
		}

		setQuestionList(updatedQuestions);
	};

	const handleAddQuestion = () => {
		setQuestionList([
			...questionList,
			{
				text: "New question",
				options: ["Option 1"],
				correctAnswer: 0,
				points: 0,
			},
		]);
	};

	const handleDeleteQuestion = (index: number) => {
		const updatedQuestions = questionList.filter((_, i) => i !== index);
		setQuestionList(updatedQuestions);
	};















	React.useEffect(() => {
		const interval = setInterval(() => {
			setCooldowns((prevCooldowns) =>
				prevCooldowns.map((time) => (time > 0 ? time - 1 : 0))
			);

			setAddAllCooldown((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => clearInterval(interval);
	}, []);


	return (
		<div className="relative">
			<div className="font-arya  pt-12 flex gap-2 items-center  justify-center">
				<div className="flex items-center gap-2 text-[24px]">
					<div className="bg-[var(--primary-color)] rounded-3xl h-10 w-10  text-white font-bold text-center">
						1
					</div>
					<span>
						Overview
					</span>
				</div>
				<div className="w-24">
					<hr className="border-2 border-gray-800" />
				</div>
				<div className="flex items-center gap-2 text-[24px]">
					<div className="bg-[var(--primary-color)] rounded-3xl h-10 w-10  text-white font-bold text-center">
						2
					</div>
					<span>
						Question
					</span>
				</div>
				<div className="w-24">
					<hr className="border-2 border-gray-800" />
				</div>
				<div className="flex items-center gap-2 text-[24px]">
					<div className="bg-gray-300  rounded-3xl h-10 w-10  text-white font-bold text-center">
						3
					</div>
					<span>
						Review
					</span>
				</div>
			</div>
			<div className="w-full flex-grow flex flex-col items-center px-4">
				<div className="w-full flex-1 flex-col mt-6 text-center">
					<div className="w-full text-xl font-semibold font-arya text-[24px]">Now, complete some specific contexts to generate questions... </div>
				</div>

				<div className="w-full max-w-7xl py-6">
					<div className="flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
							<span>Question List ({questionList.length})</span>
						</div>

						{/* Question List */}
						{questionList.map((question, index) => (
							<div key={index} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-between mb-4">
								<span className="w-1/5 font-bold mb-2 opacity-50">
									Question {index + 1}
								</span>

								{/* Question and Options */}
								<div className="w-4/5 flex flex-col">
									{/* Question */}
									<div className="w-11/12 mb-4">
										<GradientBorderNotGood className="w-full h-fit font-semibold">
											<input
												type="text"
												value={question.text}
												onChange={(e) => handleQuestionChange(index, e.target.value)}
												className="w-full bg-transparent border-none outline-none"
											/>
										</GradientBorderNotGood>
									</div>

									{/* Options */}
									{question.options.map((option, optIndex) => (
										<div key={optIndex} className="w-full flex flex-row mt-2" >
											<GradientBorderNotGood className="w-11/12 h-fit">
												<div className="flex items-center justify-between">
													<span className="mr-2">{String.fromCharCode(97 + optIndex)}.</span>
													<input
														type="text"
														value={option}
														onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
														className="flex-grow bg-transparent border-none outline-none"
													/>
													<FontAwesomeIcon
														icon={faXmark}
														className="w-fit text-gray-500 cursor-pointer ml-2"
														onClick={() => handleDeleteOption(index, optIndex)}
													/>
												</div>
											</GradientBorderNotGood>
											<div className="w-1/12 flex items-center justify-center">
												<input
													type="radio"
													name={`question-${index}`}
													checked={question.correctAnswer === optIndex}
													onChange={() => handleAnswerSelect(index, optIndex)}
													className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
												/>
											</div>
										</div>
									))}
									<div className="text-sm text-gray-500 mt-4 cursor-pointer" onClick={() => handleAddOption(index)}>
										<span className="font-semibold text-[var(--primary-color)] underline">+ Add option</span>
									</div>
								</div>

								{/* Points */}
								<div className="w-2/5 h-fit flex justify-end items-center">
									<GradientBorderNotGood className="font-bold w-1/4 mr-2">
										<input
											className="w-full"
											type="number"
											value={question.points}
											onChange={(e) => handlePointChange(index, parseInt(e.target.value) || 0)}
											min="0"
											step="1"
										/>
									</GradientBorderNotGood>
									<FontAwesomeIcon className="w-5 h-5 cursor-pointer" icon={faTrashCan} onClick={() => handleDeleteQuestion(index)} />
								</div>
							</div>
						))}

						<div className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-center mb-4 cursor-pointer" onClick={handleAddQuestion}>
							<FontAwesomeIcon className="w-16 h-16" icon={faPlus} />
						</div>
					</div>
				</div>

				{/* <div className="flex flex-col">
                    {submitError && <div className="text-center text-red-500 mb-8">{submitError}</div>}
                    <div className="flex flex-row justify-center space-x-10">
                        <button className="w-fit px-3 font-semibold rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBack} disabled={isCreating}>
                            Back
                        </button>
                        <button className="w-fit px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={()=>{handleSave(),onNext()}} disabled={isCreating}>
                            {isCreating ? "Creating..." : "Save"}
                        </button>
                    </div>
                </div> */}
			</div>
			<div className="pb-12 flex justify-center ">
				<button className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 " onClick={onNext}>
					Save
				</button>
			</div>
			<div className="absolute top-10 right-10"><img className="w-4" src="https://cdn-icons-png.flaticon.com/512/566/566013.png" alt="" /></div>

		</div>
	)
};
