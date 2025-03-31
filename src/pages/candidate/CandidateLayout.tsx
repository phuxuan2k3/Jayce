import { Outlet } from "react-router-dom";
import { Role } from "../../app/enum";
import CandidateNavbar from "../../components/ui/navbar/CandidateNavbar";
import RoleGuard from "../../components/wrapper/RoleGuard";
import FooterShort from "../../components/ui/footer/FooterShort";
import { ShowCurrentTestProvider } from "./show-current-test.context";

export default function CandidateLayout() {
	return (
		<RoleGuard roles={[Role.Candidate]}>
			<ShowCurrentTestProvider>
				<CandidateNavbar />
				<Outlet />
				<FooterShort />
			</ShowCurrentTestProvider>
		</RoleGuard>
	)
}