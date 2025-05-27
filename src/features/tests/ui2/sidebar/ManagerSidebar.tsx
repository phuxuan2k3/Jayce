import { Trash2 } from 'lucide-react';
import { useAppDispatch } from '../../../../app/hooks';
import { ExamCore } from '../../model/test.model';
import dialogSlice from '../../stores/dialogSlice';
import QuickAction from './QuickAction';
import SidebarActions from './SidebarActions'

export default function ManagerSidebar({
	children
}: {
	children?: React.ReactNode;
}) {
	return (
		<SidebarActions>
			{children}
		</SidebarActions>
	)
}

ManagerSidebar.DeleteExam = ({
	exam,
}: {
	exam: ExamCore;
}) => {
	const dispatch = useAppDispatch();
	return (
		<QuickAction
			icon={
				<Trash2 />
			}
			variant="alert"
			title="Delete Exam"
			description="Remove this exam permanently"
			onClick={() => dispatch(dialogSlice.actions.setDeleteExam(exam))}
		/>
	);
}