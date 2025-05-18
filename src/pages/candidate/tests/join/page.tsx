import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import { useState, useEffect } from "react";
import SidebarActions from "../../../../features/tests/ui2/sidebar/SidebarActions";
import JoinTestSection from "./components/JoinTestSection";
import ExamInfoDialog from "./components/ExamInfoDialog";
import { useGetExamsFindQuery } from "../../../../features/tests/api/test.api-gen";
import { parseQueryError } from "../../../../helpers/fetchBaseQuery.error";

export default function CandidateTestsJoinPage() {
	const [roomId, setRoomId] = useState<string | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const examTestFindQuery = useGetExamsFindQuery({
		roomId: roomId || ""
	}, {
		skip: roomId == null,
		refetchOnMountOrArgChange: true,
	});

	useEffect(() => {
		if (examTestFindQuery.isSuccess) {
			setIsDialogOpen(true);
		}
	}, [examTestFindQuery]);

	const handleJoinTest = (roomId: string) => {
		setRoomId(roomId);
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setRoomId(null);
	};

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
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
		>			<div className="flex flex-col gap-8">
				{/* Join tests by roomId */}
				<JoinTestSection onJoinTest={handleJoinTest} />

				{/* Exam Info Dialog */}
				{roomId &&
					<ExamInfoDialog
						isOpen={isDialogOpen}
						onClose={handleCloseDialog}
						roomId={roomId}
						isLoading={examTestFindQuery.isLoading}
						examData={examTestFindQuery.data}
						error={parseQueryError(examTestFindQuery.error)}
					/>
				}
			</div>
		</NewLeftLayoutTemplate>
	);
};