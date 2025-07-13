import { ArrowLeft, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../../router/paths';
import ManagerSidebar from '../../../../../../features/tests/ui-shared/sidebar/ManagerSidebar';
import QuickAction from '../../../../../../features/tests/ui/sidebar/primitive/QuickAction';
import { TabMode } from '../page';
import { useLanguage } from '../../../../../../LanguageProvider';

export default function Sidebar({
	testId,
	mode,
	onModeChange,
}: {
	testId: string;
	mode: TabMode;
	onModeChange: (mode: TabMode) => void;
}) {
	const { t } = useLanguage();

	const navigate = useNavigate();

	return (
		<ManagerSidebar>
			<ManagerSidebar.Info
				active={mode === 'info'}
				onClick={() => onModeChange('info')}
			/>
			<ManagerSidebar.Questions
				active={mode === 'questions'}
				onClick={() => onModeChange('questions')}
			/>

			<ManagerSidebar.Attempts
				active={mode === 'attempts'}
				onClick={() => onModeChange('attempts')}
			/>

			<ManagerSidebar.Participants
				active={mode === 'participants'}
				onClick={() => onModeChange('participants')}
			/>

			<hr className="my-2 border-t border-primary-toned-300" />

			<QuickAction
				icon={<HelpCircle />}
				title={t("sidebar_edit")}
				description={t("sidebar_edit_description")}
				onClick={() => navigate(paths.manager.tests.in(testId).EDIT)}
			/>
			<QuickAction
				icon={<ArrowLeft />}
				title={t("sidebar_back_to_exams")}
				description={t("sidebar_back_to_exams_description")}
				onClick={() => navigate(paths.manager.tests.ROOT)}
			/>
		</ManagerSidebar>
	)
}
