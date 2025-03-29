import { Outlet, useLocation, Link } from "react-router-dom";
import FooterShort from "../../../components/ui/footer/FooterShort";
import CandidateNavbar from "../../../components/ui/navbar/CandidateNavbar";
import React from "react";

export default function Layout() {
	const location = useLocation();
	const paths = location.pathname.split("/").filter(Boolean);

	return (
		<div className="min-h-screen flex flex-col">
			<CandidateNavbar />
			<div className="px-6 py-4 min-h-screen">
				<div className="text-sm text-gray-500 mb-4 ml-12">
					<span key="Home">
						<Link to="/" className="font-semibold text-[var(--primary-color)] underline">
							Home
						</Link>
						<span>&nbsp;&gt;&nbsp;</span>
					</span>
					{paths.map((path, index) => {
						const to = `/${paths.slice(0, index + 1).join("/")}`;
						return (
							<span key={to}>
								<Link to={to} className="font-semibold text-[var(--primary-color)] underline">
									{path.charAt(0).toUpperCase() + path.slice(1)}
								</Link>
								{index < paths.length - 1 && <span>&nbsp;&gt;&nbsp;</span>}
							</span>
						);
					})}
				</div>
				<Outlet />
			</div>
			<FooterShort />
		</div>
	)
}