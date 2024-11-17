import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";

export default function Layout() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="px-12 py-8">
				<Outlet />
			</div>
		</div>
	)
}