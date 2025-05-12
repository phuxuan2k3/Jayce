import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import TestGenerationSidebar from "./components/TestGenerationSidebar";
import TemplateSelectionModal from "./components/TemplateSelectionModal";
import SaveTemplateDialog from "./components/SaveTemplateDialog";
import { TestCore } from '../../../../features/tests/model/test.model';
import { TemplateCore } from "../../../../features/tests/model/test.model";
import TestGenerationStepper from './components/TestGenerationStepper';
import TestInfoStep from './components/TestInfoStep';
import PromptInfoStep from './components/PromptInfoStep';
import OutlinesStep from './components/OutlinesStep';
import { sampleTemplates } from '../templates/components/sampleData';
import paths from '../../../../router/paths';

// Loading component
const LoadingScreen = () => (
	<div className="flex flex-col items-center justify-center min-h-[400px]">
		<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
		<p className="mt-4 text-lg text-gray-600">Generating your test...</p>
	</div>
);

const CandidateTestsPracticePage: React.FC = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateCore | null>(null);
	const [templates] = useState<TemplateCore[]>(sampleTemplates);
	const navigate = useNavigate();
	const [isGenerating, setIsGenerating] = useState(false);
	const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
	const [showTemplatesModal, setShowTemplatesModal] = useState(false);
	const [templateName, setTemplateName] = useState('');

	// Create a copy of promptData for editing in the SaveTemplateDialog
	const [editablePromptData, setEditablePromptData] = useState<Omit<TemplateCore, 'id' | 'name'>>({
		title: '', // We'll still keep these properties in the data structure even though they're redundant
		description: '', // to maintain compatibility with the rest of the system
		numberOfQuestions: 10,
		difficulty: 3,
		tags: [],
		numberOfOptions: 4,
		outlines: []
	});

	// User info - assuming we would get this from auth context in a real app
	const userInfo = {
		id: 'user-123',
		name: 'Current User',
		avatar: '/avatar/default.png'
	};

	// Initialize test data
	const [testData, setTestData] = useState<TestCore>({
		id: Date.now(), // Temporary ID
		author: userInfo,
		title: '',
		description: '',
		minutesToAnswer: 30,
		language: 'English',
		mode: 'practice',
		createdAt: new Date().toISOString()
	});

	// Initialize prompt data - no longer has its own title/description
	const [promptData, setPromptData] = useState<Omit<TemplateCore, 'id' | 'name'>>({
		title: '', // We'll keep these fields but sync them with test data
		description: '',
		numberOfQuestions: 10,
		difficulty: 3,
		tags: [],
		numberOfOptions: 4,
		outlines: []
	});

	// Keep prompt title and description in sync with test title and description
	useEffect(() => {
		setPromptData(prev => ({
			...prev,
			title: testData.title,
			description: testData.description
		}));
	}, [testData.title, testData.description]);

	const handleNext = () => {
		setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const handleSelectTemplate = (template: TemplateCore) => {
		setSelectedTemplate(template);

		// Pre-fill test data from template
		setTestData({
			...testData,
			title: template.title,
			description: template.description
		});

		// Pre-fill prompt data from template (without title/description which come from test data)
		setPromptData({
			...promptData,
			title: template.title, // Keep these synced
			description: template.description, // Keep these synced
			numberOfQuestions: template.numberOfQuestions,
			difficulty: template.difficulty,
			tags: [...template.tags],
			numberOfOptions: template.numberOfOptions,
			outlines: [...template.outlines]
		});
	};

	const handleGenerateTest = () => {
		setIsGenerating(true);
		// In a real app, this would call an API to generate the test
		console.log('Generating test with:', {
			testData,
			promptData: {
				...promptData,
				title: testData.title, // Ensure we're using the test title
				description: testData.description // Ensure we're using the test description
			}
		});

		// Simulate a network request
		setTimeout(() => {
			// Navigate to the generated test page with the test ID
			// In an actual implementation, you'd get the ID from the backend response
			const generatedTestId = Date.now(); // Mock ID for demonstration
			navigate(paths.candidate.tests.in(generatedTestId).ROOT, {
				state: { testId: generatedTestId }
			});
			setIsGenerating(false);
		}, 2000);
	};

	const handleSaveTemplate = (name: string, updatedPromptData: Omit<TemplateCore, 'id' | 'name'>) => {
		if (!name.trim()) {
			alert('Please provide a template name');
			return;
		}

		// Ensure the template uses the current test title and description
		const finalTemplateData = {
			...updatedPromptData,
			title: testData.title,
			description: testData.description
		};

		// In a real app, this would call an API to save the template
		console.log('Saving template:', {
			name,
			...finalTemplateData
		});

		// Update the main promptData with any changes made in the dialog
		setPromptData({
			...updatedPromptData,
			title: testData.title,
			description: testData.description
		});

		// Mock success
		alert('Template saved successfully!');
		setShowSaveTemplateDialog(false);
		setTemplateName('');
	};

	const handleSaveTemplateClick = () => {
		// Suggest a template name based on the title if it exists
		if (testData.title && !templateName) {
			setTemplateName(testData.title);
		}

		// Copy current promptData to the editable version but ensure title/description are from test data
		setEditablePromptData({
			...promptData,
			title: testData.title,
			description: testData.description
		});

		setShowSaveTemplateDialog(true);
	};

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return (
					<TestInfoStep
						testData={testData}
						onTestDataChange={setTestData}
						selectedTemplate={selectedTemplate}
						onSelectTemplateClick={() => setShowTemplatesModal(true)}
					/>
				);
			case 1:
				return (
					<PromptInfoStep
						promptData={promptData}
						onPromptDataChange={setPromptData}
						testTitle={testData.title}
						testDescription={testData.description}
					/>
				);
			case 2:
				return (
					<OutlinesStep
						outlines={promptData.outlines}
						onOutlinesChange={(newOutlines) =>
							setPromptData({ ...promptData, outlines: newOutlines })
						}
					/>
				);
			default:
				return 'Unknown step';
		}
	};

	return (
		<>
			<NewLeftLayoutTemplate
				header={
					<NewLeftLayoutTemplate.Header
						title="Generate Practice Test"
						description="Create a customized test using templates and AI"
					/>
				}
				left={
					<TestGenerationSidebar
						onSaveTemplate={handleSaveTemplateClick}
						onShowTemplates={() => setShowTemplatesModal(true)}
					/>
				}
			>
				<div className="bg-white rounded-lg shadow p-6">
					<TestGenerationStepper
						activeStep={activeStep}
						onNext={handleNext}
						onBack={handleBack}
						onFinish={handleGenerateTest}
						isNextDisabled={
							(activeStep === 0 && (!testData.title || !testData.description)) ||
							(activeStep === 1 && promptData.tags.length === 0) ||
							(activeStep === 2 && promptData.outlines.length === 0)
						}
						isBackDisabled={activeStep === 0}
					/>

					<div className="mt-8">
						{isGenerating ? <LoadingScreen /> : getStepContent(activeStep)}
					</div>
				</div>
			</NewLeftLayoutTemplate>

			{/* Template Selection Modal */}
			<TemplateSelectionModal
				isOpen={showTemplatesModal}
				onClose={() => setShowTemplatesModal(false)}
				templates={templates}
				onSelectTemplate={handleSelectTemplate}
			/>

			{/* Save Template Dialog */}
			<SaveTemplateDialog
				isOpen={showSaveTemplateDialog}
				onClose={() => setShowSaveTemplateDialog(false)}
				templateName={templateName}
				onTemplateNameChange={setTemplateName}
				onSave={handleSaveTemplate}
				promptData={editablePromptData}
				onPromptDataChange={setEditablePromptData}
			/>
		</>
	);
};

export default CandidateTestsPracticePage;