import { Outlet } from "react-router-dom";
import UnauthNavbar from "../ui/navbar/UnauthNavbar";
import FooterLong from "../ui/footer/FooterLong";
import RoleGuard from "../wrapper/RoleGuard";
import paths from "../../router/paths";
import { Role } from "../../features/auth/types";

// Has extra footer in comparision to AuthLayout
export default function UnauthLayout() {
	return <>
		<RoleGuard
			roles={[Role.None]}
			alternativeUrl={[
				{
					role: Role.Candidate,
					alternativeUrl: paths.candidate._layout
				},
				{
					role: Role.Manager,
					alternativeUrl: paths.manager._layout
				},
			]}>
			<UnauthNavbar />
			<Outlet />
			<FooterLong />
		</RoleGuard>
	</>;
}