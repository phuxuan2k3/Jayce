import { useGetTestsByTestIdQuery } from "../../api/test.api-gen-v2"
import FetchStateCover2 from "../../ui/fetch-states/FetchStateCover2";
import { TestSidebarPrimitives } from "./TestSidebarPrimitives";

export default function TestFullSidebar({
	testId,
}: {
	testId: string;
}) {
	const testQuery = useGetTestsByTestIdQuery({ testId });

	const formatDate = (date: string) => {
		const d = new Date(date);
		return d.toLocaleString(undefined, {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}

	return (
		<div className="sticky top-2 max-h-[96vh] overflow-y-auto shadow-primary bg-white rounded-lg p-6 flex flex-col gap-2 text-primary">
			<FetchStateCover2
				fetchState={testQuery}
				dataComponent={(test) => {
					const { minutesToAnswer, language, mode, createdAt, updatedAt, _aggregate, _detail, authorId } = test;
					return (
						<>
							<TestSidebarPrimitives.Header
								test={test}
								mode={mode}
								authorId={authorId}
							/>

							<hr className="border-primary-toned-300 my-2" />

							<TestSidebarPrimitives.CommonInfo
								language={language}
								minutesToAnswer={minutesToAnswer}
								_aggregate={_aggregate}
							/>

							<hr className="border-primary-toned-300 my-2" />

							<div className="rounded-md bg-primary-toned-50 p-4 mb-2">
								{_detail.mode === "PRACTICE" ? (
									<PracticeDetails _detail={_detail} />
								) : (
									<ExamDetails _detail={_detail} />
								)}
							</div>
							<hr className="border-primary-toned-300 my-2" />

							<div className="flex flex-col gap-1">
								<div className="justify-end flex text-sm items-baseline gap-2 text-primary-700 font-arya">
									<span>Created:</span>
									<span className="font-semibold">{formatDate(createdAt)}</span>
								</div>
								<div className="justify-end flex text-sm items-baseline gap-2 text-primary-700 font-arya">
									<span>Last Updated:</span>
									<span className="font-semibold">{formatDate(updatedAt)}</span>
								</div>
							</div>
						</>
					);
				}}
			/>
		</div>
	)
}

function PracticeDetails({ _detail }: { _detail: any }) {
	return (
		<div className="flex flex-col gap-3">
			<h3 className="text-lg font-semibold text-primary-toned-700">Practice Details</h3>
			<hr className="border-primary-toned-300" />
			<ul className="text-sm space-y-2">
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Difficulty:</span>
					<span className="font-bold">{_detail.difficulty || "N/A"}</span>
				</li>
				<li className="flex items-center gap-2 flex-wrap">
					<span className="text-primary-toned-600">Tags:</span>
					{_detail.tags && _detail.tags.length > 0 ? _detail.tags.map((tag: string, idx: number) => (
						<span key={idx} className="bg-primary-toned-100 text-primary-toned-700 px-2 py-0.5 rounded-full text-xs font-medium border border-primary-toned-200">{tag}</span>
					)) : <span className="text-primary-toned-400">None</span>}
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Questions:</span>
					<span className="font-bold">{_detail.numberOfQuestions !== undefined ? _detail.numberOfQuestions : "N/A"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Options per Question:</span>
					<span className="font-bold">{_detail.numberOfOptions !== undefined ? _detail.numberOfOptions : "N/A"}</span>
				</li>
				<li className="flex flex-col gap-1 w-full">
					<span className="text-primary-toned-600 mb-1">Outlines:</span>
					{_detail.outlines && _detail.outlines.length > 0 ? (
						<ul className="list-disc pl-5">
							{_detail.outlines.map((outline: string, idx: number) => (
								<li key={idx} className="text-primary-toned-800 text-xs font-medium">
									{outline}
								</li>
							))}
						</ul>
					) : <span className="text-primary-toned-400">None</span>}
				</li>
			</ul>
		</div>
	)
}

function ExamDetails({ _detail }: { _detail: any }) {
	return (
		<div className="flex flex-col gap-3">
			<h3 className="text-lg font-semibold text-primary-toned-700">Exam Details</h3>
			<hr className="border-primary-toned-300" />
			<ul className="text-sm space-y-2">
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Room ID:</span>
					<span className="font-bold">{_detail.roomId || "N/A"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Password Protected:</span>
					<span className="font-bold">{_detail.hasPassword !== undefined ? (_detail.hasPassword ? "Yes" : "No") : "N/A"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Attempts Allowed:</span>
					<span className="font-bold">{_detail.numberOfAttemptsAllowed !== 0 ? _detail.numberOfAttemptsAllowed : "Unlimited"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Participants:</span>
					<span className="font-bold">{_detail.numberOfParticipants !== 0 ? _detail.numberOfParticipants : "Unlimited"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Answer Visible:</span>
					<span className="font-bold">{_detail.isAnswerVisible !== undefined ? (_detail.isAnswerVisible ? "Yes" : "No") : "N/A"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">See Other Results:</span>
					<span className="font-bold">{_detail.isAllowedToSeeOtherResults !== undefined ? (_detail.isAllowedToSeeOtherResults ? "Yes" : "No") : "N/A"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Open Date:</span>
					<span className="font-bold">{_detail.openDate ? new Date(_detail.openDate).toLocaleString() : "N/A"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Close Date:</span>
					<span className="font-bold">{_detail.closeDate ? new Date(_detail.closeDate).toLocaleString() : "N/A"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Is Public:</span>
					<span className="font-bold">{_detail.isPublic !== undefined ? (_detail.isPublic ? "Yes" : "No") : "N/A"}</span>
				</li>
			</ul>
		</div>
	)
}
