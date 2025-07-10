import { ArrowLeft, BrainCircuit, Sparkles, Upload, WandSparkles } from "lucide-react";
import { CreateTab, StepInfoKey } from "../common/types";
import QuickAction from "../../../../../features/tests/ui/sidebar/primitive/QuickAction";
import SidebarLayout from "../../../../../features/tests/ui/sidebar/SidebarLayout";

export default function Sidebar({
	tab,
	onTabChange,
	builderStep,
}: {
	tab: CreateTab;
	onTabChange: (tab: CreateTab) => void;
	builderStep: StepInfoKey;
}) {
	return (
		<SidebarLayout className="h-[96vh] flex flex-col gap-4 p-4">
			<style>
				{`
				@keyframes fadeIn {
					0% { opacity: 0; }
					100% { opacity: 1; }
				}
				@keyframes slideIn {
					0% {
						transform: translateX(-100%);
						opacity: 0;
					}
					100% {
						transform: translateX(0);
						opacity: 1;
					}
				}
				`}
			</style>
			{tab === "exam" && (
				<div
					className="flex flex-col gap-4 w-full h-full justify-between"
					style={{
						animation: "fadeIn 0.3s ease-in-out",
					}}>
					<div className="w-full relative group">
						{/* Introduction Section */}
						<div className="p-4 bg-gradient-to-r from-primary-toned-50 to-secondary-toned-50 border border-primary-toned-200 rounded-lg">
							<h4 className="font-bold text-primary-toned-700 mb-2 flex items-center">
								<BrainCircuit className="w-4 h-4 mr-2" />
								AI-Powered Test Generation
							</h4>
							<p className="text-sm text-primary-toned-600 leading-relaxed mb-4">
								Use our AI assistant to generate questions and tests quickly. Save time by letting AI assist you with the question creation process.
							</p>

							{/* Compact Button */}
							<QuickAction
								className="w-full"
								icon={<WandSparkles />}
								title='Assistant'
								variant={"gradient"}
								description='Generate questions with AI'
								onClick={() => onTabChange('generate')}
							/>
						</div>
					</div>

					<QuickAction
						icon={<Upload size={18} strokeWidth={2.5} />}
						title="Publish"
						variant={"alert"}
						description="Review and publish your exam"
						onClick={() => onTabChange('publish')}
						className="w-full"
					/>
				</div>
			)}

			{tab === "generate" && (
				<div
					className="flex flex-col gap-4 w-full h-full justify-between"
					style={{
						animation: "fadeIn 0.2s ease-in-out",
					}}>

					<div className="flex flex-col gap-4 w-full">
						<div className="bg-gradient-to-br from-primary to-secondary shadow-md text-white rounded-lg p-4 flex flex-col items-start">
							<h1 className="text-xl font-bold mb-2 flex items-center">
								<Sparkles className="w-5 h-5 mr-3" />
								Questions Generation
							</h1>
							<hr className="w-full border-white mb-2" />
							<p className="text-sm mb-2">
								Generate questions for your exam using our AI assistant. Specify the topics, difficulty levels, and number of questions you need.
							</p>
						</div>

						<div className="bg-gradient-to-r from-primary-toned-50 to-secondary-toned-50 border border-primary-toned-200 shadow-md rounded-lg p-4 flex flex-col items-start overflow-hidden">
							<h3 className="text-xl text-primary font-bold mb-2 flex items-center">
								Generation Tips
							</h3>

							{builderStep === 1 && (
								<span
									style={{
										animation: "slideIn 0.3s ease-in-out",
									}}
								>
									Basic information about the exam is required to generate questions. Please provide the exam title, description, and other necessary details.
								</span>
							)}
							{builderStep === 2 && (
								<span
									style={{
										animation: "slideIn 0.3s ease-in-out",
									}}
								>
									Topics and difficulty levels are essential for generating relevant questions. Specify the topics you want to cover in your exam, along with their respective difficulty levels.
									<br />
									<p className="text-sm text-primary-toned-600 mt-2">
										You can add multiple topics and specify the number of questions for each. Make sure to balance the difficulty levels across the topics for a well-rounded exam.
									</p>
								</span>
							)}
							{builderStep === 3 && (
								<span
									style={{
										animation: "slideIn 0.3s ease-in-out",
									}}
								>
									Specify the model's creativity level and provide any specific instructions or context that might help in generating better questions.
									<br />
									<p className="text-sm text-primary-toned-600 mt-2">
										The more context you provide to the model, the better it can generate questions that are  aligned with your exam's requirements.
									</p>
								</span>
							)}
							{builderStep === 4 && (
								<span
									style={{
										animation: "slideIn 0.3s ease-in-out",
									}}
								>
									Review the generated questions and make any necessary adjustments. You can edit, delete, or add new questions as needed. Once you are satisfied with the questions, you can proceed to publish your exam.
									<br />
									<p className="text-sm text-primary-toned-600 mt-2">
										Make sure to review the questions thoroughly to ensure they meet your requirements.
									</p>
								</span>
							)}
						</div>

					</div>

					<QuickAction
						icon={<ArrowLeft size={18} strokeWidth={2.5} />}
						title="Back to Exam"
						variant={"default"}
						description="Return to the exam configuration"
						onClick={() => onTabChange('exam')}
						active={true}
						className="w-full"
					/>
				</div>
			)}

			{tab === "publish" && (
				<div
					className="flex flex-col gap-4 w-full h-full justify-between"
					style={{
						animation: "fadeIn 0.2s ease-in-out",
					}}>

					<div className="bg-secondary-toned-50 border border-secondary-toned-200 shadow-md rounded-lg p-4 flex flex-col items-start">
						<h1 className="text-secondary text-xl font-bold mb-2 flex items-center">
							Review Your Exam
						</h1>
						<p className="text-secondary-toned-700 text-sm mb-2">
							Before publishing your exam, please review the details and ensure everything is correct. You can make any final adjustments to the exam configuration or questions.
						</p>
					</div>

					<QuickAction
						icon={<ArrowLeft size={18} strokeWidth={2.5} />}
						title="Back to Exam"
						variant={"default"}
						description="Return to the exam configuration"
						onClick={() => onTabChange('exam')}
						active={true}
						className="w-full"
					/>
				</div>
			)}
		</SidebarLayout>
	)
}
