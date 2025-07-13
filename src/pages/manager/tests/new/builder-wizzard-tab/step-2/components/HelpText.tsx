import { useLanguage } from "../../../../../../../LanguageProvider";

interface HelpTextProps { }

export default function HelpText({ }: HelpTextProps) {
	const { t } = useLanguage();

	return (<div className="mt-8 p-4 bg-primary-toned-50 border border-primary-toned-200 rounded-lg">
		<h4 className="text-sm font-semibold text-primary-toned-800 mb-2">{t("help_text_title")}:</h4>
		<ul className="text-sm text-primary-toned-700 space-y-1">
			<li>• {t("help_text_tip_1")}</li>
			<li>• {t("help_text_tip_2")}</li>
			<li>• {t("help_text_tip_3")}</li>
		</ul>
	</div>
	);
}
