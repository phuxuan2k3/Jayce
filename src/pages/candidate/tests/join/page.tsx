import { useState, useEffect } from "react";
import JoinTestSection from "./components/JoinTestSection";
import ExamInfoDialog from "./components/ExamInfoDialog";
import { useGetTestsFindByRoomQuery } from "../../../../features/tests/api/test.api-gen-v2";
import OnGoingExamsSection from "./components/OnGoingExamsSection";
import MyHeaderTitleSection from "../../../../features/tests/ui-sections/MyHeaderSection";
import FetchStateCover2 from "../../../../features/tests/ui/fetch-states/FetchStateCover2";
import ErrorDialog from "../../../../features/tests/ui/fetch-states/ErrorDialog";
import RightLayoutTemplate from "../../../../components/layouts/RightLayoutTemplate";
import Sidebar from "./components/Sidebar";
import { JoinTabType } from "./types";
import PublicExamsSection from "./components/PublicExamsSection";
import HistoryExamsSection from "./components/HistoryExamsSection";

export default function CandidateTestsJoinPage() {
	const [roomId, setRoomId] = useState<string | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [tab, setTab] = useState<JoinTabType>("PUBLIC");

	const testFindQuery = useGetTestsFindByRoomQuery({
		roomId: roomId?.trim() || ""
	}, {
		skip: roomId == null || roomId.trim() === "",
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		if (
			testFindQuery.isSuccess === true &&
			testFindQuery.isFetching === false
		) {
			setIsDialogOpen(true);
		}
	}, [testFindQuery.isSuccess, testFindQuery.isFetching]);

	const handleJoinTest = (roomId: string) => {
		setRoomId(roomId);
		testFindQuery.refetch();
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setRoomId(null);
	};

	return (
		<RightLayoutTemplate
			header={
				<RightLayoutTemplate.Header
					title="Exam Tests"
					description="Join hosted exams from managers and compete with others"
				/>
			}
			right={<Sidebar tab={tab} onTabChange={setTab} />}
		>
			<div className="flex flex-col gap-4 flex-1">
				<MyHeaderTitleSection
					title="Join Hosted Exams"
					description="Join tests by roomId or view ongoing tests"
					className="mb-4"
				/>

				{/* Join tests by roomId */}
				<JoinTestSection onJoinTest={handleJoinTest} isFetching={testFindQuery.isFetching} />

				<hr className="border-primary-toned-300 mt-4" />

				{tab === "ONGOING" && (<OnGoingExamsSection />)}
				{tab === "PUBLIC" && (<PublicExamsSection
					onExamClick={(exam) => {
						if (exam._detail.mode === "EXAM") {
							setRoomId(exam._detail.roomId);
							testFindQuery.refetch();
						}
					}}
				/>)}
				{tab === "HISTORY" && (<HistoryExamsSection />)}

				{/* Exam Info Dialog */}
				{roomId && (
					<FetchStateCover2
						fetchState={testFindQuery}
						errorComponent={(error) => <ErrorDialog error={error} />}
						dataComponent={(data) => (
							<ExamInfoDialog
								isOpen={isDialogOpen}
								onClose={handleCloseDialog}
								roomId={roomId}
								data={data}
							/>
						)}
					/>
				)}
			</div>
		</RightLayoutTemplate>
	);
};