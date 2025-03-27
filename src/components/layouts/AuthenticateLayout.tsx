import { Outlet } from "react-router-dom";
import RoleGuard from "../wrapper/RoleGuard";
import { Role } from "../../app/enum";
import paths2 from "../../router/path-2";
import UnauthNavbar from "../ui/navbar/UnauthNavbar";

export default function AuthenticateLayout() {
	return <>
		<RoleGuard roles={[
			Role.None
		]} alternativeUrl={[
			{ role: Role.Candidate, alternativeUrl: paths2.candidate.ROOT },
			{ role: Role.Manager, alternativeUrl: paths2.candidate.ROOT }
		]}>
			<UnauthNavbar />
			<Outlet />
		</RoleGuard>
	</>;
}