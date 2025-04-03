import { Outlet } from "react-router-dom";
import RoleGuard from "../../components/wrapper/RoleGuard";
import paths from "../../router/paths";
import UnauthNavbar from "../../components/ui/navbar/UnauthNavbar";
import { Role } from "../../features/auth/types/auth";

export default function AuthLayout() {
	return <>
		<RoleGuard roles={[
			Role.None
		]} alternativeUrl={[
			{
				role: Role.Candidate,
				alternativeUrl: paths.candidate._layout
			},
			{
				role: Role.Manager,
				alternativeUrl: paths.candidate._layout
			},
		]}>
			<UnauthNavbar />
			<Outlet />
			{/* Doesn't have footer */}
		</RoleGuard>
	</>;
}