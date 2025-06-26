import { Bot, Upload, WandSparkles } from "lucide-react";
import ManagerSidebar from "../../../../../infra-test/ui/sidebar/manager/ManagerSidebar";
import QuickAction from "../../../../../infra-test/ui/sidebar/primitive/QuickAction";
import { CreateTab } from "../common/types";

export default function Sidebar({
	tab,
	onTabChange,
}: {
	tab: CreateTab;
	onTabChange: (tab: CreateTab) => void;
}) {
	return (
		<ManagerSidebar>
			<ManagerSidebar.Info
				active={tab === 'info'}
				onClick={() => onTabChange('info')}
			/>
			<ManagerSidebar.Questions
				active={tab === 'questions'}
				onClick={() => onTabChange('questions')}
			/>

			<hr className="my-2 border-primary-toned-300" />

			<QuickAction
				icon={<WandSparkles />}
				title='Assistant'
				description='Generate questions with AI'
				onClick={() => onTabChange('generate')}
			/>
			<QuickAction
				icon={<Upload size={18} strokeWidth={2.5} />}
				title="Publish"
				description="Review and publish your exam"
				onClick={() => onTabChange('publish')}
			/>

			<hr className="my-2 border-primary-toned-300" />

			<ManagerSidebar.BackToExams />
		</ManagerSidebar>
	)
}
