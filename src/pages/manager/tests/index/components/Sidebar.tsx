import SidebarActions from '../../../../../infra-test/ui/sidebar/primitive/SidebarActions'
import QuickAction from '../../../../../infra-test/ui/sidebar/primitive/QuickAction'
import { ClipboardPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import paths from '../../../../../router/paths';

export default function Sidebar() {
	const navigate = useNavigate();

	return (
		<SidebarActions title='Quick Actions'>
			<QuickAction
				title='Create exam'
				icon={<ClipboardPlus size={20} />}
				description='Create a new exam'
				onClick={() => navigate(paths.manager.tests.NEW)}
			/>
			<QuickAction
				title='Manage exams'
				icon={<ClipboardPlus size={20} />}
				description='Edit or delete existing exams'
				onClick={() => { }}
			/>
		</SidebarActions>
	)
}
