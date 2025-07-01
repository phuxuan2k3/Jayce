import { TestFullSchema, useGetTestsByTestIdQuery } from "../../api/test.api-gen-v2"
import { TestUtils } from "../../ui-items/test/test-utils";
import { Globe, Timer, ListCollapse, ClipboardList } from "lucide-react";
import FetchStateCover2 from "../../ui/fetch-states/FetchStateCover2";
import { SmallUserInfo } from "../SmallUserInfo";


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
							<SidebarHeader
								test={test}
								mode={mode}
								authorId={authorId}
							/>

							<hr className="border-primary-toned-300 my-2" />

							<SidebarCommonInfo
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

function SidebarHeader({ test, mode, authorId }: { test: TestFullSchema, mode: TestFullSchema["mode"], authorId: string }) {
	return (
		<div className="flex flex-col items-center gap-2">
			<h2 className="text-2xl text-center">{test.title}</h2>
			<span className={TestUtils.getClassNames(mode).bandage}>{test.mode}</span>

			<SmallUserInfo userId={authorId} />
		</div>
	)
}

function SidebarCommonInfo({ language, minutesToAnswer, _aggregate }: { language: string, minutesToAnswer: number, _aggregate: any }) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<Globe size={16} strokeWidth={2.5} />
				<span className="w-20 font-medium text-primary-toned-700">Language:</span>
				<span className="font-semibold ml-auto">{language}</span>
			</div>

			<div className="flex items-center gap-2">
				<Timer size={18} strokeWidth={2.5} />
				<span className="w-20 font-medium text-primary-toned-700">Duration:</span>
				<span className="font-semibold ml-auto">{minutesToAnswer} min</span>
			</div>

			<div className="flex items-center gap-2">
				<ListCollapse size={18} strokeWidth={2.5} />
				<span className="font-medium text-primary-toned-700">Number of questions:</span>
				<span className="font-semibold ml-auto">{_aggregate.numberOfQuestions || 0}</span>
			</div>

			<div className="flex items-center gap-2">
				<ClipboardList size={18} strokeWidth={2.5} />
				<span className="font-medium text-primary-toned-700">Total points:</span>
				<span className="font-semibold ml-auto">{_aggregate.totalPoints || 0}</span>
			</div>
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
					<span className="text-primary-toned-600">Password:</span>
					<span className="font-bold">{_detail.hasPassword ? (_detail.password || "N/A") : "N/A"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Attempts Allowed:</span>
					<span className="font-bold">{_detail.numberOfAttemptsAllowed !== undefined ? _detail.numberOfAttemptsAllowed : "N/A"}</span>
				</li>
				<li className="flex items-center gap-2">
					<span className="text-primary-toned-600">Participants:</span>
					<span className="font-bold">{_detail.numberOfParticipants !== undefined ? _detail.numberOfParticipants : "N/A"}</span>
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
