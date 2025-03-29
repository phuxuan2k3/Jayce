import { faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GradientBorderNotGood from "../../../../../components/ui/border/GradientBorder.notgood";
import React from "react";
interface Step1Props {
	onNext: () => void;
	generatedData: any;
	setGeneratedData: (data: any) => void;
}

export const Step3: React.FC<Step1Props> = ({ onNext, generatedData, setGeneratedData }) => {
	const [questionList, setQuestionList] = React.useState<any[]>(
		generatedData.questionList
	);

	const handleQuestionChange = (index: number, newContent: string) => {
		setQuestionList((prevQuestions) =>
			prevQuestions.map((question, i) =>
				i === index ? { ...question, questionContent: newContent } : question
			)
		);
	};

	const handleOptionChange = (qIndex: number, optIndex: number, newContent: string) => {
		setQuestionList((prevQuestions) =>
			prevQuestions.map((question, i) =>
				i === qIndex
					? {
						...question,
						optionList: question.optionList.map((option: any, j: any) =>
							j === optIndex ? { ...option, optionContent: newContent } : option
						),
					}
					: question
			)
		);
	};
	const handleDeleteOption = (qIndex: number, optIndex: number) => {
		setQuestionList((prevQuestions) =>
			prevQuestions.map((question, i) =>
				i === qIndex
					? {
						...question,
						optionList: question.optionList.filter((_: any, j: any) => j !== optIndex),
					}
					: question
			)
		);
	};
	const handleAnswerSelect = (qIndex: number, optIndex: number) => {
		setQuestionList((prevQuestions) =>
			prevQuestions.map((question, i) =>
				i === qIndex
					? {
						...question,
						optionList: question.optionList.map((option: any, j: any) => ({
							...option,
							isCorrect: j === optIndex, // Chỉ một option là đúng
						})),
					}
					: question
			)
		);
	};


	const handleAddQuestion = () => {
		setQuestionList((prevQuestions) => [
			...prevQuestions,
			{
				questionContent: "",
				optionList: [
					{ optionContent: "", isCorrect: true },
					{ optionContent: "", isCorrect: false },
					{ optionContent: "", isCorrect: false },
					{ optionContent: "", isCorrect: false },
				],
			},
		]);
	};



	const handleDeleteQuestion = (index: number) => {
		const updatedQuestions = questionList.filter((_, i) => i !== index);
		setQuestionList(updatedQuestions);
	};
	const handleAddOption = (qIndex: number) => {
		setQuestionList((prevQuestions) =>
			prevQuestions.map((question, i) =>
				i === qIndex
					? {
						...question,
						optionList: [
							...question.optionList,
							{ optionContent: "", isCorrect: false },
						],
					}
					: question
			)
		);
	};
	const handleSave = () => {
		setGeneratedData(questionList);
		onNext();
	};


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
												value={question.questionContent}
												onChange={(e) => handleQuestionChange(index, e.target.value)}
												className="w-full bg-transparent border-none outline-none"
											/>
										</GradientBorderNotGood>
									</div>

									{/* Options */}
									{question.optionList.map((option: { optionContent: string, isCorrect: boolean }, optIndex: number) => (
										<div key={optIndex} className="w-full flex flex-row mt-2" >
											<GradientBorderNotGood className="w-11/12 h-fit">
												<div className="flex items-center justify-between">
													<span className="mr-2">{String.fromCharCode(97 + optIndex)}.</span>
													<input
														type="text"
														value={option.optionContent}
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
													checked={option.isCorrect}
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
											value={10}
											// onChange={(e) => handlePointChange(index, parseInt(e.target.value) || 0)}
											min="0"
											step="1"
										/>
									</GradientBorderNotGood>
									<FontAwesomeIcon className="w-5 h-5 cursor-pointer" icon={faTrashCan} onClick={() => handleDeleteQuestion(index)} />
								</div>
							</div>
						))}

						<div onClick={() => handleAddQuestion()} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-4 border-r border-b border-solid border-primary justify-center mb-4 cursor-pointer">
							<FontAwesomeIcon className="w-16 h-16" icon={faPlus} />
						</div>
					</div>
				</div>


			</div>
			<div className="pb-12 flex justify-center ">
				<button className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 " onClick={() => handleSave()}>
					Save
				</button>
			</div>
			<div className="absolute top-10 right-10"><img className="w-4" src="https://cdn-icons-png.flaticon.com/512/566/566013.png" alt="" /></div>

		</div>
	)
};
