import { useAppSelector } from "../../../app/hooks";
import RightLayoutTemplate from "../../../components/layouts/RightLayoutTemplate";
import { authSelectors } from "../../../features/auth/store/authSlice";
import { useLanguage } from "../../../LanguageProvider";
import AdBanner from "./components/AdBanner";
import QuickNavigation from "./components/QuickNavigation";
import RecentTemplates from "./components/RecentTemplates";
import SuggestedPositions from "./components/SuggestedPositions";
import SuggestedTests from "./components/SuggestedTests";

const CandidateHomePage = () => {
	const { t } = useLanguage();
	const authData = useAppSelector(authSelectors.selectUserInfo);

	return (
		<>
			<RightLayoutTemplate
				header={
					<RightLayoutTemplate.Header
						title={`${t("candidate_home_welcome")}, ${authData?.metadata.fullname || authData?.username}`}
						description={t("candidate_home_subtitle")}
						backButton={undefined}

					/>
				}
				right={
					<div className="w-full lg:w-1/4 flex flex-col gap-4 lg:sticky lg:top-10 self-start mb-8">
						<div className="hidden lg:block">
							<QuickNavigation />
						</div>
						<AdBanner />
					</div>
				}
			>
				<div className="lg:hidden mb-4">
					<QuickNavigation />
				</div>

				<div className="flex flex-col lg:flex-row gap-8">
					<div className="w-full lg:w-3/4 flex flex-col">
						<SuggestedTests />
						<RecentTemplates />
						<SuggestedPositions />
					</div>
				</div>
			</RightLayoutTemplate>
		</>
	);
};

export default CandidateHomePage;