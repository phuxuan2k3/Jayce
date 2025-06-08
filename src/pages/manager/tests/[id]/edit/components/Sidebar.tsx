import ManagerSidebar from '../../../../../../infra-test/ui/sidebar/manager/ManagerSidebar'
import { ExamCore } from '../../../../../../infra-test/core/test.model'
import QuickAction from '../../../../../../infra-test/ui/sidebar/primitive/QuickAction';
import { EditTabs } from '../type';

export default function Sidebar({
	exam,
	onTabChange,
}: {
	exam: ExamCore;
	onTabChange: (tab: EditTabs) => void;
}) {
	return (
		<ManagerSidebar>
			<QuickAction
				icon={
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
					</svg>
				}
				title="Configuration"
				description="Exam configuration and settings"
				onClick={() => onTabChange('configuration')}
			/>
			<QuickAction
				icon={
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
					</svg>
				}
				title='Questions'
				description='Exam questions and answers'
				onClick={() => onTabChange('questions')}
			/>
			<hr className="my-2 border-primary-toned-300" />
			<ManagerSidebar.DeleteExam exam={exam} />
		</ManagerSidebar>
	)
}
