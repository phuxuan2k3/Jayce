import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import GradientBorderNotGood from "../../../../components/ui/border/GradientBorder.notgood";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
// import CircularProgress from '@mui/material/CircularProgress';
import { useCreatenewtestMutation } from "./createquestion.test-api";
import { useCriteriaMutation, useGenerateMutation } from "./questionai.test-api";
import { Question } from "./types";
import { paths } from "../../../../router/path";
import { GenerateQuestion } from "./component/generateQuestion";
// const initGeneralInfo = {
// 	title: "Computer Network Test",
// 	description: "This test is designed to assess candidates's knowledge of computer networks.",
// 	duration: "60 minutes",
// 	difficulty: "Easy",
// 	maxNumberOfQuestions: 10,
// }

const anotherInitCriteriaList = [
	{
		"criteria": "Fields",
		"optionList": [
			"Networking Basics",
			"Network Security",
			"Wireless Networks",
			"IP Addressing",
			"Routing & Switching"
		]
	},
	{
		"criteria": "Target Skills",
		"optionList": [
			"Network Configuration",
			"Troubleshooting",
			"Firewall Management",
			"Bandwidth Optimization",
			"VPN Setup"
		]
	},
	{
		"criteria": "Key Knowledge Areas",
		"optionList": [
			"OSI Model",
			"TCP/IP Protocol Suite",
			"Network Topologies",
			"Subnetting",
			"Network Protocols"
		]
	},
	{
		"criteria": "Seniority",
		"optionList": [
			"Entry-Level",
			"Intermediate",
			"Advanced",
			"Expert"
		]
	}
]

