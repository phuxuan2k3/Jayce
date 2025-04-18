import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useGenerateMutation } from "../../../../../../features/tests/api/prompt.api-custom";
import { CriteriaRequest } from "../../../../../../features/tests/types/crud";
import { GenerationLoading } from "./AITestQuestionGeneration/GenerationLoading";
import ContextOfTest from "./AITestQuestionGeneration/ContextOfTest";
import { useTestCreate } from "../../contexts/test-create.context";
import { createPortal } from "react-dom";

export default function AITestQuestionGeneration({
	onGenerated,
}: {
	onGenerated: () => void
}) {
	const { dispatch, fields } = useTestCreate();
	const [text, setText] = useState<string>("");
	const [links, setLinks] = useState<string[]>([]);
	const [documents, setDocuments] = useState<File[]>([]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [numQuestions, setNumQuestions] = useState(3);
	const [answers, setAnswers] = useState(4);
	const [language, setLanguage] = useState("Auto");
	const [seniority, setSeniority] = useState("Intern");
	const [isLoadingPage, setIsLoadingPage] = useState(false);
	const [generate] = useGenerateMutation();

	// TODO: test tags
	const [criteria, setCriteria] = useState<CriteriaRequest>({
		name: fields.title || "Default Name",
		description: fields.description || "Default Description",
		fields: ["Default Field"],
		duration: fields.minutesToAnswer.toString() || "30",
		question_type: "multiple_choice",
		language: "en",
		options: 4,
		number_of_question: 3,
		candidate_seniority: "itern",
		difficulty: fields.difficulty || "Easy",
		context: "this is a beautiful",
	});

	const handleSave = async () => {
		setIsLoadingPage(true);

		const updatedCriteria: CriteriaRequest = {
			...criteria,
			language,
			options: answers,
			number_of_question: numQuestions,
			candidate_seniority: seniority.toLowerCase(),
			context: text,
		};
		setCriteria(updatedCriteria);

		try {
			const response = await generate(updatedCriteria).unwrap();
			dispatch({
				type: "ADD_AI_QUESTIONS",
				payload: response,
			});
			setIsLoadingPage(false);
			onGenerated();
		} catch (err) {
			console.error("Error generating questions:", err);
			setIsLoadingPage(false);
		} finally {
			setIsModalOpen(false);
		}
	};

	if (isLoadingPage) {
		return (
			<GenerationLoading />
		);
	}
	return (
		<>
			<ContextOfTest
				text={text}
				links={links}
				documents={documents}
				onTextChange={setText}
				onLinksChange={setLinks}
				onDocumentsChange={setDocuments}
			/>

			<div className="pb-12 flex justify-center">
				<button onClick={() => setIsModalOpen(true)} className="bg-primary text-white rounded-md py-1 px-10 " >
					Generate
				</button>
			</div>

			{/* Modal */}
			{isModalOpen && createPortal(
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white w-96 p-6 rounded-lg shadow-lg">
						<h2 className="text-2xl font-semibold mb-4">Question type <span className="text-blue-500 text-sm border border-blue-300 rounded-lg px-2">Pro</span></h2>
						<div className="my-3 flex justify-between">
							<label className="block text-lg font-semibold w-1/2">Language</label>
							<div className="relative w-fit pe-8">
								<select
									value={language}
									onChange={(e) => setLanguage(e.target.value)}
									className="w-full border p-2 rounded-md appearance-none"
								>
									<option value="en">Auto</option>
									<option value="vie">VietNamese</option>
									<option value="en">English</option>
								</select>
								<FaChevronDown className="absolute top-3 right-3 text-gray-400" />
							</div>
						</div>
						<div className="my-3 h-10 flex justify-between">
							<label className="block text-lg font-semibold w-1/2">Options</label>
							<div className="relative w-fit">
								<input type="number" className="w-12" value={answers} onChange={(e) => setAnswers(Number(e.target.value))} />
							</div>
						</div>
						<div className="my-3  h-10  flex justify-between">
							<label className="block text-lg font-semibold w-1/2">Number of question</label>
							<div className="relative w-fit ">
								<input type="number" className="w-12" value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))} />
							</div>
						</div>
						<div className="my-3 flex justify-between">
							<label className="block text-lg font-semibold w-1/2">Candidate seniority</label>
							<div className="relative w-fit pe-8 ">
								<select
									value={seniority}
									onChange={(e) => setSeniority(e.target.value)}
									className="w-full border p-2 rounded-md appearance-none"
								>
									<option>Intern</option>
									<option>Junior</option>
									<option>Mid</option>
									<option>Senior</option>
								</select>
								<FaChevronDown className="absolute top-3 right-3 text-gray-400" />
							</div>
						</div>

						<div className="flex  gap-1 mt-4">
							<button onClick={() => setIsModalOpen(false)} className="w-1/2 px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
							<button
								onClick={() => handleSave()}
								className=" text-center w-1/2 px-4 py-2 bg-[var(--primary-color)] text-white rounded-md "> Save </button>
						</div>
					</div>
				</div>,
				document.body
			)}
		</>
	)
};
