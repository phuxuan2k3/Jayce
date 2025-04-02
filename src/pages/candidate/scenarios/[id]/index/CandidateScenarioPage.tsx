import * as React from "react";
import { FaArrowRight, FaCalendarAlt, FaChevronRight, FaHeart, FaStar, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { useListAttemptMutation, useFavoriteScenarioMutation, useRatingScenarioMutation, useGetAttemptMutation } from "../../../../../features/Scenario/apis/concrete/ekko.scenario-api";
import { useGetScenarioMutation } from "../../../../../features/Scenario/apis/concrete/chronobreak.scenario-api";
import { Attempt, Scenario } from "../../../../../features/Scenario/types";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

const CandidateScenarioPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const scenarioId = location.state?.scenarioId;
	if (!scenarioId) {
		navigate("/ipractice/pick");
		return null;
	}

	const [scenario, setScenario] = React.useState<Scenario & { attempted: boolean }>();
	const [attempts, setAttempts] = React.useState<Attempt[]>([]);
	const [date, setDate] = React.useState<Date | null>(null);
	const [userRating, setUserRating] = React.useState<number | null>(null);

	const [getScenario] = useGetScenarioMutation();
	const [listAttempt] = useListAttemptMutation();
	React.useEffect(() => {
		const fetchScenario = async () => {
			try {
				const response = await getScenario({ id: scenarioId });
				const attemptResponse = await listAttempt({ scenario_id: scenarioId, page_index: 0, page_size: 1000, sort_method: [] });

				console.log("Scenario", response.data?.scenario);
				console.log("Attempts", attemptResponse.data?.attempts);

				if ((attemptResponse.data?.attempts ?? []).length > 0) {
					if (response.data?.scenario) {
						setScenario({ ...response.data.scenario, attempted: true });
					}
				}
				else {
					if (response.data?.scenario) {
						setScenario({ ...response.data.scenario, attempted: false });
					}
				}
				setAttempts(attemptResponse.data?.attempts || []);

				console.log("Error", attemptResponse.error);

				console.log("Attempts", attemptResponse.data?.attempts);

				if (response.data?.scenario.base_data.created_at instanceof Timestamp) {
					setDate(response.data?.scenario.base_data.created_at.toDate());
				} else {
					setDate(new Date(response.data?.scenario.base_data.created_at ?? Date.now()));
				}
			} catch (error) {
				console.log("Error fetching scenario", error);
			}
		}

		fetchScenario();
	}, [scenarioId, userRating]);

	const [selectedTab, setSelectedTab] = React.useState<"questions" | "history">("questions");

	const [ratingScenario] = useRatingScenarioMutation();
	const handleRating = (rating: number | null) => {
		setUserRating(rating);
		try {
			console.log("Rating", rating);
			ratingScenario({ id: scenarioId, rating: rating ?? 0 });
		} catch (error) {
			console.log("Error rating scenario", error);
		}
	};

	const [favoriteScenario] = useFavoriteScenarioMutation();
	const handleAddToFavourite = async () => {
		try {
			await favoriteScenario({ id: scenarioId });
		} catch (error) {
			console.log("Error adding to favourite", error);
		}
	};

	const handleAnswer = () => {
		navigate("/ipractice/answer", { state: { scenarioId } });
	};

	const [useGetAttempt] = useGetAttemptMutation();
	const handleGoToReview = async (attemptId: number) => {
		try {
			const response = await useGetAttempt({ id: attemptId });
			const attempt = response.data?.attempt;
			navigate("/ipractice/review", { state: { scenario, attempt } });
		} catch (error) {
			console.log("Error fetching attempt", error);
		}
	};

	return (
		<>
			<div className="flex gap-4 mt-10 font-arya">
				<div className="w-[65%]  mx-12">
					<div className="flex justify-between">
						<div className="flex items-center gap-10">
							<span className="text-3xl font-bold">{scenario?.name}</span>
							<div className={`px-3 py-1 rounded-lg text-sm font-medium ${scenario?.attempted ? 'bg-[var(--primary-color)] text-white' : 'text-gray-500 border border-gray-500'}`}>
								{scenario?.attempted ? "Attempted" : "Not Attempted"}
							</div>
						</div>
						<div className="rounded-lg bg-[var(--primary-color)] py-1 px-4 font-bold text-white flex gap-2 items-center cursor-pointer" onClick={() => handleAnswer()}><FaArrowRight /> Start</div>
					</div>
					{/* <div className="mt-4 text-xl">
                        {field}
                    </div> */}
					<hr className=" border-gray-400 mb-4 mt-2" />
					<div className="max-h-96 overflow-y-auto " style={{
						scrollbarWidth: "thin",
						scrollbarColor: "var(--primary-color)",
					}}>
						{scenario?.description}
					</div>
					<hr className=" border-gray-400 my-4" />
					<span className="flex items-center gap-2"> Overall rating: {Number.isInteger(scenario?.rating) ? scenario?.rating : scenario?.rating.toFixed(2)} / 5.0 <FaStar /></span>
					<span className="flex items-center gap-2"> Participated: {scenario?.total_participant}  <FaUser /></span>
					<span className="flex items-center gap-2"> Date created: {date?.toLocaleDateString()}{" "}  <FaCalendarAlt /></span>
					<hr className=" border-gray-400 my-4" />
					<div className="flex justify-between">
						<div className="flex gap-2 ">
							Your rating:
							<Rating
								name="user-rating"
								value={userRating}
								onChange={(_, newValue) => handleRating(newValue)}
							/>
						</div>
						<div className={`px-3 py-1 rounded-lg font-bold text-[var(--primary-color)] border border-gray-500 flex gap-4 items-center cursor-pointer`} onClick={() => handleAddToFavourite()}>
							Add to Favourite <FaHeart />
						</div>
					</div>
				</div>

				<div className="w-[35%]">
					<div className="w-full flex  pb-2 mb-4">
						<span
							className={`mr-4 font-semibold text-lg cursor-pointer ${selectedTab === "questions" ? "text-teal-600 border-b-2 border-teal-500" : "text-gray-600"}`}
							onClick={() => setSelectedTab("questions")} >
							Questions
						</span>
						<span
							className={`font-semibold text-lg cursor-pointer ${selectedTab === "history" ? "text-teal-600 border-b-2 border-teal-500" : "text-gray-600"}`}
							onClick={() => setSelectedTab("history")} >
							History
						</span>
					</div>
					<div className="w-full">
						{selectedTab === "questions" && (
							<ul className="w-full">
								{scenario?.questions.map((item, index) => (
									<div key={index}>
										<li key={index} className="flex justify-between items-center py-3 text-gray-700 hover:text-teal-600 cursor-pointer">
											<span className="font-semibold truncate">{index + 1}. <span className="font-normal">{item.content}</span></span>
											<FaChevronRight />
										</li>
										{index !== scenario?.questions.length - 1 && <hr className="border-gray-400" />}
									</div>
								))}
							</ul>
						)}
						{selectedTab === "history" && (
							<div className="w-full">
								{attempts.length === 0 ? (
									<div className="text-gray-500 text-center mt-4">
										No attempts found.
									</div>
								) : (
									attempts.map((attempt, index) => {
										let attemptDate;

										if (attempt.base_data.created_at instanceof Timestamp) {
											attemptDate = attempt.base_data.created_at.toDate();
										} else {
											attemptDate = new Date(attempt.base_data.created_at);
										}

										return (
											<div key={index} className="p-4 bg-white shadow-md rounded-lg border m-2 cursor-pointer" onClick={() => handleGoToReview(attempt.id)}>
												<div className="flex justify-between items-center">
													<span className="font-bold text-red-600">Attempt {attempt.attempt_number}</span>
													<span className="text-gray-500 text-sm">Submitted on: {attemptDate.toLocaleDateString()}</span>
												</div>
												<div className="mt-2 text-gray-700">
													<p>Relevance: {attempt.answers.reduce((sum, answer) => sum + (answer.relevance || 0), 0) / attempt.answers.length}</p>
													<p>Clarity and Completeness: {attempt.answers.reduce((sum, answer) => sum + (answer.clarity_completeness || 0), 0) / attempt.answers.length}</p>
													<p>Accuracy: {attempt.answers.reduce((sum, answer) => sum + (answer.accuracy || 0), 0) / attempt.answers.length}</p>
													<p className="font-bold">Overall: {attempt.answers.reduce((sum, answer) => sum + (answer.overall || 0), 0) / attempt.answers.length}</p>
												</div>
											</div>
										);
									})
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default CandidateScenarioPage