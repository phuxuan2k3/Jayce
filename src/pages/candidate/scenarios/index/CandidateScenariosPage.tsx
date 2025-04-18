import { useNavigate } from "react-router-dom";
import { FaFilter, FaStar, FaUser, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import * as React from "react";
import { Scenario, SortType } from "../../../../features/scenarios/types";
import { useListAttemptMutation } from "../../../../features/scenarios/apis/concrete/ekko.scenario-api";
import { useListScenarioMutation } from "../../../../features/scenarios/apis/concrete/ekko.scenario-api";
import { useAppSelector } from "../../../../app/hooks";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { authSelectors } from "../../../../features/auth/store/authSlice";
import MyPagination from "../../../../components/ui/common/MyPagination";
import paths from "../../../../router/paths";

const CandidateScenariosPage = () => {
	const navigate = useNavigate();
	const [isFilterOpen, setIsFilterOpen] = React.useState(false);
	const [dates, setDates] = React.useState({ from: new Date("2000-01-01").toISOString().split("T")[0], to: new Date().toISOString().split("T")[0] });
	const [finishFilter, setFinishFilter] = React.useState(false);
	const [favouriteFilter, setFavouriteFilter] = React.useState(false);
	const [sortType, setSortType] = React.useState<"participants" | "rating" | "created_at" | null>(null);
	const [minRating, setMinRating] = React.useState<number>(0);
	const [minParticipant, setMinParticipant] = React.useState<number>(0);
	const [filterForFetch, setFilterForFetch] = React.useState<{ minRating: number, minParticipant: number, dates: { from: string, to: string } }>({ minRating: 0, minParticipant: 0, dates: { from: new Date("2000-01-01").toISOString().split("T")[0], to: new Date().toISOString().split("T")[0] } });

	// const location = useLocation();
	// const field: Field = location.state?.field;
	const [currentPage, setCurrentPage] = React.useState(1);
	const [_, setTotalCount] = React.useState(0);
	const [totalPage, setTotalPage] = React.useState(0);
	const pageSize = 10;

	const authState = useAppSelector(authSelectors.selectUserInfo);
	if (authState === null) navigate('/login');

	const [scenarios, setScenarios] = React.useState<(Scenario & { attempted: boolean; hasFetched: boolean })[]>([]);

	const handlePractice = (scenarioId: number) => {
		navigate(paths.candidate.scenarios.in(scenarioId)._layout, { state: { scenarioId } });
	};

	const [listScenarioMutation] = useListScenarioMutation();
	React.useEffect(() => {
		const fetchScenarios = async () => {
			try {
				const response = await listScenarioMutation({
					bm_ids: [],
					sort_methods: sortType ? [{ name: sortType, type: SortType.SORT_TYPE_DESC }] : [],
					page_index: currentPage - 1,
					page_size: pageSize,
					is_finished: finishFilter,
					is_favorite: favouriteFilter,
					field_ids: [],
					from: new Date(dates.from).toISOString(),
					to: (() => {
						const date = new Date(dates.to);
						date.setHours(23, 59, 59, 999);
						return date.toISOString();
					})(),
					min_rating: minRating,
					min_participant: minParticipant,
				});
				console.log("Error", response.error);
				console.log("Request", response.data?.request);
				const fetchedScenarios = response.data?.scenario || [];
				console.log("Fetched scenarios", fetchedScenarios);
				const scenariosWithStatus = fetchedScenarios.map(scenario => ({
					...scenario,
					attempted: false,
					hasFetched: false,
				}));
				setScenarios(scenariosWithStatus);
				setTotalCount(response.data?.total_count || 0);
				setTotalPage(response.data?.total_page || 0);
			} catch (error) {
				console.log("Error fetching scenarios", error);
			}
		}

		fetchScenarios();
	}, [currentPage, finishFilter, favouriteFilter, sortType, filterForFetch]);

	const [listAttemptMutation] = useListAttemptMutation();
	React.useEffect(() => {
		const fetchAttempts = async () => {
			try {
				const updatedScenarios = [...scenarios];

				for (let scenario of updatedScenarios) {
					if (scenario.hasFetched) continue;

					const response = await listAttemptMutation({
						scenario_id: scenario.id,
						page_index: 0,
						page_size: 1000,
						sort_method: [],
					}).unwrap();

					const isAttempted = response.attempts.length > 0;
					scenario.attempted = isAttempted;
					scenario.hasFetched = true;
				}

				setScenarios(updatedScenarios);
			} catch (error) {
				console.log("Error fetching attempts", error);
			}
		};

		if (scenarios.length > 0 && scenarios.some(scenario => !scenario.hasFetched)) {
			fetchAttempts();
		}
	}, [scenarios]);

	const handleApplyFilter = () => {
		setFilterForFetch({ minRating, minParticipant, dates });
		setIsFilterOpen(false);
	};

	return (
		<>
			<div className="mx-12 font-arya">
				<div className="text-3xl font-extrabold">Scenarios</div>
				<div className="mt-2 text-[var(--primary-color)]">You can practice interview skills with multiple situations</div>
				<div className=" flex justify-between">
					<div className="flex gap-3 mt-8">
						<div className={`rounded-lg bg-[var(--primary-color)] px-4 py-2 font-bold text-white cursor-pointer ${sortType === "participants" ? 'text-secondary' : ''}`} onClick={() => sortType === "participants" ? setSortType(null) : setSortType("participants")}> Most Popular</div>
						<div className={`rounded-lg bg-[var(--primary-color)] px-4 py-2 font-bold text-white cursor-pointer ${sortType === "rating" ? 'text-secondary' : ''}`} onClick={() => sortType === "rating" ? setSortType(null) : setSortType("rating")}> Top Rated</div>
						<div className={`rounded-lg bg-[var(--primary-color)] px-4 py-2 font-bold text-white cursor-pointer ${sortType === "created_at" ? 'text-secondary' : ''}`} onClick={() => sortType === "created_at" ? setSortType(null) : setSortType("created_at")}> Newest</div>
						<div className="rounded-lg bg-[var(--primary-color)] px-4 py-2 font-bold text-white flex items-center cursor-pointer" onClick={() => setIsFilterOpen(true)}> <FaFilter /></div>
					</div>
					<div className="flex gap-6">
						<label className="inline-flex items-center">
							<input type="checkbox" className="h-6 w-6 border-2 border-gray-400 checked:bg-green-500 checked:border-green-500 cursor-pointer" onClick={() => setFinishFilter(!finishFilter)} />
							<span className="ml-2">Finished</span>
						</label>
						<label className="inline-flex items-center">
							<input type="checkbox" className="h-6 w-6 border-2 border-gray-400 checked:bg-green-500 checked:border-green-500 cursor-pointer" onClick={() => setFavouriteFilter(!favouriteFilter)} />
							<span className="ml-2">Favourite</span>
						</label>
					</div>
				</div>
				<div className="grid grid-colums-1 mt-12">
					{scenarios.map((scenario, index) => {
						let date;

						if (scenario.base_data.created_at instanceof Timestamp) {
							date = scenario.base_data.created_at.toDate();
						} else {
							date = new Date(scenario.base_data.created_at);
						}

						return (
							<div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 ">
								<div className="text-xl font-bold mb-3 cursor-pointer hover:text-primary" onClick={() => handlePractice(scenario.id)}>{scenario.name}</div>
								<div className="text-sm text-gray-600">{scenario.description}</div>
								<div className="mt-4 flex justify-between items-center text-gray-500">
									<div className="flex gap-10 items-center">
										<div className="text-sm flex gap-2">{Number.isInteger(scenario.rating) ? scenario.rating : scenario.rating.toFixed(2)} <FaStar className="text-gray-500" /></div>
										<div className="text-sm flex gap-2">{scenario.total_participant} <FaUser /></div>
										<div className="text-sm flex gap-2">{date.toLocaleDateString()}<FaCalendarAlt /></div>
										<div className={`px-3 py-1 rounded-lg text-sm font-medium ${scenario.attempted ? 'bg-[var(--primary-color)] text-white' : 'text-gray-500 border border-gray-500'}`}>
											{scenario.attempted ? "Attempted" : "Not Attempted"}
										</div>
									</div>
									<div className="rounded-lg bg-[var(--primary-color)] py-1 px-4 font-bold text-white flex gap-2 items-center cursor-pointer" onClick={() => handlePractice(scenario.id)} ><FaArrowRight /> Practice</div>
								</div>
							</div>
						);
					})}

					<div className="flex justify-center items-center">
						<MyPagination
							totalPage={totalPage}
							initialPage={currentPage}
							onPageChange={(page) => setCurrentPage(page)}
						/>
					</div>
				</div>
			</div>

			{isFilterOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-arya">
					<div className="bg-gray-100 p-6 rounded-lg w-100 shadow">
						<h2 className="text-2xl text-center font-bold mb-4">Filter</h2>
						<div className="flex flex-col gap-4 w-full">
							<label className="grid grid-cols-3 items-center justify-between gap-2">
								<span>Minimum Participants</span>
								<span></span>
								<input
									type="number"
									className="h-6 w-32 border-gray-400 border rounded px-2"
									value={minParticipant}
									min={0}
									onChange={(e) => setMinParticipant(Number(e.target.value))}
								/>
							</label>
							<label className="grid grid-cols-3 items-center justify-between gap-2">
								<span>Minimum Ratings</span>
								<span></span>
								<input
									type="number"
									className="h-6 w-32 border-gray-400 border rounded px-2"
									value={minRating}
									min={0}
									onChange={(e) => setMinRating(Math.min(Number(e.target.value), 5))}
								/>
							</label>
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

export default CandidateScenariosPage;