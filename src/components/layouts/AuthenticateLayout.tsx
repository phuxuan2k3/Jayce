import { Outlet } from "react-router-dom";
import RoleGuard from "../wrapper/RoleGuard";
import { Role } from "../../app/enum";
import paths from "../../router/paths";
import UnauthNavbar from "../ui/navbar/UnauthNavbar";
import React from "react";

export default function AuthenticateLayout() {
	return <>
		<RoleGuard roles={[
			Role.None
		]} alternativeUrl={[
			{ role: Role.Candidate, alternativeUrl: paths.candidate._layout },
			{ role: Role.Manager, alternativeUrl: paths.candidate._layout }
		]}>
			<UnauthNavbar />
			<Outlet />
			{/* Doesn't have footer */}
		</RoleGuard>
	</>;
}