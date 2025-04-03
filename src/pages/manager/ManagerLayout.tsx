import { Outlet } from "react-router-dom";
import RoleGuard from "../../components/wrapper/RoleGuard";
import FooterShort from "../../components/ui/footer/FooterShort";
import ManagerNavbar from "../../components/ui/navbar/ManagerNavbar";
import { Role } from "../../features/auth/types/auth";

export default function ManagerLayout() {
	return (
		<RoleGuard roles={[Role.Candidate]}>
			<ManagerNavbar />
			<Outlet />
			<FooterShort />
		</RoleGuard>
	)
}