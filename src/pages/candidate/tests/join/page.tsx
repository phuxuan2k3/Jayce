import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import { useState, useEffect } from "react";
import JoinTestSection from "./components/JoinTestSection";
import ExamInfoDialog from "./components/ExamInfoDialog";
import SidebarActions from "../../../../features/tests/ui/sidebar/primitive/SidebarActions";
import { useGetTestsFindByRoomQuery } from "../../../../features/tests/api/test.api-gen-v2";
import OnGoingTestsSection from "./components/OnGoingTestsSection";
import MyHeaderTitleSection from "../../../../features/tests/ui-sections/MyHeaderSection";
import FetchStateCover2 from "../../../../features/tests/ui/fetch-states/FetchStateCover2";
import ErrorDialog from "../../../../features/tests/ui/fetch-states/ErrorDialog";

export default function CandidateTestsJoinPage() {
	const [roomId, setRoomId] = useState<string | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

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
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setRoomId(null);
	};

	return (
		<LeftLayoutTemplate
			header={
				<LeftLayoutTemplate.Header
					title="Skillsharp Tests"
					description="Join hosted tests or generate your own practice tests from templates"
				/>
			}
			left={
				<SidebarActions>
					<SidebarActions.BrowseTemplates />
					<SidebarActions.GenerateTest />
					<SidebarActions.YourTests />
				</SidebarActions>
			}
		>
			<div className="flex flex-col gap-4 flex-1">
				<MyHeaderTitleSection
					title="Join Tests"
					description="Join tests by roomId or view ongoing tests"
					className="mb-4"
				/>

				{/* Join tests by roomId */}
				<JoinTestSection onJoinTest={handleJoinTest} isFetching={testFindQuery.isFetching} />

				<hr className="border-primary-toned-300 mt-4" />

				<OnGoingTestsSection />

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
		</LeftLayoutTemplate>
	);
};