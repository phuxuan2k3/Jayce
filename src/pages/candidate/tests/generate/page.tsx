import { useState } from 'react';
import TestGenerationSidebar from "./components/ui/TestGenerationSidebar";
import TemplateSelectionModal from "./components/ui/TemplateSelectionModal";
import SaveTemplateDialog from "./components/ui/SaveTemplateDialog";
import PracticeGenStep1 from './components/steps/PracticeGenStep1';
import PracticeGenStep2 from './components/steps/PracticeGenStep2';
import { LoadingScreen } from './components/ui/LoadingScreen';
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
import { Sparkles } from 'lucide-react';
import ErrorDialog from '../../../../features/tests/ui/fetch-states/ErrorDialog';
import { useLanguage } from '../../../../LanguageProvider';

// Lesson: When I split it into 3 setMainValue (handleStep1, 2, 3...) and call it at the same time in the handleSelectTemplate function, it causes the state to update only the last function call (handleStep3), and override the previous ones.

export default function CandidateTestsGeneratePage() {
	const { t } = useLanguage();

	const [selectedTemplate, setSelectedTemplate] = useState<TemplateCoreSchema | null>(null);
	const [showTemplatesModal, setShowTemplatesModal] = useState(false);
	const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);

	const {
		step,
		currentErrorMessages,
		handleNextStep,
		handlePrevStep,
		handleSetStep,
		setMainValue,
		mainValue,
	} = usePracticeGenStepsData();

	const {
		handleGeneratePractice,
		loadingState,
		error,
	} = useGeneratePractice();

	const handleSelectTemplate = (template: TemplateCoreSchema) => {
		const newMainValue = {
			step1: {
				title: template.title,
				description: template.description,
				language: template.language as LanguageType || "English",
				minutesToAnswer: template.minutesToAnswer,
			},
			step2: {
				difficulty: template.difficulty as DifficultyType || "Intern",
				numberOfOptions: template.numberOfOptions,
				numberOfQuestions: template.numberOfQuestions,
				tags: template.tags || [],
			},
			step3: {
				outlines: template.outlines || [],
			},
		};

		setMainValue(newMainValue);
		setSelectedTemplate(template);
	}

	const getStepContent = () => {
		switch (step) {
			case 1:
				return (
					<PracticeGenStep1
						data={mainValue.step1}
						onDataChange={(info) => setMainValue((prev) => ({
							...prev,
							step1: {
								...prev.step1,
								...info,
							},
						}))}
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
						onDataChange={(info) => setMainValue((prev) => ({
							...prev,
							step2: {
								...prev.step2,
								...info,
							},
						}))}
						testTitle={mainValue.step1.title}
						testDescription={mainValue.step1.description}
						testLanguage={mainValue.step1.language}
						testMinutesToAnswer={mainValue.step1.minutesToAnswer}
					/>
				);
			case 3:
				return (
					<PracticeGenStep3
						data={mainValue.step3}
						onDataChange={(info) => setMainValue((prev) => ({
							...prev,
							step3: {
								...prev.step3,
								...info,
							},
						}))}
						suggestionData={{
							title: mainValue.step1.title,
							description: mainValue.step1.description,
							tags: mainValue.step2.tags,
							difficulty: mainValue.step2.difficulty,
						}}
						mainValue={mainValue}
						onSaveTemplateClick={() => setShowSaveTemplateDialog(true)}
					/>
				);
			default:
				return t("gen_step_invalid");
		}
	};

	return (
		<RightLayoutTemplate
			header={
				<RightLayoutTemplate.Header
					title={t("gen_page_header_title")}
					description={t("gen_page_header_description")}
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
								toast.error(`${t("gen_step_invalid")}: ${newStepInfo}`, {
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
					errorMessages={currentErrorMessages.map(k => t(k))}
				/>

				<div className='flex flex-col gap-1'>
					<h3 className='font-bold text-2xl text-primary'>
						{t(PracticeGenStepInfo[step].title)}
					</h3>
					<p className='text-gray-500'>{t(PracticeGenStepInfo[step].description)}</p>
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
						{t("gen_step_prev")}
					</MyButton>
					{step < 3 && (
						<MyButton
							disabled={step === 3}
							className={"w-1/4 min-w-fit"}
							onClick={handleNextStep}
						>
							{t("gen_step_next")}
						</MyButton>
					)}
					{step === 3 && (
						<MyButton
							className="w-1/4 min-w-fit bg-gradient-to-br from-primary to-secondary text-white hover:from-primary-toned-800 hover:to-secondary-toned-800"
							onClick={() => handleGeneratePractice(mainValue)}
							disabled={loadingState === "generating" || loadingState === "saving"}
						>
							<Sparkles size={18} />
							{t("gen_step_generate")}
						</MyButton>
					)}
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

			{error && (<ErrorDialog error={error} />)}
		</RightLayoutTemplate>
	);
};
