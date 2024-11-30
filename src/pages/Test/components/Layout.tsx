import { Outlet } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import FooterShort from "../../../components/FooterShort";

export default function Layout() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="px-6 py-4 min-h-screen">
				<div className="text-sm text-gray-500 mb-4">
					<span className="font-semibold text-[var(--primary-color)]"><span className="underline">Home</span> &gt; <span className="underline">Question</span></span>
				</div>
				<Outlet />
			</div>
			<FooterShort />
		</div>
	)
}