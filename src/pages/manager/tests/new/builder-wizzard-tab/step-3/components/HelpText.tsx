import { useLanguage } from "../../../../../../../LanguageProvider";

interface HelpTextProps { }

export default function HelpText({ }: HelpTextProps) {
	const { t } = useLanguage();

	return (
		<div className="mt-8 p-4 bg-primary-toned-50 border border-primary-toned-200 rounded-lg">
			<h4 className="text-sm font-semibold text-primary-toned-800 mb-2">{t("help_tips_title")}</h4>
			<ul className="text-sm text-primary-toned-700 space-y-1">
				<li>• {t("help_tip_conservative")}</li>
				<li>• {t("help_tip_balanced")}</li>
				<li>• {t("help_tip_creative")}</li>
				<li>• {t("help_tip_context")}</li>
				<li>• {t("help_tip_upload")}</li>
			</ul>
		</div>
	);
}
