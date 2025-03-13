import Navbar from "../../../trash/Navbar";
import logo from "/svg/logo.svg";

export default function Suggestion() {
	const suggestions = [
		"Findding job oppotunities",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
		"Passing resume screens",
	]

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="w-1/2 mx-auto">
				<div className="mt-16 text-3xl font-bold">
					I need help with ...
				</div>

				<div className="h-[300px] overflow-y-auto my-8">
					{suggestions.map((suggestion, index) => (
						<div key={index} className="w-full flex items-cente my-5 gap-3 text-6 font-semibold">
							<input type="checkbox" className="checkbox checkbox-success" />
							<span>{suggestion}</span>
						</div>
					))}
				</div>
				<div className="text-white text-center p-2 rounded-lg bg-[var(--primary-color)] mb-8 font-bold">
					<span> Continue</span>
				</div>
				<img src={logo} className="absolute opacity-25 bottom-0 right-0 w-52" alt="logo" />
			</div>
		</div>
	);
}
