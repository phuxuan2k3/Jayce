import { useLanguage } from "../../../../../../LanguageProvider";

export const LoadingScreen = ({
	state,
}: {
	state: "none" | "saving" | "generating";
}) => {
	const { t } = useLanguage();

	if (state === "none") return null;

	return (
		<div className="flex flex-col items-center justify-center min-h-[400px]">
			<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
			<p className="mt-4 text-lg text-gray-600">
				{state === "saving"
					? t("loading_saving_test")
					: t("loading_generating_test")}
			</p>
		</div>
	);
};