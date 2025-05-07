import LeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import { useState } from "react";
import { TestPractice } from "../../../../features/tests/model/test/test-practice";
import { PromptTemplate } from "../../../../features/tests/model/test/test-practice";
import { useNavigate } from "react-router-dom";
import paths from "../../../../router/paths";

// Import the component files we created
import SidebarActions from "./components/SidebarActions";
import JoinTestSection from "./components/JoinTestSection";
import GenerateTestsSection from "./components/GenerateTestsSection";
import UserGeneratedTestsSection from "./components/UserGeneratedTestsSection";
import TemplateManagementSection from "./components/TemplateManagementSection";

export default function CandidateTestsPage() {
	const navigate = useNavigate();

	// Mock data for templates and tests - in real implementation these would come from API calls
	const promptTemplates: PromptTemplate[] = [
		{
			id: 1,
			name: "React Basics",
			title: "React Fundamentals Test",
			description: "Basic concepts of React including components, hooks, and state management",
			difficulty: 2,
			tags: ["React", "Frontend", "JavaScript"],
			numberOfQuestions: 10,
			numberOfOptions: 4,
			outlines: ["Components", "Hooks", "Props", "State", "Context"]
		},
		{
			id: 2,
			name: "TypeScript Advanced",
			title: "TypeScript Advanced Concepts",
			description: "Advanced TypeScript features including generics, utility types, and type inference",
			difficulty: 3,
			tags: ["TypeScript", "Frontend", "Programming"],
			numberOfQuestions: 15,
			numberOfOptions: 4,
			outlines: ["Generics", "Utility Types", "Type Inference", "Type Guards", "Decorators"]
		}
	];

	const userGeneratedTests: TestPractice[] = [
		{
			id: 101,
			author: {
				id: "user-1",
				name: "Current User",
			},
			title: "My JavaScript Test",
			description: "Custom JavaScript test generated from prompt",
			minutesToAnswer: 30,
			language: "en",
			mode: "practice",
			createdAt: "2025-04-25T12:00:00Z",
			difficulty: 2,
			tags: ["JavaScript", "Frontend"],
			numberOfQuestions: 10,
			numberOfOptions: 4,
			outlines: ["ES6 Features", "Async/Await", "Closures"],
			feedback: {
				rating: 4,
			}
		}
	];

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
		navigate(paths.candidate.tests.in(testId).ATTEMPTS);
	};

	const handleManageTemplates = () => {
		// This would navigate to templates management page
		navigate(paths.candidate.tests.TEMPLATES);
	};

	return (
		<LeftLayoutTemplate
			header={
				<LeftLayoutTemplate.Header
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
		</LeftLayoutTemplate>
	);
};