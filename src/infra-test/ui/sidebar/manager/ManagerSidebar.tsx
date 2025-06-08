import { Trash2 } from 'lucide-react';
import { useAppDispatch } from '../../../../app/hooks';
import { ExamCore } from '../../../core/test.model';
import deleteExamSlice from '../../../stores/deleteExamSlice';
import QuickAction from '../primitive/QuickAction';
import SidebarActions from '../primitive/SidebarActions'

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
			onClick={() => dispatch(deleteExamSlice.actions.setDeleteExam(exam))}
		/>
	);
}