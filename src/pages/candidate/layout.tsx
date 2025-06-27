import { Outlet } from "react-router-dom";
import CandidateNavbar from "../../components/partials/CandidateNavbar";
import RoleGuard from "../../components/wrapper/RoleGuard";
import FooterShort from "../../components/partials/FooterShort";
import { ShowCurrentTestProvider } from "./contexts/show-current-test.context";
import { Role } from "../../features/auth/types/auth";

export default function CandidateLayout() {
	return (
		<RoleGuard roles={[Role.Candidate]}>
			<ShowCurrentTestProvider>
				<div className="flex flex-col w-full min-h-screen">
					<CandidateNavbar />
					<div className="flex-1">
						<Outlet />
					</div>
					<FooterShort />
				</div>
			</ShowCurrentTestProvider>
		</RoleGuard>
	);
}