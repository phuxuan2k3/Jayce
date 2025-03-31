import { Outlet } from "react-router-dom";
import { Role } from "../../app/enum";
import RoleGuard from "../wrapper/RoleGuard";
import FooterShort from "../ui/footer/FooterShort";
import ManagerNavbar from "../ui/navbar/ManagerNavbar";

export default function ManagerLayout() {
	return (
		<RoleGuard roles={[Role.Candidate]}>
			<ManagerNavbar />
			<Outlet />
			<FooterShort />
		</RoleGuard>
	)
}