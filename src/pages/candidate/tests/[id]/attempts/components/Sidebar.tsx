import { useNavigate } from "react-router-dom"
import useGetTestIdParams from "../../../../../../features/tests/hooks/useGetTestIdParams";
import { Fragment, useEffect, useState } from "react";
import ModalBase from "../../../../../../components/ui/modal/Modal.base";
import { usePostCandidateCurrentAttemptNewMutation } from "../../../../../../features/tests/api/test.api-gen";
import paths from "../../../../../../router/paths";
import AttemptCardInProgress, { AttemptCardInProgressProps } from "./AttemptCardInProgress";
import { SortAsc, SortDesc } from "lucide-react";

export default function Sidebar({
	attemptCardInprogressProps: {
		test,
		currentAttempt,
	},
	onToggleSortByStartDate,
	onToggleSortByScore,
	filters,
}: {
	attemptCardInprogressProps: {
		test: AttemptCardInProgressProps["test"];
		currentAttempt: AttemptCardInProgressProps["currentAttempt"] | null
	};
	onToggleSortByStartDate?: () => void;
	onToggleSortByScore?: () => void;
	filters: {
		sortByStartDate?: "asc" | "desc";
		sortByScore?: "asc" | "desc";
	};
}) {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();
	const [openNewAttemptModal, setOpenNewAttemptModal] = useState(false);

	const [postNewAttempt, { isLoading, isSuccess }] = usePostCandidateCurrentAttemptNewMutation();

	useEffect(() => {
		if (isSuccess) {
			navigate(paths.candidate.tests.in(testId).DO);
		}
	}, [isSuccess]);

	const handleNewAttemptAccept = () => {
		setOpenNewAttemptModal(false);
		postNewAttempt({
			body: { testId }
		});
	};

	const handleBackToTestLists = () => {
		navigate(paths.candidate.tests._layout);
	};

	return (
		<Fragment>
			<div className="w-full h-fit flex flex-col gap-8">
				<div className='w-full flex flex-row items-center justify-start mb-2 gap-2'>
					<button
						onClick={onToggleSortByStartDate}
						className={`flex items-center gap-1  font-semibold px-4 py-2 rounded-lg border-2 border-primary ${filters.sortByStartDate !== undefined
							? "bg-primary text-white"
							: "bg-white text-primary"
							}`}>
						<span>Started Date</span>
						{filters.sortByStartDate === "asc" ? (
							<SortAsc />
						) : (
							<SortDesc />
						)}
					</button>
					<button
						onClick={onToggleSortByScore}
						className={`flex items-center gap-1  font-semibold px-4 py-2 rounded-lg border-2 border-primary ${filters.sortByScore !== undefined
							? "bg-primary text-white"
							: "bg-white text-primary"}
											`}>
						<span>Score</span>
						{filters.sortByScore === "asc" ? (
							<SortAsc />
						) : (
							<SortDesc />
						)}
					</button>
				</div>

				{currentAttempt && (
					<AttemptCardInProgress
						test={test}
						currentAttempt={currentAttempt}
					/>
				)}
				<div className="flex flex-col bg-white rounded-lg shadow-primary py-6 px-12 border-r border-b border-primary gap-4">
					<button
						className="w-full px-3 font-semibold rounded-lg py-2 text-white bg-primary cursor-pointer"
						onClick={() => {
							if (currentAttempt != null) {
								setOpenNewAttemptModal(true);
							}
							else {
								handleNewAttemptAccept();
							}
						}}
						disabled={isLoading}
					>
						Start a new quiz
					</button>
					<button
						className="w-full px-3 font-semibold rounded-lg py-2 border-primary text-primary border-2 cursor-pointer"
						onClick={handleBackToTestLists}>
						Back to Questions
					</button>
				</div>

				<div className="bg-white rounded-lg shadow-secondary px-6 pt-4 pb-8">
					<h3 className="text-lg font-bold">Notes</h3>
					<p className="text-sm mt-2">
						Please read each question carefully and double-check your
						answers. Manage your time wisely, stay calm, and focus on
						accuracy rather than speed. Good luck!
					</p>
				</div>
			</div>

			<ModalBase
				isOpen={openNewAttemptModal}
				onClose={() => setOpenNewAttemptModal(false)}
			>
				<div>
					<h3 className="text-lg font-bold">Start a new quiz</h3>
					<p className="text-sm text-[#39A0AD] mt-2">
						Are you sure you want to start a new quiz? Your current quiz
						progress will be lost.
					</p>
					<div className="mt-4 flex justify-end">
						<button
							className="px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer"
							onClick={handleNewAttemptAccept}
							disabled={isLoading}
						>
							Yes
						</button>
						<button
							className="ml-2 px-3 font-semibold rounded-lg py-2 text-white bg-[#FF5C5C] cursor-pointer"
							onClick={() => setOpenNewAttemptModal(false)}
						>
							No
						</button>
					</div>
				</div>
			</ModalBase>
		</Fragment>
	);
}
