import { useAppSelector } from "../../../app/hooks";
import RightLayoutTemplate from "../../../components/layouts/RightLayoutTemplate";
import { authSelectors } from "../../../features/auth/store/authSlice";
import { useLanguage } from "../../../LanguageProvider";
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
						backButton={null}
					/>
				}
				right={
					<div className="flex flex-col gap-4 p-4 bg-white sticky top-16 shadow-primary rounded-lg">
						<QuickNavigation />
					</div>
				}
			>
				<div className="flex flex-col">
					<SuggestedTests />
					<RecentTemplates />
					<SuggestedPositions />
				</div>
			</RightLayoutTemplate>
		</>
	);
};

export default CandidateHomePage;