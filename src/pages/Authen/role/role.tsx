import Navbar from "../../../trash/Navbar";
import logo from "/svg/logo.svg";

export default function Role() {
	const roles = [
		"Frontend Developer",
		"Backend Developer",
		"Full-stack Developer",
		"Mobile Developer",
		"Game Developer",
		"Embedded Software Engineer",
		"DevOps Engineer",
		"Cloud Engineer",
		"Site Reliability Engineer (SRE)",
		"System Administrator",
		"Network Engineer",
		"Cybersecurity Engineer",
		"Penetration Tester",
		"Data Scientist",
		"Data Engineer",
		"Database Administrator (DBA)",
		"Machine Learning Engineer",
		"AI Engineer",
		"NLP Engineer",
		"UI/UX Designer",
		"Product Manager",
		"QA Engineer / Tester",
		"Tech Lead",
		"Software Architect",
		"CTO (Chief Technology Officer)"
	];

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="w-1/2 mx-auto">
				<div className="mt-16 mb-4 text-3xl font-bold">
					What role are you preparing for ?
				</div>
				<div className="text-gray-600">
					<div>We’ll give you personalized advice for the role you select </div>
					<div>Don’t worry, you can always change this later</div>
				</div>

				<input type="text" placeholder="Filter for role..." className="border w-full p-1 rounded-lg px-5 mt-8" />
				<div className="h-[300px] overflow-y-auto my-8">
					<div className="flex-wrap full flex  gap-2">
						{roles.map((role, index) => (
							<div className="rounded-2xl border-[var(--primary-color)] border  px-2 py-1 " key={index}>
								{role}
							</div>
						))}
					</div>
				</div>
				<div className="text-white text-center p-2 rounded-lg bg-[var(--primary-color)] mb-8 font-bold">
					<span> Continue</span>
				</div>
				<img src={logo} className="absolute opacity-25 bottom-0 right-0 w-52" alt="logo" />
			</div>
		</div>
	);
}
