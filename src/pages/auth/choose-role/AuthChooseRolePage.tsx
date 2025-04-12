import { useState } from "react";
import logo from "/svg/logo.svg";
import { useNavigate } from "react-router-dom";
import GradientBorder from "../../../components/ui/border/GradientBorder";
import paths from "../../../router/paths";

export default function AuthChooseRolePage() {
	const navigate = useNavigate();
	const [tab, setTab] = useState<"candidate" | "business" | "">("");
	return (
		<div className=" relative">
			<img src="/defaults/question.png" className=" absolute right-[20px] top-[120px] w-1/3" />
			<div className="font-arya text-3xl font-black mx-20 mt-28">
				How do you want to use SkillSharp?
			</div>
			<div onClick={() => setTab("business")}>
				<GradientBorder className={`mx-20 mt-10 border w-[600px] p-[1px]  rounded-lg ${tab === "business" ? "" : "opacity-50"}`}>
					<div className="flex items-center gap-8 px-8 py-2 bg-white  rounded-lg">
						<img src="https://cdn-icons-png.flaticon.com/512/1073/1073180.png" className="size-10" alt="" />
						<div>
							<div className="font-bold text-lg">I’m here to hire potential talent for my companies</div>
							<div className="text-md text-[var(--primary-color)]">Evaluate tech talent with scalable assessments</div>
						</div>
					</div>
				</GradientBorder>

			</div>
			<div onClick={() => setTab("candidate")}>
				<GradientBorder className={`mx-20 mt-10 border w-[600px] p-[1px]  rounded-lg ${tab === "candidate" ? "" : "opacity-50"}`}>
					<div className="flex items-center gap-8 px-8 py-2 bg-white  rounded-lg">
						<img src="https://cdn-icons-png.flaticon.com/512/1828/1828231.png" className="size-10" alt="" />
						<div>
							<div className="font-bold text-lg">I’m here to train and prepare for my interviews</div>
							<div className="text-md text-[var(--primary-color)]">Handle problems and learn new skills</div>
						</div>
					</div>
				</GradientBorder>
			</div>
			<div
				onClick={() => {
					if (tab === "candidate") {
						navigate(paths.auth.REGISTER);
					} else if (tab === "business") {
						navigate(paths.auth.BUSINESS_REGISTER);
					}
					else {
						// TODO: show a toast or warning dialog
						alert("Please select a role to continue")
					}
				}}
				className={`bg-[var(--primary-color)] py-2 text-white font-bold  mt-12 w-fit mx-20 rounded-lg px-28
                ${tab ? "" : "opacity-50"}`}>
				Create account
			</div>
			<img src={logo} className="absolute opacity-25 bottom-0 right-0 w-52" alt="logo" />
		</div>
	);
}
