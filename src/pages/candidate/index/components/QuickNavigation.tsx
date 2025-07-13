import { useLanguage } from "../../../../LanguageProvider";

interface QuickNavigationProps {
	isVisible?: boolean;
}

const QuickNavigation = ({ isVisible = true }: QuickNavigationProps) => {
	const { t } = useLanguage();

	if (!isVisible) return null;

	return (
		<div className="border border-gray-200 p-5 rounded-2xl shadow-sm bg-white">
			<h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
				{t("candidate_home_quick_nav_title")}
			</h3>
			<ul className="space-y-3 text-sm font-medium text-gray-700">
				<li><a href="#suggested-tests" className="block px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition">{t("candidate_home_suggested_tests_title")}</a></li>
				<li><a href="#recent-templates" className="block px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition">{t("candidate_home_recent_templates_title")}</a></li>
				<li><a href="#suggested-positions" className="block px-3 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition">{t("candidate_home_positions_title")}</a></li>
			</ul>
		</div>
	);
};

export default QuickNavigation;
