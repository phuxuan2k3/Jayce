import { Outlet } from "react-router-dom";
import { Role } from "../../../app/enum";
import CandidateNavbar from "../../../components/ui/navbar/CandidateNavbar";
import RoleGuard from "../../../components/wrapper/ProtectedRoute";
import FooterShort from "../../../components/ui/footer/FooterShort";

export default function CandidateLayout() {
	return (
		<RoleGuard roles={[Role.Candidate]}>
			<CandidateNavbar />
			<Outlet />
			<FooterShort />
		</RoleGuard>
	)
}