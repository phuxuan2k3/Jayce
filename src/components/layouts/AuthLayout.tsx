import { Outlet } from "react-router-dom";
import UnauthNavbar from "../ui/navbar/UnauthNavbar";

export default function AuthLayout() {
	return <>
		<UnauthNavbar />
		<Outlet />
	</>;
}