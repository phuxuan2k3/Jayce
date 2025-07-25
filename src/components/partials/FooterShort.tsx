import React from 'react';
import logo from "/svg/logo.svg";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";

const FooterShort: React.FC = () => {
	return (
		<footer className=" bg-black text-white py-8">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center space-x-12">
					<img src={logo} className="h-8" />
					<div className="flex space-x-4 text-gray-400 hover:text-white">
						<a href="#">
							<Facebook />
						</a>
						<a href="#">
							<Instagram />
						</a>
						<a href="#">
							<YouTube />
						</a>
					</div>
				</div>
				<div className="text-gray-400 text-center">
					<p className="text-sm">© 2025 Skillsharp</p>
					<p className="text-xs">All rights reserved.</p>
					<p className="text-xs mt-1">Contents generated by AI might not be accurate, please consider carefully.</p>
				</div>
				<nav className="space-x-8 font-sans font-bold hover:text-gray-400">
					<a href="#">Help Center</a>
					<a href="#">Terms & Policy</a>
				</nav>
			</div>
		</footer>
	);
};

export default FooterShort;