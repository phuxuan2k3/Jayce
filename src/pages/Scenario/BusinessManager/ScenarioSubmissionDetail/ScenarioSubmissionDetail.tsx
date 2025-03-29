import { useLocation, useNavigate } from "react-router-dom";
import { Attempt, Scenario } from "../../APIs/types";
import GradientBorderNotGood from "../../../../components/ui/border/GradientBorder.notgood";

const ScenarioSubmissionDetail = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const scenarioInfo: Scenario | null = location.state?.scenarioInfo;
	const attempt: Attempt & { candidate_id: number } = location.state?.attempt;
	const submitter: string = location.state?.submitter;
	if (!scenarioInfo || !attempt) {
		navigate("/");
		return null;
	}

	console.log("ScenarioSubmissionDetail:", scenarioInfo, attempt);

	const handleGoToSubmissionListView = () => {
		navigate("/scenario/submission", { state: { scenarioId: scenarioInfo.id } });
	};

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center px-4 font-arya">
				<div className="w-full max-w-7xl py-6">
					<div className="flex-col text-center">
						<h1 className="text-2xl font-bold mb-6">Scenario Detail: #{attempt.id}</h1>
						<div className="flex flex-col font-semibold">
							<span> Submitter: {submitter}</span>
							<span> For: {scenarioInfo.name}</span>
						</div>

					</div>

					<div className="flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-start font-semibold text-[var(--primary-color)] mb-4">
							<span>Question List</span>
						</div>

						{/* Questions List */}
						{attempt.answers.map((answer, index) => (
							<div key={index} className="w-4/6 flex-1 flex flex-row bg-white rounded-lg shadow-primary p-6 space-x-2 border-r border-b border-solid border-primary justify-between mb-4">
								<span className="w-1/8 font-bold mb-2 opacity-50">
									Question {index + 1}
								</span>

								{/* Question and Options */}
								<div className="w-1/2 flex flex-col">
									{/* Question */}
									<div className="w-full mb-4">
										<GradientBorderNotGood className="w-full h-fit font-semibold">
											{scenarioInfo.questions[index].content}
										</GradientBorderNotGood>
									</div>

									<div className="w-full mb-4">
										<GradientBorderNotGood className="w-full h-fit font-semibold">
											{answer.answer}
										</GradientBorderNotGood>
									</div>
								</div>

								<div className="w-7/8 flex flex-col items-start justify-start">
									<span className="font-bold mb-2 opacity-50">
										Rating
									</span>
									<span className="font-bold mb-2 text-primary">
										Relevance: <span className="bg-[#EAF6F8] border border-2 border-primary rounded-lg pl-1 pr-1">{answer.relevance}/10</span>
									</span>
									<span className="font-bold mb-2 text-primary">
										Clarity and Completeness: <span className="bg-[#EAF6F8] border border-2 border-primary rounded-lg pl-1 pr-1">{answer.clarity_completeness}/10</span>
									</span>
									<span className="font-bold mb-2 text-primary">
										Accuracy: <span className="bg-[#EAF6F8] border border-2 border-primary rounded-lg pl-1 pr-1">{answer.accuracy}/10</span>
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-row justify-center">
						<button className="mt-4 w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleGoToSubmissionListView}>
							Back to Submission List
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ScenarioSubmissionDetail