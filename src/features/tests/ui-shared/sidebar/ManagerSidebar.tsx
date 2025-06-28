import { ClipboardList, HelpCircle, Info, Users } from 'lucide-react';
import QuickAction from '../../ui/sidebar/primitive/QuickAction';
import SidebarActions from '../../ui/sidebar/primitive/SidebarActions'
import { useNavigate } from 'react-router-dom';
import paths from '../../../../router/paths';

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
	return (
		<QuickAction
			icon={<Info />}
			title="Info"
			description="Information and Stats."
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
	return (
		<QuickAction
			icon={<HelpCircle />}
			active={active}
			title="Questions"
			description="Questions in this exam."
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
	return (
		<QuickAction
			onClick={onClick}
			active={active}
			icon={<ClipboardList />}
			title="Attempts"
			description="View all attempts for this exam."
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
	return (
		<QuickAction
			onClick={onClick}
			active={active}
			icon={<Users />}
			title="Participants"
			description="Candidates who participated in this exam."
		/>
	);
}

ManagerSidebar.BackToExams = () => {
	const navigate = useNavigate();
	return (
		<QuickAction
			icon={<Users />}
			title="Back to Exams"
			description="Return to the exams list."
			onClick={() => navigate(paths.manager.tests.ROOT)}
		/>
	);
}