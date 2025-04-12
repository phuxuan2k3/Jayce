import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faMagnifyingGlass, faSquarePollHorizontal, faCalendarMinus } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useListAllSubmissionMutation } from "../../../../../features/scenarios/apis/concrete/ekko.scenario-api";
import { useListUsersMutation } from "../../../../../features/scenarios/apis/concrete/bulbasaur.scenario-api";
import { Attempt, Scenario } from "../../../../../features/scenarios/types";
import { useGetScenarioMutation } from "../../../../../features/scenarios/apis/concrete/chronobreak.scenario-api";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { UserInfo } from "../../../../../features/auth/store/authSlice";

const ManagerScenarioSubmissionsPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [isFilterOpen, setIsFilterOpen] = React.useState(false);

	const [currentPage, _setCurrentPage] = React.useState(1);
	const [_totalCount, setTotalCount] = React.useState(0);
	const [_totalPage, setTotalPage] = React.useState(0);
	const pageSize = 1000;
	const [candidateName, setCandidateName] = React.useState("");
	const [dates, setDates] = React.useState({ from: new Date("2000-01-01").toISOString().split("T")[0], to: new Date().toISOString().split("T")[0] });
	const [filterForFetch, setFilterForFetch] = React.useState<{ candidateName: string, dates: { from: string, to: string } }>({ candidateName: "", dates: { from: new Date("2000-01-01").toISOString().split("T")[0], to: new Date().toISOString().split("T")[0] } });

	const scenarioId = location.state?.scenarioId;
	if (!scenarioId) {
		navigate("/scenario/list");
		return null;
	}

	const [scenarioInfo, setScenarioInfo] = React.useState<Scenario | null>(null);
	const [attempts, setAttempts] = React.useState<(Attempt & { candidate_id: number })[]>([]);
	const [users, setUsers] = React.useState<Record<number, UserInfo>>({});

	const [getScenarioData] = useGetScenarioMutation();
	const [fetchUsers] = useListUsersMutation();

	React.useEffect(() => {
		const fetchScenario = async () => {
			try {
				const response = await getScenarioData({ id: scenarioId }).unwrap();

				setScenarioInfo(response.scenario);
			} catch (error) {
				console.error("Failed to fetch scenario:", error);
			}
		};

		fetchScenario();
	}, [scenarioId]);

	const [fetchSubmissionList] = useListAllSubmissionMutation();
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const submissionList = await fetchSubmissionList({
					scenario_id: scenarioId,
					page_index: currentPage - 1,
					page_size: pageSize,
					sort_method: [],
					from: new Date(dates.from).toISOString(),
					to: (() => {
						const date = new Date(dates.to);
						date.setHours(23, 59, 59, 999);
						return date.toISOString();
					})(),
				}).unwrap();
				if (submissionList.submissions) {
					const allAttempts = submissionList.submissions.flatMap(submission =>
						submission.attempts.map(attempt => ({
							...attempt,
							candidate_id: submission.candidate_id,
						}))
					);
					setAttempts(allAttempts);
					setTotalCount(submissionList.total_count);
					setTotalPage(submissionList.total_page);

					const userIds = [...new Set(allAttempts.map(a => a.candidate_id))];
					if (userIds.length > 0) {
						const response = await fetchUsers({ user_ids: userIds }).unwrap();
						const userMap = response.users.reduce((acc: { [x: string]: any; }, user: { id: string | number; }) => {
							acc[user.id] = user;
							return acc;
						}, {} as Record<string, UserInfo>);
						setUsers(userMap);
						console.log(userMap[0])
					}
				}
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};

		fetchData();
	}, [fetchSubmissionList, fetchUsers, currentPage, filterForFetch, scenarioInfo]);

	const handleApplyFilter = () => {
		setFilterForFetch({ candidateName, dates });
		setIsFilterOpen(false);
	};

	function handleGoToSubmissionDetail(attempt: Attempt & { candidate_id: number }): void {
		navigate("/scenario/submission/detail", { state: { scenarioInfo, attempt, submitter: users[attempt.candidate_id]?.metadata?.fullname || "Unknown" } });
	}

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center px-4 font-arya">
				<div className="w-full max-w-7xl py-6 flex flex-col items-center">
					<h1 className="text-3xl text-center text-[var(--primary-color)] font-bold mb-6">{scenarioInfo?.name}</h1>

					<div className="w-full flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
							<span>Submission List</span>
							<div className="h-full w-fit flex items-center">
								<div className="h-7 w-7 bg-[#EAF6F8] flex items-center justify-center rounded-lg cursor-pointer" onClick={() => setIsFilterOpen(true)}>
									<FontAwesomeIcon icon={faSliders} rotation={90} />
								</div>

								<div className="flex items-center ml-4">
									<div className="h-7 w-fit bg-[#EAF6F8] flex items-center justify-center rounded-lg p-2">
										<FontAwesomeIcon className="h-4 w-4 mr-2" icon={faMagnifyingGlass} />
										<input className="bg-[#EAF6F8]" type="text" placeholder="Search for submitter" onChange={(e) => setCandidateName(e.target.value)} />
									</div>
								</div>
							</div>
						</div>

						<div className="w-full flex flex-col items-center max-h-[800px] overflow-y-auto pl-4">
							{attempts.map((attempt, index) => {
								const totalScore = attempt.answers.reduce((sum, answer) => sum + answer.overall, 0);
								const averageScore = attempt.answers.length ? (totalScore / attempt.answers.length).toFixed(2) : "N/A";

								let date;

								if (attempt.base_data.created_at instanceof Timestamp) {
									date = attempt.base_data.created_at.toDate();
								} else {
									date = new Date(attempt.base_data.created_at);
								}

								return (
									<div key={index} className="w-4/6 flex-1 flex flex-col bg-white rounded-lg shadow-primary p-6 border-r border-b border-solid border-primary items-between mb-4">
										<div className="flex-1 flex justify-between mb-4">
											<span className="font-bold mb-2 opacity-50">
												#Attempt {attempt.attempt_number}
											</span>

											<div className="cursor-pointer" onClick={() => handleGoToSubmissionDetail(attempt)}>
												<FontAwesomeIcon className="h-6 w-6" icon={faSquarePollHorizontal} />
											</div>
										</div>

										<div className="font-bold mb-8">
											Submitter: <span className=" font-bold text-[#39A0AD] underline">{users[attempt.candidate_id]?.metadata?.fullname || "Unknown"}</span>
										</div>

										<div className="flex justify-between">
											<div className="flex items-center">
												<div className="flex items-center">
													<FontAwesomeIcon className="h-4 w-4" icon={faCalendarMinus} />
													<span className="ml-2 text-gray-600 text-sm font-medium">{date.toLocaleDateString()}</span>
												</div>
											</div>
											<div>
												<span className="text-primary font-semibold">
													Overall: {averageScore}
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* <div className="flex justify-center items-center">
                        <MyPagination
                            totalPage={totalPage}
                            initialPage={currentPage}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div> */}
				</div>
			</div>

			{isFilterOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-arya">
					<div className="bg-gray-100 p-6 rounded-lg w-100 shadow">
						<h2 className="text-2xl text-center font-bold mb-4">Filter</h2>
						<div className="flex flex-col gap-4 w-full">
							<label className="grid grid-cols-3 items-center justify-between gap-2">
								<span>Date</span>
								<input
									type="date"
									className="h-6 w-32 border-gray-400 border rounded px-2"
									value={dates.from}
									onChange={(e) => setDates({ ...dates, from: new Date(e.target.value).toISOString().split("T")[0] })}
								/>
								<input
									type="date"
									className="h-6 w-32 border-gray-400 border rounded px-2"
									value={dates.to}
									onChange={(e) => setDates({ ...dates, to: new Date(e.target.value).toISOString().split("T")[0] })}
								/>
							</label>
						</div>
						<div className="flex justify-between gap-3 mt-4 mx-12">
							<button className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer" onClick={() => setIsFilterOpen(false)}>Cancel</button>
							<button className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg cursor-pointer" onClick={() => handleApplyFilter()}>Apply</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ManagerScenarioSubmissionsPage