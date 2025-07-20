import { Outlet } from "react-router-dom";
import CandidateNavbar from "../../components/partials/CandidateNavbar";
import RoleGuard from "../../components/wrapper/RoleGuard";
import FooterShort from "../../components/partials/FooterShort";
import { Role } from "../../features/auth/types/auth";

export default function CandidateLayout() {
	return (
		<RoleGuard roles={[Role.Candidate]}>
			<div className="flex flex-col w-full min-h-screen">
				<CandidateNavbar />
				<div className="flex-1 bg-primary bg-opacity-15 flex justify-center">
					<Outlet />
				</div>
				<FooterShort />
			</div>
		</RoleGuard>
	);
}
