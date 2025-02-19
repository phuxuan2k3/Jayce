// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faMagnifyingGlass, faPen,faTrash, faClock, faQuestion } from "@fortawesome/free-solid-svg-icons";
// import { format } from "date-fns";
// import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatetestMutation } from "./createdetail.test-api";
import { TestDetails } from "./types";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { toErrorMessage } from "../../../../error/fetchBaseQuery.error";
import { paths } from "../../../../router/path";

const TestListView = () => {
	const navigate = useNavigate();

	const [snackbar, setSnackbar] = useState<{ snackOpen: boolean; snackMessage: string; snackSeverity: 'error' | 'info' | 'success' | 'warning' }>({ snackOpen: false, snackMessage: '', snackSeverity: 'info' });
	const { snackOpen, snackMessage, snackSeverity } = snackbar;

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, snackOpen: false });
	};

	// const handleCreateNewTest = () => {
	//     navigate("/test/createnew");
	// };
	const [testName, setTestName] = useState('');
	const [testDescription, setTestDescription] = useState('');
	const [testDuration, setTestDuration] = useState(0);
	const [testDifficulty, setTestDifficulty] = useState('');
	const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setter(event.target.value);
	};
	const [createTest, { isSuccess, data, error }] = useCreatetestMutation();
	const errorMessage = toErrorMessage(error);

	const handleCancel = () => {
		navigate("/test/testlistview");
	};

	const handleCreateNewTest = async () => {
		const testDetails: TestDetails = {
			title: testName,
			description: testDescription,
			minutesToAnswer: testDuration,
			difficulty: testDifficulty ? testDifficulty : 'Easy',
		};
		createTest(testDetails);
	};

	useEffect(() => {
		if (errorMessage != null) {
			setSnackbar({
				snackOpen: true,
				snackMessage: 'Failed to create test.',
				snackSeverity: 'error',
			});
		}
		else if (isSuccess && data) {
			setSnackbar({
				snackOpen: true,
				snackMessage: 'Test created successfully.',
				snackSeverity: 'success',
			});
			navigate(paths.TEST.CREATENEWTEST, { state: { testID: data.testID, testTitle: testName, testDescription: testDescription, testDifficulty: testDifficulty, testDuration: testDuration } });
		}

	}, [isSuccess, data, errorMessage]);

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center px-4 ">
				<div className="w-full flex-1 flex-col mt-6 ml-16 text-center">
					<div className="w-full text-4xl font-bold">Create new test</div>
					<div className="w-full text-xl font-semibold pb-10">Fill some information for your test</div>
				</div>

				<div className="w-full max-w-7xl py-6 pt-10 space-y-6">
					<div className="flex items-center space-x-4">
						<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
							Test Name
						</label>
						<input
							type="text"
							placeholder="Enter test name"
							className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
							value={testName}
							onChange={handleInputChange(setTestName)} />
					</div>
					<div className="flex space-x-4">
						<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
							Test Description
						</label>
						<div className="relative w-2/4">
							<textarea
								placeholder="Enter test description"
								className="w-full h-[250px] px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
								value={testDescription}
								onChange={handleInputChange(setTestDescription)}
							/>
							{/* <span className="absolute top-2 left-4 text-gray-400 pointer-events-none">
                                Enter test description
                            </span> */}
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
							Test Duration
						</label>
						<input
							type="text"
							placeholder="Enter test duration"
							className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
							value={testDuration}
							onChange={handleInputChange(setTestDuration)}
						/>
					</div>
					{/* <div className="flex items-center space-x-4">
                        <label className="font-medium text-[var(--primary-color)] text-xl w-1/4">Test Type</label>
                        <div className="flex items-center space-x-4 w-3/4">
                            <label className="flex items-center ">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-[var(--primary-color)]"
                                />
                                <span className="ml-2 text-[var(--primary-color)]">Multiple choice</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-[var(--primary-color)]"
                                />
                                <span className="ml-2 text-[var(--primary-color)]">Essay question</span>
                            </label>
                        </div>
                    </div> */}
					<div className="flex items-center space-x-4">
						<label className="font-medium text-[var(--primary-color)] text-xl w-1/4">
							Difficulty
						</label>
						<select
							className="w-2/4 px-4 py-2 border border-[var(--primary-color)] rounded-md focus:outline-none focus:ring focus:ring-teal-300"
							value={testDifficulty}
							onChange={handleInputChange(setTestDifficulty)}
						>
							<option value="">Select difficulty</option>
							<option value="Easy">Easy</option>
							<option value="Medium">Medium</option>
							<option value="Hard">Hard</option>
						</select>
					</div>
				</div>
				<div className="flex flex-row justify-center">
					<button onClick={handleCancel} className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer">
						Cancel
					</button>
					<button onClick={handleCreateNewTest} className="mt-4 w-fit px-5 font-semibold mr-3 rounded-lg py-2 bg-[var(--primary-color)] border-[var(--primary-color)] text-white border-2 cursor-pointer">
						Next
					</button>
				</div>
			</div>
			<Snackbar
				open={snackOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackSeverity}>
					{snackMessage}
				</Alert>
			</Snackbar>
		</>
	);
}

export default TestListView