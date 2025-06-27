import { Outlet } from "react-router-dom";
import RoleGuard from "../../components/wrapper/RoleGuard";
import FooterShort from "../../components/partials/FooterShort";
import ManagerNavbar from "../../components/partials/ManagerNavbar";
import { Role } from "../../features/auth/types/auth";
import DeleteExamDialog from "./tests/[id]/components/DeleteTestModal";
import FetchStateDialog from "../../infra-test/ui/dialogs/FetchStateDialog";

export default function ManagerLayout() {
	return (
		<RoleGuard roles={[Role.Manager]}>
			<div className="flex flex-col w-full min-h-screen">
				<ManagerNavbar />

				<div className="flex-1 w-full">
					<Outlet />
				</div>

				<FooterShort />
			</div>

			<DeleteExamDialog />
			<FetchStateDialog />
		</RoleGuard>
	)
}