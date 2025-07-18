import { useLanguage } from "../../../../LanguageProvider";

export const TemplateHelpSection = () => {
	const { t } = useLanguage();

	return (
		<div className="bg-primary-toned-100 rounded-lg p-4 my-2 shadow-md">
			<h4 className="font-semibold text-primary-toned-700 mb-2">{t("template_help_title")}</h4>
			<p className="text-sm text-primary-toned-600 mb-2">{t("template_help_intro")}</p>
			<p className="text-sm text-primary-toned-600 mb-2">{t("template_help_tip")}</p>
			<a href="#" className="text-primary-toned-600 text-sm font-semibold flex items-center">
				{t("template_help_learn_more")}
				<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
				</svg>
			</a>
		</div>
	);
};
