import { Outlet } from "react-router-dom";
import CandidateNavbar from "../../components/ui/navbar/CandidateNavbar";
import RoleGuard from "../../components/wrapper/RoleGuard";
import FooterShort from "../../components/ui/footer/FooterShort";
import { ShowCurrentTestProvider } from "./contexts/show-current-test.context";
import { Role } from "../../features/auth/types/auth";

export default function CandidateLayout() {
	return (
		<RoleGuard roles={[Role.Candidate]}>
			<ShowCurrentTestProvider>
				<div className="flex flex-col h-screen">
					<CandidateNavbar />
					<Outlet />
					<FooterShort />
				</div>
			</ShowCurrentTestProvider>
		</RoleGuard>
	)
}