import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";
import SidebarActions from "../../../../features/tests/ui2/sidebar/SidebarActions";
import UserGeneratedTestsSection from "./components/UserGeneratedTestsSection";
import { userGeneratedTests } from "../../../../features/tests/mocks/test";

export default function CandidateTestsPage() {
	const navigate = useNavigate();

	// Mock data for templates and tests - in real implementation these would come from API calls

	const handleManageTest = (testId: number) => {
		// This would navigate to test management page
		navigate(paths.candidate.tests.in(testId).ROOT);
	};

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title="Skillsharp Tests"
					description="Join hosted tests or generate your own practice tests from templates"
				/>
			}
			left={<SidebarActions>
				<SidebarActions.BrowseTemplates />
				<SidebarActions.GenerateTest />
				<SidebarActions.JoinTest />
			</SidebarActions>}
		>
			<div className="flex flex-col gap-8">
				{/* Manage your generated tests */}
				<UserGeneratedTestsSection
					tests={userGeneratedTests}
					onManageTest={handleManageTest}
				/>
			</div>
		</NewLeftLayoutTemplate>
	);
};