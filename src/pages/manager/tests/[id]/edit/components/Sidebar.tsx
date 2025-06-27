import ManagerSidebar from '../../../../../../infra-test/ui-shared/sidebar/ManagerSidebar'
import QuickAction from '../../../../../../infra-test/ui/sidebar/primitive/QuickAction';
import { ArrowDownToLine, Trash2 } from 'lucide-react';
import { EditTabs } from '../page';

export default function Sidebar({
	tab,
	onModeChange,
	onSave,
	onDelete,
}: {
	tab: EditTabs;
	onModeChange: (tab: EditTabs) => void;
	onSave: () => void;
	onDelete: () => void;
}) {
	return (
		<ManagerSidebar>
			<ManagerSidebar.Info
				active={tab === "info"}
				onClick={() => onModeChange('info')}
			/>
			<ManagerSidebar.Questions
				active={tab === "questions"}
				onClick={() => onModeChange('questions')}
			/>

			<hr className="my-2 border-primary-toned-300" />

			<QuickAction
				icon={<Trash2 />}
				title='Delete Exam'
				variant={"alert"}
				description='Remove this exam permanently'
				onClick={onDelete}
			/>

			<QuickAction
				icon={<ArrowDownToLine />}
				title='Save'
				description='Save changes to the exam'
				onClick={onSave}
			/>
		</ManagerSidebar>
	)
}
