import { Outlet } from "react-router-dom";
import { Role } from "../../app/enum";
import CandidateNavbar from "../ui/navbar/CandidateNavbar";
import RoleGuard from "../wrapper/RoleGuard";
import FooterShort from "../ui/footer/FooterShort";

export default function CandidateLayout() {
	return (
		<RoleGuard roles={[Role.Candidate]}>
			<CandidateNavbar />
			<Outlet />
			<FooterShort />
		</RoleGuard>
	)
}