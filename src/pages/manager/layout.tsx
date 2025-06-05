import { Outlet } from "react-router-dom";
import RoleGuard from "../../components/wrapper/RoleGuard";
import FooterShort from "../../components/ui/footer/FooterShort";
import ManagerNavbar from "../../components/ui/navbar/ManagerNavbar";
import { Role } from "../../features/auth/types/auth";
import DeleteExamDialog from "../../features/tests/ui2/DeleteExamDialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import dialogSlice from "../../features/tests/stores/dialogSlice";

export default function ManagerLayout() {
	const examToDelete = useAppSelector((state) => state.dialog.manager.deleteExam);
	const dispatch = useAppDispatch();
	const handleCloseDeleteDialog = () => {
		dispatch(dialogSlice.actions.setDeleteExam(null));
	};

	return (
		<RoleGuard roles={[Role.Manager]}>
			<div className="flex flex-col w-full min-h-screen">
				<ManagerNavbar />

				<div className="flex-1 w-full">
					<Outlet />
				</div>

				<FooterShort />
			</div>


			<DeleteExamDialog
				examToDelete={examToDelete}
				onCancel={handleCloseDeleteDialog}
				onDelete={(exam) => {
					console.log("Deleting exam:", exam);
					handleCloseDeleteDialog();
				}}
			/>
		</RoleGuard>
	)
}