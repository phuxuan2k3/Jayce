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
				<nav className="space-x-8 font-sans font-bold hover:text-gray-400">
					<a href="#">Interview Questions</a>
					<a href="#">Courses</a>
					<a href="#">Popular Articles</a>
					<a href="#">Help Center</a>
					<a href="#">Terms & Policy</a>
				</nav>
			</div>
		</footer>
	);
};

export default FooterShort;