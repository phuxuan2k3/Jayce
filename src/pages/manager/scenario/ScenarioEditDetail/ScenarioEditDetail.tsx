import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useGetScenarioMutation, useListFieldMutation } from '../../../../features/Scenario/apis/concrete/chronobreak.scenario-api';
import { Field, Scenario, ScenarioQuestion } from '../../../../features/Scenario/types';

const ScenarioEditDetail = () => {
	const [scenarioDetails, setScenarioDetails] = React.useState<Scenario | null>(null);
	const [questionList, setQuestionList] = React.useState<ScenarioQuestion[]>([]);
	const [fieldList, setFieldList] = React.useState<Field[]>([]);

	const navigate = useNavigate();
	const location = useLocation();
	const scenarioId = location.state?.scenarioId;

	if (!scenarioId) {
		navigate("/scenario/list");
		return null;
	}

	const [getScenarioData] = useGetScenarioMutation();
	const [listFieldMutation] = useListFieldMutation();

	React.useEffect(() => {
		const fetchFieldList = async () => {
			try {
				const response = await listFieldMutation({ ids: [], sort_methods: [], page_index: 0, page_size: 1000 });
				setFieldList(response.data?.fields || []);
			} catch (error) {
				console.error("Error fetching fields", error);
			}
		};

		fetchFieldList();

		if (location.state?.scenarioDetails && location.state?.questionList) {
			setScenarioDetails(location.state.scenarioDetails);
			setQuestionList(location.state.questionList);
		} else {
			const fetchScenario = async () => {
				try {
					const response = await getScenarioData({ id: scenarioId }).unwrap();

					const filteredQuestions = response.scenario.questions.map((question: any) => ({
						content: question.content || "",
						hint: question.hint || "",
						criteria: question.criteria || "",
					}));

					setScenarioDetails(response.scenario);
					setQuestionList(filteredQuestions);
				} catch (error) {
					console.error("Failed to fetch scenario:", error);
				}
			};

			fetchScenario();
		}
	}, [scenarioId, location.state, getScenarioData, listFieldMutation]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setScenarioDetails((prev) => (prev ? { ...prev, [name]: value } : null));
	};

	const handleFieldSelection = (fieldId: number) => {
		setScenarioDetails((prev) => {
			if (!prev) return null;
			const isSelected = prev.fields.some(field => field.id === fieldId);
			return {
				...prev,
				fields: isSelected
					? prev.fields.filter(field => field.id !== fieldId)
					: [...prev.fields, fieldList.find(field => field.id === fieldId)!]
			};
		});
	};

	const handleCancel = () => {
		navigate("/scenario/list");
	};

	const handleNext = async () => {
		try {
			navigate("/scenario/edit/question", { state: { scenarioId, scenarioDetails, questionList } });
		} catch (err) {
			console.error("Failed to edit test detail:", err);
		}
	};

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center justify-center px-4 font-arya">
				<div className="w-full flex-1 flex-col items-center justify-center mt-6 ml-16 text-center">
					<div className="w-full text-4xl font-bold">Edit Scenario</div>
					<div className="w-full text-xl font-semibold pb-10">Edit information for your scenario</div>
				</div>

				<div className="w-full max-w-7xl py-6 pt-10 space-y-6 items-center justify-center">
					<div className="flex justify-center space-x-4">
						<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
							Scenario Name
						</label>
						<input
							id="scenarioName"
							name="name"
							type="text"
							placeholder="Enter scenario's name"
							value={scenarioDetails?.name || ""}
							onChange={handleInputChange}
							className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
						/>
					</div>
					<div className="flex justify-center space-x-4">
						<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
							Scenario Description
						</label>
						<textarea
							id="scenarioDescription"
							name="description"
							placeholder="Enter scenario's description"
							value={scenarioDetails?.description || ""}
							onChange={handleInputChange}
							className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
						/>
					</div>
					<div className="flex justify-center space-x-4">
						<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">Fields</label>
						<div className="w-2/4 flex flex-wrap gap-2 px-4 py-2 border border-[var(--primary-color)] rounded-md max-h-[200px] overflow-y-auto">
							{fieldList.map((field) => (
								<div key={field.id} className="flex items-center space-x-2">
									<input
										type="checkbox"
										checked={scenarioDetails?.fields.some(f => f.id === field.id) || false}
										onChange={() => handleFieldSelection(field.id)}
									/>
									<label>{field.name}</label>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-row justify-center">
					<button
						onClick={handleCancel}
						className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={handleNext}
						className="mt-4 w-fit px-5 font-semibold mr-3 rounded-lg py-2 bg-[var(--primary-color)] border-[var(--primary-color)] text-white border-2 cursor-pointer"
					>
						Next
					</button>
				</div>
			</div>
		</>
	);
}

export default ScenarioEditDetail