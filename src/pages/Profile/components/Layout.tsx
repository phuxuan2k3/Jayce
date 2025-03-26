import { Outlet } from "react-router-dom";
import FooterShort from "../../../components/ui/footer/FooterShort";
import CandidateNavbar from "../../../components/ui/navbar/CandidateNavbar";

export default function Layout() {
	return (
		<div className="min-h-screen flex flex-col">
			<CandidateNavbar />
			<div className="px-6 py-4 min-h-screen">
				<Outlet />
			</div>
			<FooterShort />
		</div>
	)
}