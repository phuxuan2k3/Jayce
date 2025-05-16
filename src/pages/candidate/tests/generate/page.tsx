import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewLeftLayoutTemplate from "../../../../components/layouts/NewLeftLayoutTemplate";
import TestGenerationSidebar from "./components/ui/TestGenerationSidebar";
import TemplateSelectionModal from "./components/ui/TemplateSelectionModal";
import SaveTemplateDialog from "./components/ui/SaveTemplateDialog";
import { TemplateCore } from "../../../../features/tests/model/test.model";
import TestGenerationStepper from './components/ui/TestGenerationStepper';
import TestInfoStep from './components/steps/TestInfoStep';
import PromptInfoStep from './components/steps/PromptInfoStep';
import OutlinesStep from './components/steps/OutlinesStep';
import paths from '../../../../router/paths';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { EMPTY_TEMPLATE_CORE_CREATE, EMPTY_TEST_PRACTICE_CORE_CREATE, TemplateCoreCreate, TestPracticeCoreCreate } from '../../../../features/tests/types/create';
import useTemplateServerQuery from '../../../../features/tests/hooks/templates/useTemplateServerQuery';
import useCreatePracticeTest from './hooks/useCreatePracticeTest';
import { usePostTemplatesMutation } from '../../../../features/tests/api/test.api-gen';
import { useLazyGetGeneratedQuestionsQuery } from '../../../../features/tests/api/prompt.api-custom';

const CandidateTestsGeneratePage: React.FC = () => {
	const {
		filters,
		setFilters,
		data,
	} = useTemplateServerQuery();
	const {
		createPractice: handleCreatePracticeTest
	} = useCreatePracticeTest();
	const [getGeneratedQuestions] = useLazyGetGeneratedQuestionsQuery();

	const [createTemplate, createTemplateState] = usePostTemplatesMutation();
	const [createLoadingState, setCreateLoadingState] = useState<"none" | "generating" | "saving">("none");
	const [error, setError] = useState<string | null>(null);

	const [activeStep, setActiveStep] = useState(0);
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateCore | null>(null);
	const navigate = useNavigate();
	const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
	const [showTemplatesModal, setShowTemplatesModal] = useState(false);
	const [templateName, setTemplateName] = useState('');

	const [templateCreate, setTemplateCreate] = useState<TemplateCoreCreate>(EMPTY_TEMPLATE_CORE_CREATE);
	const [testPracticeData, setTestPracticeData] = useState<TestPracticeCoreCreate>(EMPTY_TEST_PRACTICE_CORE_CREATE);

	const handleNext = () => {
		setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const handleSelectTemplate = (template: TemplateCore) => {
		setSelectedTemplate(template);
	};

	const handleGenerateTest = async () => {
		try {
			setError(null);
			setCreateLoadingState("generating");

			const generatedQuestions = await getGeneratedQuestions({
				...testPracticeData,
				...(selectedTemplate ? selectedTemplate : {}),
			}).unwrap();

			setCreateLoadingState("saving");

			const createdTest = await handleCreatePracticeTest({
				...testPracticeData,
				...(selectedTemplate ? selectedTemplate : {}),
			}, generatedQuestions.questions);

			setCreateLoadingState("none");

			navigate(paths.candidate.tests.in(createdTest.testId).PRACTICE);
		} catch (error: any) {
			setCreateLoadingState("none");
			if ("message" in error && typeof error.message === "string") {
				setError(error.message);
			} else {
				setError("An unknown error occurred");
			}
			console.error(error);
		}
	};

	const handleSaveAsTemplateClick = () => {
		setTemplateCreate(prev => ({
			...prev,
			...testPracticeData,
			name: "",
		}));
		setShowSaveTemplateDialog(true);
	};

	const handleSaveTemplateConfirm = async () => {
		try {
			if (!templateCreate.name.trim()) {
				alert('Please provide a template name');
				return;
			}
			await createTemplate({
				body: {
					...templateCreate,
				}
			}).unwrap();
			setShowSaveTemplateDialog(false);
		} catch (error: any) {
			if ("message" in error && typeof error.message === "string") {
				setError(error.message);
			} else {
				setError("An unknown error occurred");
			}
			console.error(error);
		}
	};

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return (
					<TestInfoStep
						testCoreData={testPracticeData}
						onTestCoreDataChange={(testCoreCreate) => setTestPracticeData({
							...testPracticeData,
							...testCoreCreate,
						})}
						selectedTemplate={selectedTemplate}
						onSelectTemplateClick={() => setShowTemplatesModal(true)}
					/>
				);
			case 1:
				return (
					<PromptInfoStep
						promptData={testPracticeData}
						onPromptDataChange={(setPromptData) => setTestPracticeData({
							...testPracticeData,
							...setPromptData,
						})}
						testTitle={testPracticeData.title}
						testDescription={testPracticeData.description}
					/>
				);
			case 2:
				return (
					<OutlinesStep
						outlines={testPracticeData.outlines}
						onOutlinesChange={(newOutlines) => setTestPracticeData({
							...testPracticeData,
							outlines: newOutlines,
						})}
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
						onSaveTemplate={handleSaveAsTemplateClick}
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
							(activeStep === 0 && (!testPracticeData.title || !testPracticeData.description)) ||
							(activeStep === 1 && testPracticeData.tags.length === 0) ||
							(activeStep === 2 && testPracticeData.outlines.length === 0)
						}
						isBackDisabled={activeStep === 0}
					/>

					{error && (
						<div className="mt-4 text-red-500">
							{error}
						</div>
					)}

					<div className="mt-8">
						{createLoadingState !== "none" ? (
							<LoadingScreen
								state={createLoadingState} />
						) : (
							getStepContent(activeStep)
						)}
					</div>
				</div>
			</NewLeftLayoutTemplate>

			{/* Template Selection Modal */}
			<TemplateSelectionModal
				isOpen={showTemplatesModal}
				onClose={() => setShowTemplatesModal(false)}
				filters={filters}
				setFilters={setFilters}
				totalPages={data.totalPages}
				templates={data.data}
				onSelectTemplate={handleSelectTemplate}
			/>

			{/* Save Template Dialog */}
			<SaveTemplateDialog
				isOpen={showSaveTemplateDialog}
				onClose={() => setShowSaveTemplateDialog(false)}
				templateName={templateName}
				onTemplateNameChange={setTemplateName}
				onSave={handleSaveTemplateConfirm}
				promptData={templateCreate}
				onPromptDataChange={(setPromptData) => setTemplateCreate({
					...templateCreate,
					...setPromptData,
				})}
				isSaving={createTemplateState.isLoading}
			/>
		</>
	);
};

export default CandidateTestsGeneratePage;