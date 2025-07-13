import { ArrowLeft, BrainCircuit, Sparkles, Upload, WandSparkles } from "lucide-react";
import { CreateTab, StepInfoKey } from "../common/types";
import QuickAction from "../../../../../features/tests/ui/sidebar/primitive/QuickAction";
import SidebarLayout from "../../../../../features/tests/ui/sidebar/SidebarLayout";
import { useLanguage } from "../../../../../LanguageProvider";

export default function Sidebar({
	tab,
	onTabChange,
	builderStep,
}: {
	tab: CreateTab;
	onTabChange: (tab: CreateTab) => void;
	builderStep: StepInfoKey;
}) {
	const { t } = useLanguage();

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
								{t("sidebar_exam_title")}
							</h4>
							<p className="text-sm text-primary-toned-600 leading-relaxed mb-4">
								{t("sidebar_exam_description")}
							</p>

							{/* Compact Button */}
							<QuickAction
								className="w-full"
								icon={<WandSparkles />}
								title={t("sidebar_exam_button_title")}
								variant={"gradient"}
								description={t("sidebar_exam_button_description")}
								onClick={() => onTabChange('generate')}
							/>
						</div>
					</div>

					<QuickAction
						icon={<Upload size={18} strokeWidth={2.5} />}
						title={t("sidebar_publish_title")}
						variant={"alert"}
						description={t("sidebar_publish_description")}
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
								{t("sidebar_generate_title")}
							</h1>
							<hr className="w-full border-white mb-2" />
							<p className="text-sm mb-2">
								{t("sidebar_generate_description")}
							</p>
						</div>

						<div className="bg-gradient-to-r from-primary-toned-50 to-secondary-toned-50 border border-primary-toned-200 shadow-md rounded-lg p-4 flex flex-col items-start overflow-hidden">
							<h3 className="text-xl text-primary font-bold mb-2 flex items-center">
								{t("sidebar_generate_tips_title")}
							</h3>

							{builderStep === 1 && (
								<span
									style={{
										animation: "slideIn 0.3s ease-in-out",
									}}
								>
									{t("sidebar_generate_step1")}
								</span>
							)}
							{builderStep === 2 && (
								<span
									style={{
										animation: "slideIn 0.3s ease-in-out",
									}}
								>
									{t("sidebar_generate_step2")}
									<br />
									<p className="text-sm text-primary-toned-600 mt-2">
										{t("sidebar_generate_step2_note")}
									</p>
								</span>
							)}
							{builderStep === 3 && (
								<span
									style={{
										animation: "slideIn 0.3s ease-in-out",
									}}
								>
									{t("sidebar_generate_step3")}
									<br />
									<p className="text-sm text-primary-toned-600 mt-2">
										{t("sidebar_generate_step3_note")}
									</p>
								</span>
							)}
							{builderStep === 4 && (
								<span
									style={{
										animation: "slideIn 0.3s ease-in-out",
									}}
								>
									{t("sidebar_generate_step4")}
									<br />
									<p className="text-sm text-primary-toned-600 mt-2">
										{t("sidebar_generate_step4_note")}
									</p>
								</span>
							)}
						</div>

					</div>

					<QuickAction
						icon={<ArrowLeft size={18} strokeWidth={2.5} />}
						title={t("sidebar_back_to_exam_title")}
						variant={"default"}
						description={t("sidebar_back_to_exam_description")}
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
							{t("sidebar_publish_review_title")}
						</h1>
						<p className="text-secondary-toned-700 text-sm mb-2">
							{t("sidebar_publish_review_description")}
						</p>
					</div>

					<QuickAction
						icon={<ArrowLeft size={18} strokeWidth={2.5} />}
						title={t("sidebar_back_to_exam_title")}
						variant={"default"}
						description={t("sidebar_back_to_exam_description")}
						onClick={() => onTabChange('exam')}
						active={true}
						className="w-full"
					/>
				</div>
			)}
		</SidebarLayout>
	)
}
