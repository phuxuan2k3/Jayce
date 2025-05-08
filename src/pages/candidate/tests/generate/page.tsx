import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TestCore } from '../../../../features/tests/model/test.model';
import { PromptTemplate } from "../../../../features/tests/model/test.model";
import TestGenerationStepper from './components/TestGenerationStepper';
import TestInfoStep from './components/TestInfoStep';
import PromptInfoStep from './components/PromptInfoStep';
import OutlinesStep from './components/OutlinesStep';
import { sampleTemplates } from '../templates/components/sampleData';
import { ArrowLeft } from 'lucide-react';

// Loading component
const LoadingScreen = () => (
	<div className="flex flex-col items-center justify-center min-h-[400px]">
		<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
		<p className="mt-4 text-lg text-gray-600">Generating your test...</p>
	</div>
);

const CandidateTestsPracticePage: React.FC = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
	const [templates] = useState<PromptTemplate[]>(sampleTemplates);
	const navigate = useNavigate();
	const [isGenerating, setIsGenerating] = useState(false);

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

	// Initialize prompt data
	const [promptData, setPromptData] = useState<Omit<PromptTemplate, 'id' | 'name'>>({
		title: '',
		description: '',
		numberOfQuestions: 10,
		difficulty: 3,
		tags: [],
		numberOfOptions: 4,
		outlines: []
	});

	// Template name when saving as a new template
	const [templateName, setTemplateName] = useState('');

	const handleNext = () => {
		setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const handleSelectTemplate = (template: PromptTemplate) => {
		setSelectedTemplate(template);

		// Pre-fill test data from template
		setTestData({
			...testData,
			title: template.title,
			description: template.description
		});

		// Pre-fill prompt data from template
		setPromptData({
			title: template.title,
			description: template.description,
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
		console.log('Generating test with:', { testData, promptData });

		// Simulate a network request
		setTimeout(() => {
			// Navigate to the generated test page with the test ID
			// In an actual implementation, you'd get the ID from the backend response
			const generatedTestId = Date.now(); // Mock ID for demonstration
			navigate(`/candidate/tests/generate/generated`, {
				state: { testId: generatedTestId }
			});
			setIsGenerating(false);
		}, 2000);
	};

	const handleSaveTemplate = (name: string) => {
		if (!name.trim()) {
			alert('Please provide a template name');
			return;
		}

		// In a real app, this would call an API to save the template
		console.log('Saving template:', {
			name,
			...promptData
		});

		// Mock success
		alert('Template saved successfully!');
	};

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return (
					<TestInfoStep
						testData={testData}
						onTestDataChange={setTestData}
						templates={templates}
						selectedTemplate={selectedTemplate}
						onSelectTemplate={handleSelectTemplate}
					/>
				);
			case 1:
				return (
					<PromptInfoStep
						promptData={promptData}
						onPromptDataChange={setPromptData}
					/>
				);
			case 2:
				return (
					<OutlinesStep
						outlines={promptData.outlines}
						onOutlinesChange={(newOutlines) =>
							setPromptData({ ...promptData, outlines: newOutlines })
						}
						templateName={templateName}
						onTemplateNameChange={setTemplateName}
						onSaveTemplate={() => handleSaveTemplate(templateName)}
					/>
				);
			default:
				return 'Unknown step';
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Generate Practice Test</h1>

			<div className="bg-white rounded-lg shadow p-6">
				<TestGenerationStepper
					activeStep={activeStep}
					onNext={handleNext}
					onBack={handleBack}
					onFinish={handleGenerateTest}
					isNextDisabled={
						(activeStep === 0 && (!testData.title || !testData.description)) ||
						(activeStep === 1 && (!promptData.title || !promptData.description || promptData.tags.length === 0)) ||
						(activeStep === 2 && promptData.outlines.length === 0)
					}
					isBackDisabled={activeStep === 0}
				/>

				<div className="mt-8">
					{isGenerating ? <LoadingScreen /> : getStepContent(activeStep)}
				</div>
			</div>
		</div>
	);
};

export default CandidateTestsPracticePage;