import { ClipboardList, HelpCircle, Info, Trash2, Users } from 'lucide-react';
import QuickAction from '../../../../../../features/tests/ui/sidebar/QuickAction'
import SidebarActions from '../../../../../../features/tests/ui/sidebar/SidebarActions'
import { TabMode } from '../type';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../../router/paths';

export default function Sidebar({
	testId,
	onModeChange,
	onDelete,
}: {
	testId: string;
	onModeChange: (mode: TabMode) => void;
	onDelete: () => void;
}) {
	const navigate = useNavigate();

	return (
		<SidebarActions
			title='Exam Actions'
			bottomSection={false}
		>
			<QuickAction
				icon={<Info />}
				title="Info"
				description="Information and Stats."
				onClick={() => onModeChange('info')}
			/>
			<QuickAction
				icon={<HelpCircle />}
				title="Questions"
				description="Questions in this exam."
				onClick={() => onModeChange('questions')}
			/>
			<QuickAction
				icon={<ClipboardList />}
				title="Attempts"
				description="Attempts made by candidates."
				onClick={() => onModeChange('attempts')}
			/>
			<QuickAction
				icon={<Users />}
				title="Participants"
				description="Candidates who participated in this exam."
				onClick={() => onModeChange('participants')}
			/>

			<hr className="my-2 border-t border-primary-toned-300" />

			<QuickAction
				icon={<HelpCircle />}
				title="Edit"
				description="Edit the exam."
				onClick={() => navigate(paths.manager.tests.in(testId).EDIT)}
			/>
			<QuickAction
				icon={<Trash2 />}
				title="Delete"
				description="Delete the exam permanently."
				onClick={() => onDelete()}
				variant='alert'
			/>
		</SidebarActions>
	)
}
