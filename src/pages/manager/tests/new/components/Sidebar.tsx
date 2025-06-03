import { Upload } from "lucide-react";
import ManagerSidebar from "../../../../../features/tests/ui2/sidebar/ManagerSidebar";
import QuickAction from "../../../../../features/tests/ui2/sidebar/QuickAction";
import { CreateTab } from "../models/tabs";

export default function Sidebar({
	onTabChange,
}: {
	onTabChange: (tab: CreateTab) => void;
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
			<QuickAction
				icon={
					<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 30 30">
						<path fill="#FFFFFF" d="M14.217 19.707l-1.112 2.547c-.427.979-1.782.979-2.21 0l-1.112-2.547c-.99-2.267-2.771-4.071-4.993-5.057L1.73 13.292c-.973-.432-.973-1.848 0-2.28l2.965-1.316C6.974 8.684 8.787 6.813 9.76 4.47l1.126-2.714c.418-1.007 1.81-1.007 2.228 0L14.24 4.47c.973 2.344 2.786 4.215 5.065 5.226l2.965 1.316c.973.432.973 1.848 0 2.28l-3.061 1.359C16.988 15.637 15.206 17.441 14.217 19.707zM24.481 27.796l-.339.777c-.248.569-1.036.569-1.284 0l-.339-.777c-.604-1.385-1.693-2.488-3.051-3.092l-1.044-.464c-.565-.251-.565-1.072 0-1.323l.986-.438c1.393-.619 2.501-1.763 3.095-3.195l.348-.84c.243-.585 1.052-.585 1.294 0l.348.84c.594 1.432 1.702 2.576 3.095 3.195l.986.438c.565.251.565 1.072 0 1.323l-1.044.464C26.174 25.308 25.085 26.411 24.481 27.796z"></path>
					</svg>
				}
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
		</ManagerSidebar>
	)
}
