import { ArrowLeft, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import paths from '../../../../../../router/paths';
import ManagerSidebar from '../../../../../../features/tests/ui-shared/sidebar/ManagerSidebar';
import QuickAction from '../../../../../../features/tests/ui/sidebar/primitive/QuickAction';
import { TabMode } from '../page';

export default function Sidebar({
	testId,
	mode,
	onModeChange,
}: {
	testId: string;
	mode: TabMode;
	onModeChange: (mode: TabMode) => void;
}) {
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
				title="Edit"
				description="Edit the exam."
				onClick={() => navigate(paths.manager.tests.in(testId).EDIT)}
			/>
			<QuickAction
				icon={<ArrowLeft />}
				title="Back to Exams"
				description="Return to the exams list."
				onClick={() => navigate(paths.manager.tests.ROOT)}
			/>
		</ManagerSidebar>
	)
}
