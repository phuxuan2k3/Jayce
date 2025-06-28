import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import { useState, useEffect } from "react";
import JoinTestSection from "./components/JoinTestSection";
import ExamInfoDialog from "./components/ExamInfoDialog";
import { parseQueryError } from "../../../../helpers/fetchBaseQuery.error";
import SidebarActions from "../../../../features/tests/ui/sidebar/primitive/SidebarActions";
import { useGetTestsFindByRoomQuery } from "../../../../features/tests/api/test.api-gen-v2";

export default function CandidateTestsJoinPage() {
	const [roomId, setRoomId] = useState<string | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const testFindQuery = useGetTestsFindByRoomQuery({
		roomId: roomId || ""
	}, {
		skip: roomId == null,
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		if (testFindQuery.isSuccess) {
			setIsDialogOpen(true);
		}
	}, [testFindQuery.isSuccess]);

	const handleJoinTest = (roomId: string) => {
		setRoomId(roomId);
		setIsDialogOpen(true);
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
			<div className="flex flex-col gap-8">
				{/* Join tests by roomId */}
				<JoinTestSection onJoinTest={handleJoinTest} />

				{/* Exam Info Dialog */}
				{roomId &&
					<ExamInfoDialog
						isOpen={isDialogOpen}
						onClose={handleCloseDialog}
						roomId={roomId}
						isLoading={testFindQuery.isLoading}
						data={testFindQuery.data}
						error={parseQueryError(testFindQuery.error)}
					/>
				}
			</div>
		</LeftLayoutTemplate>
	);
};