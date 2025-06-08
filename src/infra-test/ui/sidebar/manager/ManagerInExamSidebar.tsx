import { ClipboardList, HelpCircle, Info, Trash2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SidebarActions from '../primitive/SidebarActions';
import QuickAction from '../primitive/QuickAction';
import paths from '../../../../router/paths';

const BaseTabModeAsConst = ['Info', 'Questions', 'Attempts', 'Participants'] as const;
export type BaseTabModeType = (typeof BaseTabModeAsConst)[number];

export default function ManagerInExamSidebar({
	testId,
	onDelete,
	mode = null,
	onModeChange,
}: {
	testId: string;
	onDelete: () => void;
	mode?: BaseTabModeType | null;
	onModeChange: (mode: BaseTabModeType) => void;
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
				onClick={() => onModeChange("Info")}
			/>
			<QuickAction
				icon={<HelpCircle />}
				title="Questions"
				description="Questions in this exam."
				onClick={() => onModeChange("Questions")}
			/>
			<QuickAction
				icon={<ClipboardList />}
				title="Attempts"
				description="Attempts made by candidates."
				onClick={() => onModeChange("Attempts")}
			/>
			<QuickAction
				icon={<Users />}
				title="Participants"
				description="Candidates who participated in this exam."
				onClick={() => onModeChange("Participants")}
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
