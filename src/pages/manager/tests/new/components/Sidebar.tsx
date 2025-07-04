import { Upload, WandSparkles } from "lucide-react";
import { CreateTab } from "../common/types";
import ManagerSidebar from "../../../../../features/tests/ui-shared/sidebar/ManagerSidebar";
import QuickAction from "../../../../../features/tests/ui/sidebar/primitive/QuickAction";
import SidebarActions from "../../../../../features/tests/ui/sidebar/primitive/SidebarActions";

export default function Sidebar({
	tab,
	onTabChange,
}: {
	tab: CreateTab;
	onTabChange: (tab: CreateTab) => void;
}) {
	return (
		<SidebarActions className="h-full flex flex-col">
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
				variant={"gradient"}
				description='Generate questions with AI'
				onClick={() => onTabChange('generate')}
			/>

			<hr className="my-2 border-primary-toned-300" />

			<QuickAction
				icon={<Upload size={18} strokeWidth={2.5} />}
				title="Publish"
				variant={"alert"}
				description="Review and publish your exam"
				onClick={() => onTabChange('publish')}
			/>

		</SidebarActions>
	)
}
