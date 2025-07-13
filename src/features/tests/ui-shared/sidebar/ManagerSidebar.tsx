import { ClipboardList, HelpCircle, Info, Users } from 'lucide-react';
import QuickAction from '../../ui/sidebar/primitive/QuickAction';
import SidebarActions from '../../ui/sidebar/primitive/SidebarActions'
import { useNavigate } from 'react-router-dom';
import paths from '../../../../router/paths';
import { useLanguage } from '../../../../LanguageProvider';

export default function ManagerSidebar({
	children
}: {
	children?: React.ReactNode;
}) {
	return (
		<SidebarActions
			bottomSection={<></>}
		>
			{children}
		</SidebarActions>
	)
}

ManagerSidebar.Info = ({
	active,
	onClick,
}: {
	active?: boolean;
	onClick: () => void;
}) => {
	const { t } = useLanguage();

	return (
		<QuickAction
			icon={<Info />}
			title={t("manager_sidebar_info_title")}
			description={t("manager_sidebar_info_desc")}
			active={active}
			onClick={onClick}
		/>
	);
}

ManagerSidebar.Questions = ({
	active,
	onClick,
}: {
	active: boolean;
	onClick: () => void;
}) => {
	const { t } = useLanguage();

	return (
		<QuickAction
			icon={<HelpCircle />}
			active={active}
			title={t("manager_sidebar_questions_title")}
			description={t("manager_sidebar_questions_desc")}
			onClick={onClick}
		/>
	);
}

ManagerSidebar.Attempts = ({
	active,
	onClick,
}: {
	active: boolean;
	onClick: () => void;
}) => {
	const { t } = useLanguage();

	return (
		<QuickAction
			onClick={onClick}
			active={active}
			icon={<ClipboardList />}
			title={t("manager_sidebar_attempts_title")}
			description={t("manager_sidebar_attempts_desc")}
		/>
	);
}

ManagerSidebar.Participants = ({
	active,
	onClick,
}: {
	active: boolean;
	onClick: () => void;
}) => {
	const { t } = useLanguage();

	return (
		<QuickAction
			onClick={onClick}
			active={active}
			icon={<Users />}
			title={t("manager_sidebar_participants_title")}
			description={t("manager_sidebar_participants_desc")}
		/>
	);
}

ManagerSidebar.BackToExams = () => {
	const { t } = useLanguage();
	const navigate = useNavigate();
	return (
		<QuickAction
			icon={<Users />}
			title={t("manager_sidebar_back_title")}
			description={t("manager_sidebar_back_desc")}
			onClick={() => navigate(paths.manager.tests.ROOT)}
		/>
	);
}