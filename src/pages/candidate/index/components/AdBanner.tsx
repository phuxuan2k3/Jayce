import { useLanguage } from "../../../../LanguageProvider";

const AdBanner = () => {
	const { t } = useLanguage();

	return (
		<div className="border border-gray-300 rounded-md overflow-hidden bg-white">
			<img src="/defaults/landing_img_316.png" alt="Ad Banner" className="w-full object-cover" />
			<div className="bg-blue-100 text-xs text-center py-1 text-blue-600 font-medium cursor-pointer">
				{t("candidate_home_ad_remove")}
			</div>
		</div>
	);
};

export default AdBanner;
