import { ClipboardList, HelpCircle, Info, Trash2 } from 'lucide-react';
import QuickAction from '../../../../../../features/tests/ui2/sidebar/QuickAction'
import SidebarActions from '../../../../../../features/tests/ui2/sidebar/SidebarActions'
import { TabMode } from '../types/tab-mode';

export default function Sidebar({
	onModeChange,
}: {
	onModeChange: (mode: TabMode) => void;
}) {
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

			<hr className="my-2 border-t border-primary-toned-300" />

			<QuickAction
				icon={<Trash2 />}
				title="Delete"
				description="Delete the exam permanently."
				onClick={() => { }}
				variant='alert'
			/>
		</SidebarActions>
	)
}
