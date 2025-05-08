import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";

// Import the component files we created
import SidebarActions from "../../../../features/tests/ui2/SidebarActions";
import JoinTestSection from "./components/JoinTestSection";
import GenerateTestsSection from "./components/GenerateTestsSection";
import UserGeneratedTestsSection from "./components/UserGeneratedTestsSection";
import TemplateManagementSection from "./components/TemplateManagementSection";
import { promptTemplates, userGeneratedTests } from "../../../../features/tests/mocks/test";

export default function CandidateTestsPage() {
	const navigate = useNavigate();

	// Mock data for templates and tests - in real implementation these would come from API calls


	const handleJoinTest = (code: string) => {
		// This would typically validate and navigate to the test
		alert(`Joining test with code: ${code}`);
		// navigate(paths.candidate.tests.in(testId).ATTEMPTS);
	};

	const handleGenerateTest = (templateId: number) => {
		// This would navigate to test generation page with the template
		navigate(paths.candidate.tests.GENERATE);
	};

	const handleManageTest = (testId: number) => {
		// This would navigate to test management page
		navigate(paths.candidate.tests.in(testId).ROOT);
	};

	const handleManageTemplates = () => {
		// This would navigate to templates management page
		navigate(paths.candidate.tests.TEMPLATES);
	};

	return (
		<NewLeftLayoutTemplate
			header={
				<NewLeftLayoutTemplate.Header
					title="Skillsharp Tests"
					description="Join hosted tests or generate your own practice tests from templates"
				/>
			}
			left={<SidebarActions />}
		>
			<div className="flex flex-col gap-8">
				{/* Section 1: Join tests by code */}
				<JoinTestSection onJoinTest={handleJoinTest} />

				{/* Section 2: Generate tests based on prompt templates */}
				<GenerateTestsSection
					templates={promptTemplates}
					onGenerateTest={handleGenerateTest}
					onViewAllTemplates={handleManageTemplates}
				/>

				{/* Section 3: Manage your generated tests */}
				<UserGeneratedTestsSection
					tests={userGeneratedTests}
					onManageTest={handleManageTest}
				/>

				{/* Section 4: Manage templates */}
				<TemplateManagementSection onManageTemplates={handleManageTemplates} />
			</div>
		</NewLeftLayoutTemplate>
	);
};