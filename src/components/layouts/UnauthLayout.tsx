import { Outlet } from "react-router-dom";
import UnauthNavbar from "../ui/navbar/UnauthNavbar";
import FooterLong from "../ui/footer/FooterLong";
import RoleGuard from "../wrapper/RoleGuard";
import { Role } from "../../app/enum";
import paths2 from "../../router/paths";
import React from "react";

export default function UnauthLayout() {
	return <>
		<RoleGuard
			roles={[Role.None]}
			alternativeUrl={[
				{ role: Role.Candidate, alternativeUrl: paths2.candidate._layout },
				{ role: Role.Manager, alternativeUrl: paths2.manager._layout },
			]}>
			<UnauthNavbar />
			<Outlet />
			<FooterLong />
		</RoleGuard>
	</>;
}