import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash, faClock, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { GetManagerTestsApiArg, useGetManagerTestsQuery } from "../../../../features/tests/api/test.api-gen";
import useGetUserId from "../../../../components/hooks/useGetUserId";
import paths from "../../../../router/paths";

type FilterProps = Omit<GetManagerTestsApiArg, "x-user-id">;

const ManagerTestsSelfPage = () => {
	const [snackbar, setSnackbar] = useState<{ snackOpen: boolean; snackMessage: string; snackSeverity: 'error' | 'info' | 'success' | 'warning' }>({ snackOpen: false, snackMessage: '', snackSeverity: 'info' });
	const { snackOpen, snackMessage, snackSeverity } = snackbar;

	const userId = useGetUserId();
	const navigate = useNavigate();

	// TODO: add filter to the tests
	const [filter, setFilter] = useState<FilterProps>({
		page: 1,
		perPage: 10,
	});

	const { data: tests } = useGetManagerTestsQuery({
		...filter,
	}, {
		refetchOnMountOrArgChange: true
	});

	if (!tests) return null;

	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, snackOpen: false });
	};

	const handleClickEditTest = (testId: number) => {
		navigate(paths.manager.tests.in(testId).EDIT);
	};

	const handleClickCreateTest = () => {
		navigate(paths.manager.tests.CREATE);
	};

	const handleTestSubmissionsView = (testId: number) => {
		navigate(paths.manager.tests.in(testId).ATTEMPTS);
	};

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center px-4">
				<div className="w-full flex-1 flex-col mt-6 ml-16">
					<div className="w-full text-4xl font-bold">Welcome to your Test Manager</div>
					<div className="w-full text-xl font-semibold">You can manage all your test here!</div>
				</div>

				<div className="w-full max-w-7xl py-6">
					<div className="flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
							<span>Your test ({tests.data.length})</span>
							<div className="h-full w-fit flex items-center cursor-pointer" onClick={handleClickCreateTest}>
								<div className="h-7 w-7 flex items-center justify-center rounded-lg">
									<FontAwesomeIcon icon={faPlus} rotation={90} />
								</div>

								Add new test
							</div>
						</div>

						{/* Test List */}
						{tests.data.map((test, index) => (
							<div key={index} className="w-4/6 flex-1 flex flex-col bg-white rounded-lg shadow-primary p-6 border-r border-b border-solid border-primary items-between mb-4">
								<div className="flex-1 flex justify-between mb-4">
									<span className="font-bold mb-2 opacity-50">
										{test.answerCount} Questions
									</span>
									<div className="flex items-center space-x-4">

										<div onClick={() => handleClickEditTest(test.id)}>
											<FontAwesomeIcon className="h-5 w-5" icon={faPen} />
										</div>
										<div >
											<FontAwesomeIcon className="h-5 w-5" icon={faTrash} />
										</div>
									</div>
								</div>

								<div className="font-medium mb-8 text-xl">
									Test <span>{test.title}</span>
								</div>
								<div className="mb-8">
									Description of <span>{test.title}</span>
								</div>
								<div className="flex justify-between">
									<div className="flex items-center">
										<div className="flex items-center">
											<FontAwesomeIcon className="h-4 w-4 ml-4" icon={faClock} />
											<span className="ml-2 text-gray-600 text-sm font-medium">{test.minutesToAnswer} minutes</span>
										</div>
										<div className="flex items-center">
											<FontAwesomeIcon className="h-4 w-4 ml-4" icon={faQuestion} />
											{/* <span className="ml-2 text-gray-600 text-sm font-medium">{test.type}</span> */}
										</div>
									</div>
									<div>
										{test.answerCount === null ? (
											<span className="text-red-600 font-semibold">Not graded</span>
										) : (
											<span className="text-primary font-semibold" onClick={() => handleTestSubmissionsView(test.id)}>
												View submissions ({test.answerCount})
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-row justify-center items-center space-x-2 mt-4">
						<button className="w-10 h-10 bg-[#EAF6F8] rounded-full text-md font-bold text-primary border border-primary cursor-pointer rotate-270">
							^
						</button>

						<button className="w-10 h-10 bg-primary rounded-full text-md font-bold text-white border border-primary cursor-pointer">
							1
						</button>

						<button className="w-10 h-10 bg-[#EAF6F8] rounded-full text-md font-bold text-primary border border-primary cursor-pointer rotate-90">
							^
						</button>
					</div>
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

export default ManagerTestsSelfPage