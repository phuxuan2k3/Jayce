import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateScenarioMutation } from "../../../../features/Scenario/apis/concrete/ekko.scenario-api";
import GradientBorderNotGood from "../../../../components/ui/border/GradientBorder.notgood";

interface ScenarioQuestion {
	content: string;
	hint: string;
	criteria: string;
}

const ScenarioCreateQuestion = () => {
	const location = useLocation();

	const scenarioDetails = location.state?.scenarioDetails || { name: "", description: "", field_ids: [] };
	const [questionList, setQuestionList] = React.useState<ScenarioQuestion[]>(location.state?.questionList || []);

	const [isCreating, setIsCreating] = React.useState(false);
	const [submitError, setSubmmitError] = React.useState<string | null>(null);

	const navigate = useNavigate();

	const handleBack = () => {
		navigate("/scenario/create/detail", { state: { scenarioDetails, questionList } });
	};

	const [createScenario] = useCreateScenarioMutation();

	const handleSave = async () => {
		setSubmmitError(null);
		setIsCreating(true);
		try {
			await createScenario({
				name: scenarioDetails.name,
				description: scenarioDetails.description,
				field_ids: scenarioDetails.field_ids,
				questions: questionList,
			}).unwrap();

			navigate("/scenario/list");
		} catch (error) {
			setSubmmitError("An error occurred while creating the scenario. Please try again later.");
			console.error("Error while creating the scenario:", error);
		} finally {
			setIsCreating(false);
		}
	};

	const handleQuestionChange = (index: number, newValue: string) => {
		const updatedQuestions = [...questionList];
		updatedQuestions[index].content = newValue;
		setQuestionList(updatedQuestions);
	};

	const handleHintsChange = (questionIndex: number, newValue: string) => {
		const updatedQuestions = [...questionList];
		updatedQuestions[questionIndex].hint = newValue;
		setQuestionList(updatedQuestions);
	};

	const handleCriteriaChange = (questionIndex: number, newValue: string) => {
		const updatedQuestions = [...questionList];
		updatedQuestions[questionIndex].criteria = newValue;
		setQuestionList(updatedQuestions);
	};

	const handleAddQuestion = () => {
		setQuestionList([
			...questionList,
			{
				content: "",
				hint: "",
				criteria: "",
			},
		]);
	};

	const handleDeleteQuestion = (index: number) => {
		const updatedQuestions = questionList.filter((_, i) => i !== index);
		setQuestionList(updatedQuestions);
	};

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center px-4 font-arya">
				<div className="w-full flex-1 flex-col mt-6 text-center">
					<div className="w-full text-4xl font-bold">Create a new Scenario</div>
					<div className="w-full text-xl font-semibold">Fill some information for your scenario</div>
				</div>

				<div className="w-full max-w-7xl py-6">
					<div className="flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
							<span>Question List ({questionList.length})</span>
						</div>

						{/* Question List */}
						{questionList.map((question, index) => (
							<div key={index} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-xl p-6 space-x-4  border-primary border  justify-between mb-4">
								<span className="w-1/5 font-bold mb-2 opacity-50">
									Question {index + 1}
								</span>

								{/* Question and Options */}
								<div className="w-4/5 flex flex-col">
									{/* Question */}
									<div className="w-11/12 mb-4">
										<GradientBorderNotGood className="w-full h-fit font-semibold">
											<textarea
												value={question.content}
												placeholder="Enter your question here..."
												onChange={(e) => handleQuestionChange(index, e.target.value)}
												className="w-full bg-transparent border-none outline-none"
												title="This is where you enter the question."
											/>
										</GradientBorderNotGood>
									</div>

									{/* Hint */}
									<div className="w-11/12 mb-4">
										<GradientBorderNotGood className="w-full h-fit font-normal">
											<textarea
												value={question.hint}
												placeholder="Enter hints here..."
												onChange={(e) => handleHintsChange(index, e.target.value)}
												className="w-full bg-transparent border-none outline-none italic"
												title="This is where you enter hints for the question."
											/>
										</GradientBorderNotGood>
									</div>

									{/* Criteria */}
									<div className="w-11/12 mb-4">
										<GradientBorderNotGood className="w-full h-fit font-normal">
											<textarea
												value={question.criteria}
												placeholder="Enter criteria here..."
												onChange={(e) => handleCriteriaChange(index, e.target.value)}
												className="w-full bg-transparent border-none outline-none"
												title="This is where you enter the criteria for the question."
											/>
										</GradientBorderNotGood>
									</div>
								</div>

								{/* Delete Question */}
								<div className="w-2/5 h-fit flex justify-end items-center">
									<FontAwesomeIcon className="w-5 h-5 cursor-pointer" icon={faTrashCan} onClick={() => handleDeleteQuestion(index)} />
								</div>
							</div>
						))}

						<div className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-xl p-6 space-x-4 border border-primary justify-center mb-4 cursor-pointer" onClick={handleAddQuestion}>
							<FontAwesomeIcon className="w-8 h-8" icon={faPlus} />
						</div>
					</div>
				</div>

				<div className="flex flex-col w-full">
					{submitError && <div className="text-center text-red-500 mb-8">{submitError}</div>}
					<div className="flex justify-center flex-row space-x-10">
						<button className="w-fit px-12 font-semibold rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBack} disabled={isCreating}>
							Back
						</button>
						<button className="w-fit px-12 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleSave} disabled={isCreating}>
							{isCreating ? "Creating..." : "Save"}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ScenarioCreateQuestion