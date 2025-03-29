import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faList, faPen, faPlus, faStar, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { useListScenarioMutation, useDeleteScenarioMutation } from "../../APIs/ekko.scenario-api";
import { Scenario } from "../../APIs/types";
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
import MyPagination from "../../../Test/components/MyPagination";
import { selectUserInfo } from "../../../../features/Auth/store/authSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const ScenarioListView = () => {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [selectedScenario, setSelectedScenario] = React.useState<Scenario | null>(null);
	const [scenarios, setScenarios] = React.useState<Scenario[]>([]);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [totalPage, setTotalPage] = React.useState(1);
	const [from, setFrom] = React.useState<Timestamp>(new Timestamp());
	const [to, setTo] = React.useState<Timestamp>(new Timestamp());
	const pageSize = 4;

	const authState = useAppSelector(selectUserInfo);
	if (authState === null) navigate('/login');

	const [listScenario] = useListScenarioMutation();
	const [deleteScenario] = useDeleteScenarioMutation();

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await listScenario({ bm_ids: [Number(authState?.id)], sort_methods: [], page_index: currentPage - 1, page_size: pageSize, field_ids: [], min_rating: 0, min_participant: 0 }).unwrap();
				if (response.scenario) {
					setScenarios(response.scenario || []);
					setTotalPage(response.total_page);
					console.log("Scenarios:", response.scenario);
				}
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};

		fetchData();
	}, [authState, currentPage]);

	const handleGoToCreateScenario = () => {
		navigate("/scenario/create/detail");
	};

	const handleGoToEditScenario = (id: number) => {
		navigate("/scenario/edit/detail", { state: { scenarioId: id } });
	};

	const handleGoToScenarioSubmissionListView = (id: number) => {
		navigate("/scenario/submission", { state: { scenarioId: id } });
	};

	const handleOpenDialog = (scenario: Scenario) => {
		setSelectedScenario(scenario);
		setOpen(true);
	};

	const handleCloseDialog = () => {
		setOpen(false);
		setSelectedScenario(null);
	};

	const handleConfirmDelete = async () => {
		if (selectedScenario) {
			try {
				await deleteScenario({ ids: [selectedScenario.id] }).unwrap();
				setOpen(false);
				setSelectedScenario(null);

				const response = await listScenario({ bm_ids: [Number(authState?.id)], sort_methods: [], page_index: currentPage - 1, page_size: pageSize, field_ids: [], min_rating: 0, min_participant: 0 }).unwrap();
				if (response.scenario) {
					setScenarios(response.scenario || []);
				}
			} catch (error) {
				console.error("Error deleting scenario:", error);
			}
		}
	};

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center px-4 font-arya">
				<div className="w-full flex-1 flex-col mt-6 ml-16">
					<div className="w-full text-4xl font-bold">Manage your Scenarios</div>
					<div className="w-full text-xl font-semibold">You can manage all your scenarios here!</div>
				</div>

				<div className="w-full max-w-7xl py-6">
					<div className="flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
							<span>Your scenarios ({scenarios.length})</span>
							<div className="h-full w-fit flex items-center cursor-pointer" onClick={() => handleGoToCreateScenario()}>
								<div className="h-7 w-7 flex items-center justify-center rounded-lg">
									<FontAwesomeIcon icon={faPlus} rotation={90} />
								</div>

								Add new test
							</div>
						</div>

						{/* Scenario List */}
						{scenarios.map((scenario, index) => {
							let date;

							if (scenario.base_data.created_at instanceof Timestamp) {
								date = scenario.base_data.created_at.toDate();
							} else {
								date = new Date(scenario.base_data.created_at);
							}

							return (
								<div key={index} className="w-4/6 flex-1 flex flex-col bg-white rounded-lg shadow-primary p-6 border-r border-b border-solid border-primary items-between mb-4">
									<div className="font-bold mb-8 text-xl">
										<span>{scenario.name}</span>
									</div>
									<div className="mb-8">
										<span>{scenario.description}</span>
									</div>

									<div className="flex-1 flex justify-around mb-2">
										<div className="w-1/2 flex items-center justify-start font-semibold opacity-50 space-x-6">
											<span>
												{Number.isInteger(scenario.rating) ? scenario.rating : scenario.rating.toFixed(2)} <FontAwesomeIcon icon={faStar} />
											</span>
											<span>
												{scenario.total_participant.toLocaleString('de-DE')} <FontAwesomeIcon icon={faUser} />
											</span>
											<span>
												{date.toLocaleDateString()} <FontAwesomeIcon icon={faCalendarDays} />
											</span>
										</div>
										<div className="w-1/2 flex items-center justify-end space-x-5">
											<div className="flex items-center justify-center border border-primary p-3 rounded-md bg-[#e1c03e] cursor-pointer" onClick={() => handleGoToScenarioSubmissionListView(scenario.id)}>
												<FontAwesomeIcon className="h-5 w-5" icon={faList} />
											</div>
											<div className="flex items-center justify-center border border-primary p-3 rounded-md bg-[#d5eef1] cursor-pointer" onClick={() => handleGoToEditScenario(scenario.id)}>
												<FontAwesomeIcon className="h-5 w-5" icon={faPen} />
											</div>
											<div className="flex items-center justify-center border border-primary p-3 rounded-md bg-[#ff807c] cursor-pointer" onClick={() => handleOpenDialog(scenario)}>
												<FontAwesomeIcon className="h-5 w-5" icon={faTrash} />
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className="flex justify-center items-center">
						<MyPagination
							totalPage={totalPage}
							initialPage={currentPage}
							onPageChange={(page) => setCurrentPage(page)}
						/>
					</div>
				</div>
			</div>

			<BootstrapDialog className="" onClose={handleCloseDialog} open={open}>
				<div className="bg-[#eaf6f8] rounded-sm shadow-primary p-4 border border-solid border-primary">
					<DialogContent className="mb-4">
						<span>Do you really want to delete "{selectedScenario?.name}" Scenario?</span>
					</DialogContent>
					<DialogActions className="flex items-center justify-evenly mb-4">
						<button className="w-1/4 px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleCloseDialog}>
							No
						</button>
						<button className="w-1/4 px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleConfirmDelete}>
							Yes
						</button>
					</DialogActions>
				</div>
			</BootstrapDialog>
		</>
	);
}

export default ScenarioListView