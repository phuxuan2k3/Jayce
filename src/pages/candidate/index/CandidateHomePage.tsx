import * as React from "react";
import { useNavigate } from "react-router-dom";
import paths from "../../../router/paths";
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SubjectIcon from '@mui/icons-material/Subject';
import GradientBorderNotGood from "../../../components/ui/border/GradientBorder.notgood";
import GradientBorderNotSoGood from "../../../components/ui/border/GradientBorder.notsogood";
import { useListUsersMutation } from "../../../features/scenarios/apis/concrete/bulbasaur.scenario-api";
import { useListScenarioMutation, useGetRandomScenarioQuery } from "../../../features/scenarios/apis/concrete/chronobreak.scenario-api";
import { Scenario, SortType } from "../../../features/scenarios/types";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

const streak = 6

const CandidateHomePage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = React.useState('');

	const [scenariosData, setScenariosData] = React.useState<(Scenario & { created_at: Date; manager: string; label: string | undefined })[]>([]);
	const [streakData, _setStreakData] = React.useState(streak);

	const [listScenario] = useListScenarioMutation();
	const [listUsers] = useListUsersMutation();
	React.useEffect(() => {
		const fetchScenarios = async () => {
			try {
				const response = await listScenario({ bm_ids: [], sort_methods: [{ name: "created_at", type: SortType.SORT_TYPE_DESC }], page_index: 0, page_size: 2, field_ids: [], min_rating: 0, min_participant: 0 });
				if (response.data?.scenario) {
					const managerIds = response.data.scenario.map((s) => s.owner_id);
					const usersResponse = await listUsers({ user_ids: managerIds });
					console.log("Users", usersResponse.data?.users);
					console.log("error", usersResponse.error);
					const formattedScenarios = response.data.scenario.map((s) => {
						const rawCreatedAt = s.base_data.created_at;
						const createdAt =
							rawCreatedAt instanceof Timestamp
								? rawCreatedAt.toDate()
								: new Date(rawCreatedAt ?? Date.now());

						const isNew = Date.now() - createdAt.getTime() < 24 * 60 * 60 * 1000;

						const manager = usersResponse.data?.users.find((user) => Number(user.id) === Number(s.owner_id))?.metadata.fullname || "Unknown";

						return {
							...s,
							created_at: createdAt,
							manager,
							label: isNew ? "New" : undefined,
						};
					});

					setScenariosData(formattedScenarios);
				}
			} catch (err) {
				console.error("Error fetching scenarios:", err);
			}
		};

		fetchScenarios();
	}, []);

	const { data: randomScenarioData } = useGetRandomScenarioQuery();

	const navigateToScenario = (id: string) => {
		navigate(paths.candidate.scenarios.in(id)._layout);
	}

	return (
		<>
			<div className="p-2 max-w-7xl mx-auto mt-4">
				<h1 className="text-3xl font-bold">Welcome back, Bang!</h1>
				<p className="text-lg mb-6">Continue learning with our recommendations based on your career goals and recent activity.</p>

				<div className="flex gap-8">
					<div className="w-3/4 flex flex-col">
						<div className="mb-8 pb-8 border-b-gradient">
							<div className="flex justify-between items-center text-primary mb-4">
								<h2 className="text-2xl font-semibold">Scenarios</h2>
								<a className="text-sm hover:underline cursor-pointer" onClick={() => { navigate(paths.candidate.scenarios._layout) }}>See more</a>
							</div>
							<div className="space-y-4">
								{scenariosData.map((item, idx) => (
									<div key={idx} className="p-4 border rounded-lg flex justify-between items-center shadow-md">
										<div>
											<div className="flex items-center gap-2">
												<h3 className="text-xl font-semibold">{item.name}</h3>
												{item.label && <GradientBorderNotSoGood><span className="text-gradient">{item.label}</span></GradientBorderNotSoGood>}
											</div>
											<p className="text-sm text-black mt-2">{item.description}</p>
											<div className="flex items-center gap-6 text-sm mt-6">
												<div className="flex items-center gap-2">
													<ApartmentIcon />
													<span>{item.manager}</span>
												</div>
												<div className="flex items-center gap-2">
													<AccessAlarmIcon />
													<span>TBD</span>
												</div>
											</div>
										</div>
										<button className={`px-10 rounded-lg py-2 font-bold cursor-pointer border border-primary text-primary`} onClick={() => navigateToScenario(item.id.toString())}>
											Try for free
										</button>
									</div>
								))}
							</div>
						</div>

						<div className="mb-8 pb-8 border-b-gradient">
							<div className="flex justify-between items-center text-primary mb-4">
								<h2 className="text-2xl font-semibold">Challenges of the day</h2>
								{/* <a href="#" className="text-sm hover:underline">Shuffle (1)</a> */}
							</div>
							<div className="space-y-4">

								<div className="text-center text-gray-500 text-sm">or</div>
								{randomScenarioData && (
									<div className="p-4 border rounded-lg shadow-md">
										<div className="flex justify-between items-center">
											<div className="flex items-center">
												<div className="mr-4 text-primary">
													<SubjectIcon className="w-10 h-10" />
												</div>
												<div className="flex flex-col justify-center">
													<div className="flex items-center gap-4">
														<h3 className="font-semibold text-xl">{randomScenarioData.scenario.name}</h3>
														<div className="flex gap-2 mt-1 flex-wrap">
															{randomScenarioData.scenario.fields.slice(0, 2).map((field, i) => (
																<GradientBorderNotGood key={i}>
																	{field.name}
																</GradientBorderNotGood>
															))}
															{randomScenarioData.scenario.fields.length > 2 && (
																<GradientBorderNotGood>
																	+{randomScenarioData.scenario.fields.length - 2} more
																</GradientBorderNotGood>
															)}
														</div>
													</div>
													<div className="flex items-center gap-2 text-sm mt-1">
														<AccessAlarmIcon />
														<span>TBD</span>
													</div>
												</div>
											</div>
											<button className="px-10 rounded-lg py-2 font-bold cursor-pointer bg-[var(--primary-color)] text-white" onClick={() => navigateToScenario(randomScenarioData.scenario.id.toString())}>
												Start now
											</button>
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="mb-8">
							<div className="flex justify-between items-center text-primary mb-4">
								<h2 className="text-2xl font-semibold">Prepare by most learned topics</h2>
							</div>
						</div>
					</div>

					<div className="w-1/4 flex flex-col gap-4">
						<div className="border p-4 rounded-md shadow-md">
							<div className="flex items-center gap-2 font-semibold text-secondary-toned-600">
								{streakData > 0 ? <LocalFireDepartmentIcon /> : <LocalFireDepartmentOutlinedIcon />}
								<p>Your streak: <span className="font-bold text-lg">{streakData}</span></p>
							</div>
							<p className="mt-2 text-sm text-gray-600">
								Complete a challenge of the day to stay on top of your interview preparation, and keep up your streak, as well.
							</p>
						</div>

						<div className="bg-white border p-4 rounded-md shadow-sm">
							<div className="flex items-center gap-2 font-semibold text-secondary-toned-600">
								<CardGiftcardIcon />
								<p>Get 10$ credits</p>
							</div>
							<p className="mt-2 text-sm text-gray-600">
								Drop your <span className="font-medium">friend's email</span> and we’re happy to invite them with your unique referral code.
							</p>
							<input
								type="email"
								placeholder="Friend's email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full mt-3 p-2 border rounded-md text-sm"
							/>
							<p className="mt-2 text-xs text-gray-600">
								After becoming
								<span className="relative group inline-block ml-1">
									<span className="font-bold text-primary underline cursor-help">qualified</span>
									<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white/80 text-gray-800 text-xs px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
										Your referral will become qualified once your referee achieves 24 hours of uptime.
									</div>
								</span>,
								both of you earn a <span className="font-semibold">10$ credit</span> for every SkillSharp payment.
							</p>
							<button className="mt-3 w-full py-2 border border-primary text-primary font-semibold rounded-md hover:opacity-90">
								Send
							</button>
						</div>

						<div className="border border-gray-300 rounded-md overflow-hidden">
							<img src="/defaults/landing_img_316.png" alt="Ad Banner" className="w-full object-cover" />
							<div className="bg-blue-100 text-xs text-center py-1 text-blue-600 font-medium">
								Bỏ quảng cáo
							</div>
						</div>
					</div>
				</div>

			</div>
		</>
	);
}

export default CandidateHomePage;