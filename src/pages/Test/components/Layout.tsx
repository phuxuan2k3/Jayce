import { Outlet, useNavigate } from "react-router-dom";
import FooterShort from "../../../components/ui/footer/FooterShort";
import { paths } from "../../../router/path";
import CandidateNavbar from "../../../components/ui/navbar/CandidateNavbar";

export default function Layout() {
	const navigate = useNavigate();
	function handleHomeClick() {
		navigate(paths.HOME);
	}
	function handleQuestionClick() {
		navigate(paths.TEST.LIST);
	}

	return (
		<div className="min-h-screen flex flex-col">
			<CandidateNavbar />
			<div className="px-6 py-4 min-h-screen">
				<div className="text-sm text-gray-500 mb-4">
					<span className="font-semibold text-[var(--primary-color)]">
						<span onClick={handleHomeClick} className="underline cursor-pointer">Home</span>
						<span>&nbsp;&gt;&nbsp;</span>
						<span onClick={handleQuestionClick} className="underline cursor-pointer">Question</span>
					</span>
				</div>
				<Outlet />
			</div>
			<FooterShort />
		</div>
	)
}