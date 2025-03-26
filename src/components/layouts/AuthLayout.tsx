import { Outlet } from "react-router-dom";
import UnauthNavbar from "../ui/navbar/UnauthNavbar";
import RoleGuard from "../wrapper/RoleGuard";
import { Role } from "../../app/enum";

export default function AuthLayout() {
	return <>
		<RoleGuard roles={[
			Role.None
		]}>
			<UnauthNavbar />
			<Outlet />
		</RoleGuard>
	</>;
}