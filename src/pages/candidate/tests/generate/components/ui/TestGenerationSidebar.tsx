import { useNavigate } from 'react-router-dom';
import QuickAction from '../../../../../../infra-test/ui/sidebar/primitive/QuickAction';
import paths from '../../../../../../router/paths';
import { ArrowLeft, Save, List } from 'lucide-react';
import SidebarActions from '../../../../../../infra-test/ui/sidebar/primitive/SidebarActions';

type TestGenerationSidebarProps = {
	onSaveTemplate?: () => void;
	onShowTemplates?: () => void;
};

const TestGenerationSidebar = ({ onSaveTemplate, onShowTemplates }: TestGenerationSidebarProps) => {
	const navigate = useNavigate();

	return (
		<>
			<SidebarActions
				title='Generation Actions'
				bottomSection={<TestGenerationBottomSection />}
			>
				<QuickAction
					icon={<ArrowLeft className="h-5 w-5" />}
					title="Back to Tests"
					description="Return to tests dashboard"
					onClick={() => navigate(paths.candidate.tests.ROOT)}
				/>

				{onShowTemplates && (
					<QuickAction
						icon={<List className="h-5 w-5" />}
						title="Choose Template"
						description="Select from available templates"
						onClick={onShowTemplates}
					/>
				)}

				{onSaveTemplate && (
					<QuickAction
						icon={<Save className="h-5 w-5" />}
						title="Save as Template"
						description="Save your current configuration"
						onClick={onSaveTemplate}
					/>
				)}
			</SidebarActions>
		</>
	);
};

export default TestGenerationSidebar;

const TestGenerationBottomSection = () => {
	return (
		<div className="mt-4 border-t border-primary-toned-200 pt-4">
			<div className="bg-primary-toned-100 rounded-lg p-4">
				<h4 className="font-semibold text-primary-toned-700 mb-2">Test Generation Tips</h4>
				<p className="text-sm text-primary-toned-600 mb-3">
					Add specific topics and keywords to get better results. Include difficulty levels for more targeted questions.
				</p>
				<a href="#" className="text-primary text-sm font-semibold flex items-center">
					View Generation Guide
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
					</svg>
				</a>
			</div>
		</div>
	);
}
