import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import FooterShort from "../../../components/FooterShort";
import { paths } from "../../../router/path";

export default function LayoutInterviewPractice() {
	const navigate = useNavigate();
	function handleHomeClick() {
		navigate(paths.HOME);
	}
	function handleQuestionClick() {
		navigate(paths.TEST.LIST);
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="px-6 py-4 min-h-screen">
				<div className="text-sm text-gray-500 mb-4">
					<span className="font-semibold text-[var(--primary-color)]">
						<span onClick={handleHomeClick} className="underline cursor-pointer">Home</span>
						<span>&nbsp;&gt;&nbsp;</span>
						<span onClick={handleQuestionClick} className="underline cursor-pointer">Question</span>
						<span>&nbsp;&gt;&nbsp;</span>
						<span onClick={handleQuestionClick} className="underline cursor-pointer">Interview Practice</span>

					</span>
				</div>
				<Outlet />
			</div>
			<FooterShort />
		</div>
	)
}