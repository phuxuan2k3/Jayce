import { useState } from "react";
import AITestQuestionGeneration from "./Step2/AITestQuestionGeneration";
import QuestionsCreateList from "./Step2/QuestionsCreateList";
import { RiRobot3Line } from "react-icons/ri";
import { Edit } from "lucide-react"

export default function TestCreateStep2() {
	const [isAIGeneration, setIsAIGeneration] = useState(false);
	const [isAIGenerationAnimated, setIsAIGenerationAnimated] = useState(isAIGeneration);

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="mt-6 text-center">
				<div className="font-arya text-[28px] font-bold text-center mt-10">
					{isAIGeneration
						? "Fill in some specific contexts to generate questions..."
						: "Add some questions to your test..."
					}
				</div>
			</div>

			<div className="w-full flex-grow relative min-h-fit overflow-hidden">
				<div
					className={`${!isAIGenerationAnimated || !isAIGeneration
						? "static flex items-start justify-center w-full h-full"
						: "absolute inset-0 invisible"
						}`}
					style={{
						opacity: isAIGeneration ? 0 : 1,
						transition: "all 0.3s ease-in-out",
					}}>
					<QuestionsCreateList />
				</div>
				<div
					className={`${isAIGenerationAnimated && isAIGeneration
						? "static w-full h-full"
						: "absolute inset-0"
						} items-center justify-center`}
					style={{
						translate: isAIGeneration ? "0 0" : "100% 0%",
						transition: "all 0.3s ease-in-out",
					}}
					onTransitionEnd={() => setIsAIGenerationAnimated(isAIGeneration)}
				>
					<AITestQuestionGeneration
						onGenerated={() => setIsAIGeneration(false)}
					/>
				</div>

				<button
					className={`fixed bottom-10 left-10 p-4 shadow-md rounded-full transition-all duration-300 ${isAIGeneration
						? "bg-white text-primary border border-primary"
						: "bg-primary text-white"
						}`}
					onClick={() => {
						setIsAIGeneration(prev => !prev)
					}}
				>
					{isAIGeneration ? (
						<Edit size={20} />
					) : (
						<RiRobot3Line size={20} />
					)}
				</button>
			</div>
		</div>
	)
};
