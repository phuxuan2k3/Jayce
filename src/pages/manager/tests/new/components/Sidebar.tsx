import { BrainCircuit, Upload, WandSparkles } from "lucide-react";
import { CreateTab } from "../common/types";
import ManagerSidebar from "../../../../../features/tests/ui-shared/sidebar/ManagerSidebar";
import QuickAction from "../../../../../features/tests/ui/sidebar/primitive/QuickAction";
import SidebarLayout from "../../../../../features/tests/ui/sidebar/SidebarLayout";

export default function Sidebar({
	tab,
	onTabChange,
}: {
	tab: CreateTab;
	onTabChange: (tab: CreateTab) => void;
}) {
	return (
		<SidebarLayout>
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
				icon={<Upload size={18} strokeWidth={2.5} />}
				title="Publish"
				variant={"alert"}
				description="Review and publish your exam"
				onClick={() => onTabChange('publish')}
			/>

			<hr className="my-2 border-primary-toned-300" />

			<div className="mt-auto w-full relative group">
				{/* Introduction Section */}
				<div className="p-4 bg-gradient-to-r from-primary-toned-50 to-secondary-toned-50 border border-primary-toned-200 rounded-lg">
					<h4 className="font-bold text-primary-toned-700 mb-2 flex items-center">
						<BrainCircuit className="w-4 h-4 mr-2" />
						AI-Powered Test Generation
					</h4>
					<p className="text-sm text-primary-toned-600 leading-relaxed mb-4">
						Use our AI assistant to generate questions and tests quickly. Save time by letting AI suggest relevant questions, or create entire tests in just a few clicks.
					</p>

					{/* Compact Button */}
					<QuickAction
						className="w-full"
						icon={<WandSparkles />}
						title='Assistant'
						variant={"gradient"}
						description='Generate questions with AI'
						onClick={() => onTabChange('generate')}
					/>
				</div>
			</div>
		</SidebarLayout>
	)
}
