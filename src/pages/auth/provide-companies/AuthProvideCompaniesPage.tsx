import logo from "/svg/logo.svg";

export default function AuthProvideCompaniesPage() {
	const companies = [
		{ name: "TikTok", link: "https://cdn-icons-png.flaticon.com/512/3670/3670358.png" },
		{ name: "Microsoft", link: "https://cdn-icons-png.flaticon.com/512/732/732221.png" },
		{ name: "Amazon", link: "https://cdn-icons-png.flaticon.com/512/11378/11378506.png" },
		{ name: "Uber", link: "https://cdn-icons-png.flaticon.com/512/5969/5969324.png" },
		{ name: "Meta", link: "https://cdn-icons-png.flaticon.com/512/6033/6033716.png" },
		{ name: "TikTok", link: "https://cdn-icons-png.flaticon.com/512/3670/3670358.png" },
		{ name: "Microsoft", link: "https://cdn-icons-png.flaticon.com/512/732/732221.png" },
		{ name: "Amazon", link: "https://cdn-icons-png.flaticon.com/512/11378/11378506.png" },
		{ name: "Uber", link: "https://cdn-icons-png.flaticon.com/512/5969/5969324.png" },
		{ name: "Meta", link: "https://cdn-icons-png.flaticon.com/512/6033/6033716.png" },
		{ name: "Meta", link: "https://cdn-icons-png.flaticon.com/512/6033/6033716.png" },
		{ name: "Google", link: "https://cdn-icons-png.flaticon.com/512/720/720255.png" }
	];

	return (
		<div className="w-1/2 mx-auto">
			<div className="mt-16 mb-4 text-3xl font-bold">
				What companies are you interested in?
			</div>
			<input type="text" placeholder="Filter..." className="border w-full p-1 rounded-lg px-5 mt-8" />
			<div className="h-[200px] overflow-y-auto my-8">
				<div className="flex-wrap full flex  gap-2">
					{companies.map((company, index) => (
						<div key={index} className="w-24 flex flex-wrap justify-center items-center">
							<div className="p-2 rounded-3xl border border-gray-300">
								<img className="w-8" src={company.link} alt="" />
							</div>
							<div className="w-full text-center">{company.name}</div>
						</div>
					))}
				</div>
			</div>
			<div className="text-white text-center p-2 rounded-lg bg-[var(--primary-color)] mb-8 font-bold">
				<span> Continue</span>
			</div>
			<img src={logo} className="absolute opacity-25 bottom-0 right-0 w-52" alt="logo" />
		</div>
	);
}
