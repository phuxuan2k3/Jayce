import { useEffect, useState } from 'react';
import TestGenerationSidebar from "./components/ui/TestGenerationSidebar";
import TemplateSelectionModal from "./components/ui/TemplateSelectionModal";
import SaveTemplateDialog from "./components/ui/SaveTemplateDialog";
import PracticeGenStep1 from './components/steps/PracticeGenStep1';
import PracticeGenStep2 from './components/steps/PracticeGenStep2';
import { LoadingScreen } from './components/ui/LoadingScreen';
import ApiErrorDialog from './components/ui/ApiErrorDialog';
import { PracticeGenStepInfo, PracticeStepsValuesType } from './types';
import { TemplateCoreSchema } from '../../../../features/tests/api/test.api-gen-v2';
import PracticeGenStep3 from './components/steps/PracticeGenStep3';
import useGeneratePractice from './hooks/useGeneratePractice';
import usePracticeGenStepsData from './hooks/usePracticeGenStepsData';
import MyStepsBar from '../../../../features/tests/ui/MyStepsBar';
import { toast } from 'react-toastify';
import MyErrorMessages from '../../../../features/tests/ui/MyErrorMessage';
import { DifficultyType, LanguageType } from '../../../manager/tests/new/common/base-schema';
import MyButton from '../../../../features/tests/ui/buttons/MyButton';
import RightLayoutTemplate from '../../../../components/layouts/RightLayoutTemplate';

export default function CandidateTestsGeneratePage() {
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateCoreSchema | null>(null);
	const [showTemplatesModal, setShowTemplatesModal] = useState(false);
	const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
	const [showApiErrorDialog, setShowApiErrorDialog] = useState(false);

	const {
		step,
		currentErrorMessages,
		handleNextStep,
		handlePrevStep,
		handleSetStep,
		handleStep1Change,
		handleStep2Change,
		handleStep3Change,
		mainValue,
	} = usePracticeGenStepsData();

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

	const handleSelectTemplate = (template: TemplateCoreSchema) => {
		console.log("Selected Template:", template);
		handleStep1Change({
			title: template.name,
			description: template.description,
			language: template.language as LanguageType || "English",
			minutesToAnswer: template.minutesToAnswer,
		});
		handleStep2Change({
			difficulty: template.difficulty as DifficultyType || "Intern",
			numberOfOptions: template.numberOfOptions,
			numberOfQuestions: template.numberOfQuestions,
			tags: template.tags || [],
		});
		handleStep3Change({
			outlines: template.outlines || [],
		});
		setSelectedTemplate(template);
	}

	const getStepContent = () => {
		switch (step) {
			case 1:
				return (
					<PracticeGenStep1
						data={mainValue.step1}
						onDataChange={(info) => handleStep1Change(info)}
						selectedTemplate={selectedTemplate}
						onSelectTemplateClick={() => setShowTemplatesModal(true)}
						onSelectTemplateClear={() => {
							setSelectedTemplate(null);
						}}
					/>
				);
			case 2:
				return (
					<PracticeGenStep2
						data={mainValue.step2}
						onDataChange={(info) => handleStep2Change(info)}
						testTitle={mainValue.step1.title}
						testDescription={mainValue.step1.description}
					/>
				);
			case 3:
				return (
					<PracticeGenStep3
						data={mainValue.step3}
						onDataChange={(info) => handleStep3Change(info)}
						suggestionData={{
							title: mainValue.step1.title,
							description: mainValue.step1.description,
							tags: mainValue.step2.tags,
							difficulty: mainValue.step2.difficulty,
						}}
					/>
				);
			default:
				return 'Unknown step';
		}
	};

	return (
		<RightLayoutTemplate
			header={
				<RightLayoutTemplate.Header
					title="Generate Practice Test"
					description="Create a customized test using AI."
				/>
			}
			right={
				<TestGenerationSidebar
					onSaveTemplate={() => setShowSaveTemplateDialog(true)}
					onShowTemplates={() => setShowTemplatesModal(true)}
				/>
			}
		>
			<div className="p-6 flex flex-col gap-2">
				<MyStepsBar
					className='mb-4'
					step={step}
					steps={[1, 2, 3]}
					onStepChange={(newStep) => {
						if (newStep !== step) {
							const newStepInfo = newStep as PracticeStepsValuesType;
							if (newStepInfo == null) {
								toast.error(`Invalid step: ${newStepInfo}`, {
									autoClose: 5000,
									position: "top-right",
									hideProgressBar: false,
									closeOnClick: true,
								});
								return;
							}
							handleSetStep(newStepInfo);
						}
					}}
					connectorWidth={96}
				/>

				<hr className='my-4 border-primary-toned-300' />

				<MyErrorMessages
					className='mx-2 mb-4'
					errorMessages={currentErrorMessages}
				/>

				<div className='flex flex-col gap-1'>
					<h3 className='font-bold text-2xl text-primary'>
						{PracticeGenStepInfo[step].title}
					</h3>
					<p className='text-gray-500'>{PracticeGenStepInfo[step].description}</p>
				</div>

				<hr className='my-4 border-primary-toned-300' />

				<div className="flex-1">
					{loadingState !== "none" ? (
						<LoadingScreen state={loadingState} />
					) : (
						getStepContent()
					)}
				</div>

				<hr className='mt-4 mb-8 border-primary-toned-300' />

				<div className={`flex items-center justify-between`}>
					<MyButton
						disabled={step === 1}
						className="w-1/4 min-w-fit"
						onClick={handlePrevStep}
					>
						Back
					</MyButton>
					<MyButton
						disabled={step === 3}
						className={"w-1/4 min-w-fit"}
						onClick={handleNextStep}
					>
						Next
					</MyButton>
				</div>
			</div>


			{/* Template Selection Modal */}
			<TemplateSelectionModal
				isOpen={showTemplatesModal}
				onClose={() => setShowTemplatesModal(false)}
				onSelectTemplate={(template) => handleSelectTemplate(template)}
			/>

			{/* Save Template Dialog */}
			<SaveTemplateDialog
				isOpen={showSaveTemplateDialog}
				onClose={() => setShowSaveTemplateDialog(false)}
				initializeTemplateCreateData={{
					...mainValue.step1,
					...mainValue.step2,
					...mainValue.step3,
				}}
			/>

			<ApiErrorDialog
				error={generationError}
				onClose={() => setShowApiErrorDialog(false)}
				onRetry={() => handleGeneratePractice(mainValue)}
				isOpen={showApiErrorDialog}
			/>
		</RightLayoutTemplate>
	);
};
