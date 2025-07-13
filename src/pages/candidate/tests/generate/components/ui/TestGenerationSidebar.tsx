import { useNavigate } from 'react-router-dom';
import paths from '../../../../../../router/paths';
import { ArrowLeft, Save, List } from 'lucide-react';
import SidebarActions from '../../../../../../features/tests/ui/sidebar/primitive/SidebarActions';
import QuickAction from '../../../../../../features/tests/ui/sidebar/primitive/QuickAction';
import { useLanguage } from '../../../../../../LanguageProvider';

type TestGenerationSidebarProps = {
	onSaveTemplate?: () => void;
	onShowTemplates?: () => void;
};

const TestGenerationSidebar = ({ onSaveTemplate, onShowTemplates }: TestGenerationSidebarProps) => {
	const { t } = useLanguage();

	const navigate = useNavigate();

	return (
		<>
			<SidebarActions
				title={t("test_generation_sidebar_actions_title")}
				bottomSection={<TestGenerationBottomSection />}
			>
				<QuickAction
					icon={<ArrowLeft className="h-5 w-5" />}
					title={t("test_generation_sidebar_back_title")}
					description={t("test_generation_sidebar_back_description")}
					onClick={() => navigate(paths.candidate.tests.ROOT)}
				/>

				{onShowTemplates && (
					<QuickAction
						icon={<List className="h-5 w-5" />}
						title={t("test_generation_sidebar_choose_template_title")}
						description={t("test_generation_sidebar_choose_template_description")}
						onClick={onShowTemplates}
					/>
				)}

				{onSaveTemplate && (
					<QuickAction
						icon={<Save className="h-5 w-5" />}
						title={t("test_generation_sidebar_save_template_title")}
						description={t("test_generation_sidebar_save_template_description")}
						onClick={onSaveTemplate}
					/>
				)}
			</SidebarActions>
		</>
	);
};

export default TestGenerationSidebar;

const TestGenerationBottomSection = () => {
	const { t } = useLanguage();

	return (
		<div className="mt-4 border-t border-primary-toned-200 pt-4">
			<div className="bg-primary-toned-100 rounded-lg p-4">
				<h4 className="font-semibold text-primary-toned-700 mb-2">{t("test_generation_sidebar_tips_title")}</h4>
				<p className="text-sm text-primary-toned-600 mb-3">
					{t("test_generation_sidebar_tips_description")}
				</p>
				<a href="#" className="text-primary text-sm font-semibold flex items-center">
					{t("test_generation_sidebar_tips_link")}
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
					</svg>
				</a>
			</div>
		</div>
	);
}
