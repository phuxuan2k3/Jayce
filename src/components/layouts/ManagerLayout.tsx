import { Outlet } from "react-router-dom";
import RoleGuard from "../wrapper/RoleGuard";
import FooterShort from "../ui/footer/FooterShort";
import ManagerNavbar from "../ui/navbar/ManagerNavbar";
import { Role } from "../../features/auth/types";

export default function ManagerLayout() {
	return (
		<RoleGuard roles={[Role.Candidate]}>
			<ManagerNavbar />
			<Outlet />
			<FooterShort />
		</RoleGuard>
	)
}