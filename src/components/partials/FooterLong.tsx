import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const FooterLong: React.FC = () => {
	return (
		<footer className="bg-black text-white py-8 mt-auto">
			<div className="container mx-auto px-6 md:px-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* Logo Section */}
					<div>
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gray-700 rounded-md"></div>
							<span className="text-xl font-bold">SkillSharp</span>
						</div>
						<div className="mt-4">
							<p className="font-semibold">Follow us</p>
							<div className="flex space-x-3 mt-2">
								<FaFacebook className="text-white text-2xl cursor-pointer hover:text-gray-400" />
								<FaInstagram className="text-white text-2xl cursor-pointer hover:text-gray-400" />
								<FaYoutube className="text-white text-2xl cursor-pointer hover:text-gray-400" />
							</div>
						</div>
					</div>

					{/* Interview Questions */}
					<div>
						<h4 className="font-bold mb-3">Interview Questions</h4>
						<ul className="space-y-2">
							{Array(5).fill("Interview Questions").map((item, index) => (
								<li key={index} className="hover:text-gray-400 cursor-pointer">
									{item}
								</li>
							))}
						</ul>
					</div>

					{/* Courses */}
					<div>
						<h4 className="font-bold mb-3">Courses</h4>
						<ul className="space-y-2">
							{Array(5).fill("Courses").map((item, index) => (
								<li key={index} className="hover:text-gray-400 cursor-pointer">
									{item}
								</li>
							))}
						</ul>
					</div>

					{/* Popular Articles */}
					<div>
						<h4 className="font-bold mb-3">Popular Articles</h4>
						<ul className="space-y-2">
							{Array(5).fill("Popular Articles").map((item, index) => (
								<li key={index} className="hover:text-gray-400 cursor-pointer">
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterLong;
