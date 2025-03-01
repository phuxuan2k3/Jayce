import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import FooterShort from "../../../components/FooterShort";

export default function Layout() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="px-6 py-4 min-h-screen">
				<Outlet />
			</div>
			<FooterShort />
		</div>
	)
}