import { ArrowRight, BookOpenText, BrainCircuit, ClipboardList, Rocket } from "lucide-react";
import QuickAction from "../../../../../features/tests/ui/sidebar/primitive/QuickAction";
import SidebarLayout from "../../../../../features/tests/ui/sidebar/SidebarLayout";
import paths from "../../../../../router/paths";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../../LanguageProvider";

export default function Sidebar() {
	const { t } = useLanguage();

	const navigate = useNavigate();

	return (
		<SidebarLayout className="flex flex-col top-16 min-h-fit overflow-y-auto h-[calc(100vh-8rem)]">
			<div className="relative group">
				{/* Introduction Section */}
				<div className="p-4 bg-gradient-to-r from-primary-toned-50 to-secondary-toned-50 border border-primary-toned-200 rounded-lg">
					<h4 className="font-bold text-primary-toned-700 mb-2 flex items-center">
						<BrainCircuit className="w-4 h-4 mr-2" />
						{t("sidebar_ai_title")}
					</h4>
					<p className="text-sm text-primary-toned-600 leading-relaxed mb-4">
						{t("sidebar_ai_description")}
					</p>

					{/* Compact Button */}
					<button
						onClick={() => navigate(paths.candidate.tests.GENERATE)}
						className="w-full relative overflow-hidden bg-gradient-to-r from-primary-toned-500 to-secondary-toned-500 hover:from-primary-toned-600 hover:to-secondary-toned-600 text-white rounded-lg py-3 px-4 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group"
					>
						{/* Animated Background Effect */}
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

						{/* Content Container */}
						<div className="relative z-10 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Rocket className="w-5 h-5 text-white" />
								<div className="text-left">
									<span className="font-semibold text-white">{t("sidebar_generate_button")}</span>
								</div>
							</div>

							{/* Arrow Icon */}
							<div className="text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
								<ArrowRight className="w-5 h-5" />
							</div>
						</div>
					</button>
				</div>
			</div>

			<hr className="border-primary-toned-200 my-2" />
			<QuickAction
				icon={<ClipboardList className="w-5 h-5" />}
				title={t("sidebar_join_exam_title")}
				description={t("sidebar_join_exam_desc")}
				onClick={() => navigate(paths.candidate.tests.JOIN)}
			/>

			<QuickAction
				icon={<BookOpenText className="w-5 h-5" />}
				title={t("sidebar_browse_templates_title")}
				description={t("sidebar_browse_templates_desc")}
				onClick={() => navigate(paths.candidate.tests.TEMPLATES)}
			/>
		</SidebarLayout>
	)
}
