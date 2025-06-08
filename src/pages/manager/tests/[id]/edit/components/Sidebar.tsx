import ManagerSidebar from '../../../../../../infra-test/ui/sidebar/manager/ManagerSidebar'
import { ExamCore } from '../../../../../../infra-test/core/test.model'
import { EditTabs } from '../type';
import QuickAction from '../../../../../../infra-test/ui/sidebar/primitive/QuickAction';
import { ArrowDownToLine } from 'lucide-react';

export default function Sidebar({
	exam,
	tab,
	onModeChange,
	onSave,
}: {
	exam: ExamCore;
	tab: EditTabs;
	onModeChange: (tab: EditTabs) => void;
	onSave: () => void;
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

			<ManagerSidebar.DeleteExam exam={exam} />
			<QuickAction
				icon={<ArrowDownToLine />}
				title='Save'
				description='Save changes to the exam'
				onClick={onSave}
			/>
		</ManagerSidebar>
	)
}