const initCriteriaList = [
	{ criteria: "Criteria 1 Criteria 1 Criteria 1 Criteria 1 Criteria 1 Criteria 1", optionList: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"], customOption: "" },
	{ criteria: "Criteria 2 Criteria 2 Criteria 2 Criteria 2 Criteria 2 Criteria 2", optionList: ["Option 1", "Option 2", "Option 3", "Option 4"], customOption: "" },
	{ criteria: "Criteria 3 Criteria 3 Criteria 3 Criteria 3 Criteria 3 Criteria 3", optionList: ["Option 1", "Option 2", "Option 3", "Option 4"], customOption: "" },
	{ criteria: "Criteria 4 Criteria 4 Criteria 4 Criteria 4 Criteria 4 Criteria 4", optionList: ["Option 1", "Option 2", "Option 3", "Option 4"], customOption: "" },
]

const initSuggestedCriteria = [
	{ criteria: "Criteria 5 Criteria 5 Criteria 5 Criteria 5 Criteria 5 Criteria 5", optionList: ["Option 1", "Option 2", "Option 3", "Option 4"] },
	{ criteria: "Criteria 6 Criteria 6 Criteria 6 Criteria 6 Criteria 6 Criteria 6", optionList: ["Option 1", "Option 2", "Option 3", "Option 4"] },
	{ criteria: "Criteria 7 Criteria 7 Criteria 7 Criteria 7 Criteria 7 Criteria 7", optionList: ["Option 1", "Option 2", "Option 3", "Option 4"] },
	{ criteria: "Criteria 8 Criteria 8 Criteria 8 Criteria 8 Criteria 8 Criteria 8", optionList: ["Option 1", "Option 2", "Option 3", "Option 4"] },
]

const initGeneratedQuestions = [
	{
		questionContent: "What is the first step in the design process?",
		optionList: [
			{ optionContent: "Research", isCorrect: true },
			{ optionContent: "Design", isCorrect: false },
			{ optionContent: "Develop", isCorrect: false },
			{ optionContent: "Test", isCorrect: false },
		],
	},
	{
		questionContent: "What is the main purpose of user research?",
		optionList: [
			{ optionContent: "Identify needs", isCorrect: true },
			{ optionContent: "Develop code", isCorrect: false },
			{ optionContent: "Write tests", isCorrect: false },
			{ optionContent: "Launch product", isCorrect: false },
		],
	},
]

const globalCooldownValue = 2;

const CreateNewTest = () => {
	const location = useLocation();
	const { testID, testTitle, testDescription, testDifficulty, testDuration } = location.state || { testID: null, testTitle: "", testDescription: "", testDifficulty: "", testDuration: 0 };
	const [open, setOpen] = React.useState(false);
	const [criteriaList, setCriteriaList] = React.useState<{ criteria: string, optionList: string[], customOption: string }[]>([]);
	const [chosenCriteria, setChosenCriteria] = React.useState<{ criteria: string, chosenOption: string }[]>([]);
	const [suggestedCriteria, setSuggestedCriteria] = React.useState<{ criteria: string, optionList: string[] }[]>([]);
	const [customCriteria, setCustomCriteria] = React.useState<string>("");
	const [maxNumberOfQuestions, setMaxNumberOfQuestions] = React.useState<number>(5);
	const [generatedQuestions, setGeneratedQuestions] = React.useState<{ questionContent: string; optionList: { optionContent: string, isCorrect: boolean }[] }[]>([]);
	const [error, setError] = React.useState<string | null>(null);
	const [cooldowns, setCooldowns] = React.useState<number[]>([]);
	const [addAllCooldown, setAddAllCooldown] = React.useState<number>(0);
	const [isLoading, setLoading] = React.useState(false);
	const [isGettingMoreCriteria, setIsGettingMoreCriteria] = React.useState(false);
	const [isCreating, setIsCreating] = React.useState(false);
	const [submitError, setSubmmitError] = React.useState<string | null>(null);
	const [criteria] = useCriteriaMutation();
	const [generate] = useGenerateMutation();

	React.useEffect(() => {
		const fetchCriteria = async () => {
			try {
				const generalInfo = {
					title: testTitle,
					description: testDescription,
					duration: testDuration + " minutes",
					difficulty: testDifficulty,
					maxNumberOfQuestions,
				}

				const input = {
					generalInfo,
					criteriaList: [],
				}

				// const newCriteria = anotherInitCriteriaList.map((c) => ({ ...c, customOption: "" }));
				// setCriteriaList(newCriteria);

				const { data, error } = await criteria(input);

				if (error) {
					console.log("Error getting criteria:", error);
					setError("An error occurred while getting the criteria. Please try again later.");
				}

				if (data) {
					const newCriteria = data.criteriaList.map((c) => ({ ...c, customOption: "" }));
					setCriteriaList(newCriteria);
				}
			} catch (error) {
				console.log("Error getting criteria:", error);
				setError("An error occurred while getting the criteria. Please try again later.");
			}
		};

		fetchCriteria();
	}, []);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const navigate = useNavigate();

	const handleBack = () => {
		navigate("/createtest");
	};

	const [createnewtest] = useCreatenewtestMutation();
	const handleSave = async () => {
		setSubmmitError(null);
		setIsCreating(true);
		try {
			if (testID != null) {
				await createnewtest({
					testId: testID,
					questions: questionList,
				}).unwrap();
			}
			navigate(paths.TEST.TESTLISTVIEW);
		} catch (error) {
			setSubmmitError("An error occurred while creating the test. Please try again later.");
			console.error("Lỗi khi tạo bài kiểm tra:", error);
		} finally {
			setIsCreating(false);
		}
	};

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

	const [isCriteriaExpanded, setIsCriteriaExpanded] = React.useState(true);
	const [isGeneratedQuestionExpanded, setIsGeneratedQuestionExpanded] = React.useState(true);

	const toggleCriteriaExpand = () => {
		setIsCriteriaExpanded((prev) => !prev);
	};

	const toggleGeneratedQuestionExpand = () => {
		setIsGeneratedQuestionExpanded((prev) => !prev);
	};

	const handleCriteriaChange = (criteria: string, option: string, isChecked: boolean) => {
		setChosenCriteria((prev) => {
			let updatedCriteria = prev.filter((c) => c.criteria !== criteria);

			const existing = prev.find((c) => c.criteria === criteria);
			let updatedOptions = existing ? existing.chosenOption.split(", ").filter(opt => opt) : [];

			if (isChecked) {
				if (option.trim() !== "" && !updatedOptions.includes(option)) {
					updatedOptions.push(option);
				}
			} else {
				updatedOptions = updatedOptions.filter(opt => opt !== option);
			}

			if (updatedOptions.length > 0) {
				updatedCriteria.push({ criteria, chosenOption: updatedOptions.join(", ") });
			}

			return updatedCriteria;
		});
	};


	const handleCustomOptionChange = (criteria: string, value: string) => {
		setCriteriaList((prev) =>
			prev.map((c) => (c.criteria === criteria ? { ...c, customOption: value } : c))
		);

		setChosenCriteria((prev) => {
			let updatedCriteria = prev.filter((c) => c.criteria !== criteria);

			const existingCriteria = criteriaList.find((c) => c.criteria === criteria);
			let updatedOptions: string[] = [];

			if (existingCriteria) {
				const existingChosen = prev.find((c) => c.criteria === criteria);
				updatedOptions = existingChosen ? existingChosen.chosenOption.split(", ").filter(opt => opt) : [];

				if (existingCriteria.customOption) {
					updatedOptions = updatedOptions.filter(opt => opt !== existingCriteria.customOption);
				}

				if (value.trim() !== "" && existingChosen?.chosenOption.includes(existingCriteria.customOption || "")) {
					updatedOptions.push(value);
				}
			}

			if (updatedOptions.length > 0) {
				updatedCriteria.push({ criteria, chosenOption: updatedOptions.join(", ") });
			}

			return updatedCriteria;
		});
	};

	const handleAddCriteria = (index: number) => {
		const criteriaToAdd = suggestedCriteria[index];

		if (chosenCriteria.some((c) => c.criteria === criteriaToAdd.criteria)) {
			setSuggestedCriteria((prev) => prev.filter((_, i) => i !== index));
			return;
		}

		setCriteriaList((prev) => [
			...prev,
			{
				criteria: criteriaToAdd.criteria,
				optionList: criteriaToAdd.optionList,
				customOption: "",
			},
		]);

		setSuggestedCriteria((prev) => prev.filter((_, i) => i !== index));
	}

	const handleRemoveCriteria = (criteria: string) => {
		setChosenCriteria((prev) => prev.filter((c) => c.criteria !== criteria));
	}

	const handleGetMoreCriteria = async () => {
		setError(null);
		setIsGettingMoreCriteria(true);
		try {
			const generalInfo = {
				title: testTitle,
				description: testDescription,
				duration: testDuration + " minutes",
				difficulty: testDifficulty,
				maxNumberOfQuestions,
			}

			const input = {
				generalInfo,
				criteriaList: chosenCriteria,
			}

			const { data, error } = await criteria(input);

			if (error) {
				console.log("Error getting more criteria:", error);
				setError("An error occurred while getting more criteria. Please try again later.");
			}

			if (data) {
				const newCriteria = data.criteriaList.filter((c) => !criteriaList.some((cl) => cl.criteria === c.criteria));
				setSuggestedCriteria((prev) => [...prev, ...newCriteria]);
			}
		} catch (error) {
			console.log("Error getting more criteria:", error);
			setError("An error occurred while getting more criteria. Please try again later.");
		} finally {
			setIsGettingMoreCriteria(false);
		}
	};

	const handleAddCustomCriteria = async () => {
		if (criteriaList.some((c) => c.criteria === customCriteria)) {
			setCustomCriteria("");
			return;
		}

		setCriteriaList((prev) => [...prev, { criteria: customCriteria, optionList: [], customOption: "" }]);
		setCustomCriteria("");
	};

	const handleAddGeneratedQuestion = (index: number) => {
		const questionToAdd = generatedQuestions[index];

		setQuestionList([
			...questionList,
			{
				text: questionToAdd.questionContent,
				options: questionToAdd.optionList.map((option) => option.optionContent),
				correctAnswer: questionToAdd.optionList.findIndex((option) => option.isCorrect),
				points: 10,
			},
		]);

		setCooldowns((prev) => {
			const updatedCooldowns = [...prev];
			updatedCooldowns[index] = globalCooldownValue;
			return updatedCooldowns;
		});
	};

	const handleAddAllGeneratedQuestions = () => {
		setQuestionList((prev) => [
			...prev,
			...generatedQuestions.map((question) => ({
				text: question.questionContent,
				options: question.optionList.map((option) => option.optionContent),
				correctAnswer: question.optionList.findIndex((option) => option.isCorrect),
				points: 10,
			})),
		]);

		setAddAllCooldown(globalCooldownValue);

		setIsGeneratedQuestionExpanded(true);
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

	const handleMaxNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const maxLimit = 20;
		const value = parseInt(e.target.value) || 0;
		setMaxNumberOfQuestions(value > maxLimit ? maxLimit : value);
	};

	const handleGenerateClick = async (): Promise<void> => {
		setLoading(true);
		setError(null);
		try {
			const generalInfo = {
				title: testTitle,
				description: testDescription,
				duration: testDuration + " minutes",
				difficulty: testDifficulty,
				maxNumberOfQuestions,
			}

			const input = {
				generalInfo,
				criteriaList: chosenCriteria,
			}

			console.log("Input:", input);

			const { data, error } = await generate(input);

			console.log("Output:", data);

			if (error) {
				console.error("Error generating questions:", error);
				setError("An error occurred while generating questions. Please try again later.");
			}

			if (data) {
				setGeneratedQuestions(data.questionList);
				setCooldowns(new Array(data.questionList.length).fill(0));
			}
		} catch (error) {
			console.error("Error generating questions:", error);
			setError("An error occurred while generating questions. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<GenerateQuestion />
			<div className="w-full flex-grow flex flex-col items-center px-4">
				<div className="w-full flex-1 flex-col mt-6 text-center">
					<div className="w-full text-4xl font-bold">Create your test</div>
					<div className="w-full text-xl font-semibold">Fill some information for your test</div>
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

				<div className="flex flex-col">
					{submitError && <div className="text-center text-red-500 mb-8">{submitError}</div>}
					<div className="flex flex-row justify-center space-x-10">
						<button className="w-fit px-3 font-semibold rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBack} disabled={isCreating}>
							Back
						</button>
						<button className="w-fit px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleSave} disabled={isCreating}>
							{isCreating ? "Creating..." : "Save"}
						</button>
					</div>
				</div>
			</div>
			<Button onClick={toggleDrawer(true)} className="fixed bottom-4 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
				<TipsAndUpdatesIcon />
			</Button>
			<Drawer open={open} onClose={toggleDrawer(false)}  >
				<Box sx={{ width: 750, position: "relative" }} role="presentation">
					{/* Header */}
					{/* <Box
						sx={{
							position: "sticky",
							top: 0,
							backgroundColor: "white",
							zIndex: 10,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							padding: "16px",
							borderBottom: "1px solid #ddd",
						}}
					>
						<Typography variant="h6" component="div" fontWeight="bold">
							Question Generator
						</Typography>
						<div className="flex justify-end">
							<div className="w-full flex items-center justify-end">
								<div className="w-full flex items-center justify-end">
									<span className="font-bold mr-1">Max:</span>
									<GradientBorderNotGood className="font-bold w-1/4 h-fit mr-2">
										<input
											className="w-full h-fit"
											type="number"
											value={maxNumberOfQuestions}
											onChange={handleMaxNumberChange}
											min="1"
											step="1"
										/>
									</GradientBorderNotGood>
								</div>
								<button className="bg-gradient-text from-blue-500 to-green-500 text-md font-bold text-white px-6 py-3 rounded-lg mr-5" onClick={handleGenerateClick} disabled={isLoading}>
									{isLoading ? "Generating..." : "Generate"}
								</button>
							</div>

							<IconButton onClick={toggleDrawer(false)} size="small">
								<CloseIcon />
							</IconButton>
						</div>
					</Box> */}


					{/* Content */}
					{/* <Box sx={{ padding: "16px" }}>
						{error && <div className="text-center text-red-500 mt-2 mb-2">{error}</div>}
						<Typography component="div" fontWeight="bold" className="flex items-center cursor-pointer mb-2" onClick={toggleCriteriaExpand}>
							<span>Generation Criteria</span>
							<ArrowForwardIosIcon sx={{ transform: isCriteriaExpanded ? 'rotate(90deg)' : 'none', fontSize: 15, marginLeft: 1 }} />
						</Typography>
						{isCriteriaExpanded && (
							<div className="bg-white rounded-lg shadow-primary p-2 border-r border-b border-solid border-primary">
								{criteriaList.length > 0 ? (
									<>
										{criteriaList.map((criteriaItem, index) => (
											<div key={index} className="flex flex-col mb-4">
												<GradientBorderNotGood className="w-full h-fit mb-2">
													<div className="flex items-center justify-between">
														<Typography variant="body1">{criteriaItem.criteria}</Typography>
														<AutorenewIcon sx={{ fontSize: 20, cursor: 'pointer' }} onClick={() => handleRemoveCriteria(criteriaItem.criteria)} />
													</div>
												</GradientBorderNotGood>
												<div className="grid grid-cols-4 gap-4">
													{criteriaItem.optionList.map((option, optIndex) => (
														<label key={optIndex} className="flex items-center rounded-lg hover:bg-gray-100 cursor-pointer">
															<input
																type="checkbox"
																name={criteriaItem.criteria}
																checked={chosenCriteria.some((c) => c.criteria === criteriaItem.criteria && c.chosenOption.split(", ").includes(option))}
																onChange={(e) => handleCriteriaChange(criteriaItem.criteria, option, e.target.checked)}
																className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
															/>
															<Typography variant="body2" className="ml-2">{option}</Typography>
														</label>
													))}
													<label className="flex items-center rounded-lg hover:bg-gray-100 cursor-pointer">
														<input
															type="checkbox"
															name={criteriaItem.criteria}
															checked={chosenCriteria.some((c) => c.criteria === criteriaItem.criteria && c.chosenOption.split(", ").includes(criteriaItem.customOption || ""))}
															onChange={(e) => handleCriteriaChange(criteriaItem.criteria, criteriaItem.customOption || "", e.target.checked)}
															className="h-4 w-4 border-primary focus:ring-primary accent-primary cursor-pointer"
														/>
														<input
															type="text"
															placeholder="Other"
															className="ml-2 w-5/6 border p-1 rounded-md focus:outline-none"
															value={criteriaItem.customOption || ""}
															onChange={(e) => handleCustomOptionChange(criteriaItem.criteria, e.target.value)}
														/>
													</label>
												</div>
											</div>
										))}
										{suggestedCriteria.length > 0 ? (
											<div className="flex flex-col items-start justify-center">
												{suggestedCriteria.map((criteriaItem, index) => (
													<span key={index} className="text-sm text-blue-700 cursor-pointer" onClick={() => handleAddCriteria(index)}>{criteriaItem.criteria}</span>
												))}
												<div className="flex items-center mt-2">
													<span className="text-sm text-blue-700 mr-2">Other:</span>
													<GradientBorderNotGood className="w-full h-fit">
														<input
															type="text"
															value={customCriteria}
															onChange={(e) => setCustomCriteria(e.target.value)}
															className="w-full bg-transparent border-none outline-none"
															placeholder="Enter custom criteria"
														/>
													</GradientBorderNotGood>
													<button
														className={`ml-2 flex items-center rounded-lg px-2 py-1 text-white cursor-pointer ${customCriteria ? "bg-[var(--primary-color)]" : "bg-gray-500"}`}
														onClick={() => handleAddCustomCriteria()}
														disabled={!customCriteria}
													>
														Add
													</button>
												</div>
											</div>
										) : (
											<div className="flex flex-col items-start justify-center">
												<span className="text-sm text-blue-700 cursor-pointer" onClick={() => handleGetMoreCriteria()}>{isGettingMoreCriteria ? "Showing more..." : "I need more criteria"}</span>
											</div>
										)}
									</>
								) : (
									<div className="text-center text-gray-500">
										No criteria available for this test.
									</div>
								)}
							</div>
						)}
						<Typography component="div" fontWeight="bold" className="flex justify-between items-center mt-4 mb-2">
							<div className="cursor-pointer" onClick={toggleGeneratedQuestionExpand}>
								<span>Generated Questions</span>
								<ArrowForwardIosIcon sx={{ transform: isGeneratedQuestionExpanded ? 'rotate(90deg)' : 'none', fontSize: 15, marginLeft: 1 }} />
							</div>
							{generatedQuestions.length > 0 && (
								<div className="flex justify-end font-normal">
									<button
										className={`flex items-center rounded-lg px-2 py-1 text-white cursor-pointer ${addAllCooldown > 0 ? "bg-gray-500" : "bg-[var(--primary-color)]"}`}
										onClick={handleAddAllGeneratedQuestions}
										disabled={addAllCooldown > 0}
									>
										<AddIcon className="mr-2" /> Add All
									</button>
								</div>
							)}
						</Typography>
						{isGeneratedQuestionExpanded && (
							<>
								{generatedQuestions.length > 0 ? (
									generatedQuestions.map((question, index) => (
										<div key={index} className="bg-white rounded-lg shadow-primary p-2 border-r border-b border-solid border-primary mb-2">
											<div className="flex flex-col mb-4">
												<GradientBorderNotGood className="w-full h-fit mb-2">
													<div className="flex items-center justify-between">
														<Typography variant="body1">{question.questionContent}</Typography>
														<IconButton disabled={cooldowns[index] > 0} onClick={() => handleAddGeneratedQuestion(index)}>
															<AddIcon
																sx={{ fontSize: 20, cursor: 'pointer' }}
															/>
															<Typography variant="body1">Add</Typography>
														</IconButton>
													</div>
												</GradientBorderNotGood>
												<div className="grid grid-cols-2 gap-4">
													{question.optionList.map((option, optIndex) => (
														<div key={optIndex} className="flex items-center rounded-lg">
															<input
																type="radio"
																name={question.questionContent}
																checked={option.isCorrect}
																onChange={() => { }}
																className="h-4 w-4 border-primary accent-primary"
															/>
															<Typography variant="body2" className="ml-2">{option.optionContent}</Typography>
														</div>
													))}
												</div>
											</div>
										</div>
									))
								) : (
									<div className="text-center text-gray-500">
										No questions generated yet. Try adjusting your criteria and generating questions.
									</div>
								)}
							</>
						)}
					</Box> */}
				</Box>
			</Drawer>
		</>
	);
}

export default CreateNewTest;