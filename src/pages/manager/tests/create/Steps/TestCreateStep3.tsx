import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useTestPersistContext } from "../../../../../features/tests/stores/test-persist.context";
import { usePostManagerTestsMutation } from "../../../../../features/tests/api/test.api-gen";
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import { useTestCreateTab } from "../contexts/test-create-tab.context";
import { toErrorMessage } from "../../../../../helpers/fetchBaseQuery.error";
import { QuestionDTO } from "../../../../../features/tests/types/crud";

export default function TestCreateStep3() {
	const navigate = useNavigate();
	const { activeTab, setActiveTab } = useTestCreateTab();
	const {
		state: { data },
	} = useTestPersistContext();
	const [createTest, { isSuccess, isLoading, error }] = usePostManagerTestsMutation();

	useEffect(() => {
		if (isSuccess) navigate(paths.manager.tests.ROOT);
	}, [isSuccess]);

	const handlePublish = () => {
		createTest({ body: data });
	}

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center px-4">
				<div className="w-full flex-1 flex-col mt-6 text-center">
					<div className="font-arya text-[28px] font-bold text-center mt-10">
						Review the information before finalizing your test.
					</div>
				</div>

				<div className="flex flex-col items-center w-4/6 py-4">
					<div className="w-full flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
						<span>Overview ({data.questions.length})</span>

						<FontAwesomeIcon
							className="ms-3 w-5 h-5 cursor-pointer"
							icon={faEdit}
							onClick={() => setActiveTab(0)}
						/>
					</div>

					<div className="w-full grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 bg-white rounded-lg shadow-primary p-6  border-solid border-primary">
						<span className="font-bold">Tilte</span>
						<span>{data.title}</span>
						<span className="font-bold">Description</span>
						<span>{data.description}</span>
						<span className="font-bold">Tags</span>
						<span >#tags#</span>
						<span className="font-bold">Duration</span>
						<span>{data.minutesToAnswer} min</span>
						<span className="font-bold">Difficulty</span>
						<span>{data.difficulty}</span>
					</div>


					<div className="w-full flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4 mt-4">
						<span>Question List ({data.questions.length})</span>
						<FontAwesomeIcon
							className="ms-3 w-5 h-5 cursor-pointer"
							icon={faEdit}
							onClick={() => setActiveTab(1)}
						/>
					</div>

					{/* Question List */}
					<div className="w-full flex flex-col gap-4">
						{data.questions.map((question, index) => (
							<QuestionInformationCard
								key={index}
								question={question}
								index={index}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Message */}
			<div className="w-full flex justify-center items-center  text-sm mt-2">
				{isLoading && <span className="italic">Publishing...</span>}
				{error && <span className="text-red-500 font-semibold">{toErrorMessage(error)}</span>}
			</div>

			{/* Bottom buttons */}
			<div className="pb-12 flex justify-center ">
				<button
					className="bg-[var(--primary-color)] text-white rounded-md py-1 px-10 me-2" onClick={() => setActiveTab(activeTab - 1)}
				>
					Back
				</button>
				<button
					disabled={isLoading}
					className={`bg-primary-toned-700 text-white rounded-md py-1 px-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
					onClick={handlePublish}>
					Publish
				</button>
			</div >
		</>
	)
};

function QuestionInformationCard({
	question,
	index,
}: {
	question: Omit<QuestionDTO, "id">;
	index: number;
}) {
	return (
		<div key={index} className="border border-primary rounded-lg p-4 shadow-md shadow-primary mb-4 w-full bg-white">
			<div className="flex justify-between items-center mb-2">
				<p className="font-semibold text-lg">{question.text}</p>
				<span className="text-sm font-medium text-primary-toned-600">
					{question.points} {question.points === 1 ? "point" : "points"}
				</span>
			</div>
			<div className="flex flex-col gap-1">
				{question.options.map((option, optionIndex) => (
					<div
						key={optionIndex}
						className={`p-2 rounded ${optionIndex === question.correctOption
							? "bg-primary-toned-100 border border-primary text-primary-toned-700 font-medium"
							: "bg-gray-50 border"
							}`}
					>
						{option}
					</div>
				))}
			</div>
		</div>
	);
}