import { Outlet } from "react-router-dom";
import { Role } from "../../../app/enum";
import CandidateNavbar from "../../../components/ui/navbar/CandidateNavbar";
import RoleGuard from "../../../components/wrapper/ProtectedRoute";
import FooterShort from "../../../components/ui/footer/FooterShort";
import FixedContent from "../../../components/ui/common/FixedContent";
import CurrentTestStatus from "../partials/CurrentAttemptStatus";

export default function CandidateLayout() {
	return (
		<RoleGuard roles={[Role.Candidate]}>
			<CandidateNavbar />
			<Outlet />
			<FooterShort />
			<FixedContent position="bottom-right">
				<CurrentTestStatus />
			</FixedContent>
		</RoleGuard>
	)
}