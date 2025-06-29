import { useEffect, useState } from 'react';
import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import TestGenerationSidebar from "./components/ui/TestGenerationSidebar";
import TemplateSelectionModal from "./components/ui/TemplateSelectionModal";
import SaveTemplateDialog from "./components/ui/SaveTemplateDialog";
import TestGenerationStepper from './components/ui/TestGenerationStepper';
import PracticeGenStep1 from './components/steps/PracticeGenStep1';
import PracticeGenStep2 from './components/steps/PracticeGenStep2';
import { LoadingScreen } from './components/ui/LoadingScreen';
import ApiErrorDialog from './components/ui/ApiErrorDialog';
import { PracticeSteps } from './types';
import { TemplateCoreSchema } from '../../../../features/tests/api/test.api-gen-v2';
import usePracticeGenerationStepManage from './hooks/usePracticeManage';
import PracticeGenStep3 from './components/steps/PracticeGenStep3';
import useGeneratePractice from './hooks/useGeneratePractice';

export default function CandidateTestsGeneratePage() {
	const [step, setStep] = useState<PracticeSteps>("step1");
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateCoreSchema | null>(null);
	const [showTemplatesModal, setShowTemplatesModal] = useState(false);
	const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
	const [showApiErrorDialog, setShowApiErrorDialog] = useState(false);

	const {
		handleDataChange,
		handleDataConfirm,
		draftValue,
		validationErrorMessages,
		value,
	} = usePracticeGenerationStepManage();

	const {
		handleGeneratePractice,
		generationError,
		loadingState,
	} = useGeneratePractice();

	useEffect(() => {
		if (generationError != null) {
			setShowApiErrorDialog(true);
		}
	}, [generationError]);

	const getStepContent = () => {
		switch (step) {
			case "step1":
				return (
					<PracticeGenStep1
						data={draftValue[step]}
						onDataChange={(info) => handleDataChange(step, info)}
						selectedTemplate={selectedTemplate}
						onSelectTemplateClick={() => setShowTemplatesModal(true)}
					/>
				);
			case "step2":
				return (
					<PracticeGenStep2
						data={draftValue[step]}
						onDataChange={(data) => handleDataChange(step, data)}
						testTitle={value.step1.title}
						testDescription={value.step1.description}
					/>
				);
			case "step3":
				return (
					<PracticeGenStep3
						data={draftValue[step]}
						onDataChange={(data) => handleDataChange(step, data)}
						suggestionData={{
							title: value.step1.title,
							description: value.step1.description,
							tags: value.step2.tags,
							difficulty: value.step2.difficulty,
						}}
					/>
				);
			default:
				return 'Unknown step';
		}
	};

	return (
		<>
			<LeftLayoutTemplate
				header={
					<LeftLayoutTemplate.Header
						title="Generate Practice Test"
						description="Create a customized test using AI."
					/>
				}
				left={
					<TestGenerationSidebar
						onSaveTemplate={() => setShowSaveTemplateDialog(true)}
						onShowTemplates={() => setShowTemplatesModal(true)}
					/>
				}
			>
				<div className="p-6">
					<TestGenerationStepper
						step={step}
						hasErrors={validationErrorMessages.length > 0}
						onStepChange={(step) => {
							handleDataConfirm(step);
							if (validationErrorMessages.length === 0) {
								setStep(step);
							}
						}}
						onFinish={() => {
							handleDataConfirm(step);
							if (validationErrorMessages.length === 0) {
								handleGeneratePractice(value);
							}
						}}
					/>

					{validationErrorMessages.length > 0 && (
						<div className="bg-red-100 text-red-800 p-4 rounded-md
								mb-4">
							<ul className="list-disc pl-5">
								{validationErrorMessages.map((error, index) => (
									<li key={index}>{error}</li>
								))}
							</ul>
						</div>
					)}

					<div className="mt-8">
						{loadingState !== "none" ? (
							<LoadingScreen state={loadingState} />
						) : (
							getStepContent()
						)}
					</div>
				</div>
			</LeftLayoutTemplate>

			{/* Template Selection Modal */}
			<TemplateSelectionModal
				isOpen={showTemplatesModal}
				onClose={() => setShowTemplatesModal(false)}
				onSelectTemplate={(template) => setSelectedTemplate(template)}
			/>

			{/* Save Template Dialog */}
			<SaveTemplateDialog
				isOpen={showSaveTemplateDialog}
				onClose={() => setShowSaveTemplateDialog(false)}
				initializeTemplateCreateData={{
					...draftValue.step1,
					...draftValue.step2,
					...draftValue.step3,
				}}
			/>

			<ApiErrorDialog
				error={generationError}
				onClose={() => setShowApiErrorDialog(false)}
				onRetry={() => handleGeneratePractice(value)}
				isOpen={showApiErrorDialog}
			/>
		</>
	);
};
