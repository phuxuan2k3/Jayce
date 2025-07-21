import { useEffect, useState } from 'react';
import TemplateSelectionModal from "./components/ui/TemplateSelectionDialog";
import SaveTemplateDialog from "./components/ui/SaveTemplateDialog";
import PracticeGenStep1 from './components/steps/PracticeGenStep1';
import PracticeGenStep2 from './components/steps/PracticeGenStep2';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { PracticeStepAllData } from './types';
import { TemplateCoreSchema } from '../../../../features/tests/api/test.api-gen-v2';
import PracticeGenStep3 from './components/steps/PracticeGenStep3';
import useGeneratePractice from './hooks/useGeneratePractice';
import usePracticeGenStepsData from './hooks/usePracticeGenStepsData';
import MyErrorMessages from '../../../../features/tests/ui/MyErrorMessage';
import { DifficultyType, LanguageType } from '../../../manager/tests/new/common/base-schema';
import MyButton from '../../../../features/tests/ui/buttons/MyButton';
import { ArrowLeft, FileText, LayoutTemplate, Sparkles } from 'lucide-react';
import { useLanguage } from '../../../../LanguageProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import paths from '../../../../router/paths';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import practiceGenSlice from '../../../../features/tests/stores/practiceGenSlice';
import ErrorMessageDialog from '../../../../features/tests/ui/fetch-states/ErrorMessageDialog';

const templateToMainValue = (template: TemplateCoreSchema): PracticeStepAllData => {
	const newMainValue: PracticeStepAllData = {
		step1: {
			title: template.title,
			language: template.language as LanguageType || "English",
			numberOfQuestions: template.numberOfQuestions,
			minutesToAnswer: template.minutesToAnswer,
			questionType: "MIXED",
		},
		step2: {
			difficulty: template.difficulty as DifficultyType || "Intern",
			description: template.description,
			tags: template.tags || [],
			outlines: template.outlines || [],
		},
		step3: {
		},
	};

	return newMainValue;
}

// Lesson: When I split it into 3 setMainValue (handleStep1, 2, 3...) and call it at the same time in the handleSelectTemplate function, it causes the state to update only the last function call (handleStep3), and override the previous ones.

export default function CandidateTestsGenerate2Page() {
	const { t } = useLanguage();
	const { state } = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const genStatus = useAppSelector(practiceGenSlice.selectors.selectGenStatus);
	const savedTestId = useAppSelector(practiceGenSlice.selectors.selectSavedTestId);

	const appliedTemplate = state?.template as TemplateCoreSchema | undefined;

	const [_, setSelectedTemplate] = useState<TemplateCoreSchema | null>(appliedTemplate || null);

	const [showTemplatesModal, setShowTemplatesModal] = useState(false);
	const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);

	const {
		step,
		currentErrorMessages,
		validationErrorMessages,
		handleNextStep,
		handlePrevStep,
		setMainValue,
		mainValue,
	} = usePracticeGenStepsData({
		initialMainValue: appliedTemplate ? templateToMainValue(appliedTemplate) : undefined,
	});

	const {
		handleGeneratePractice,
		errorMessage,
	} = useGeneratePractice();

	useEffect(() => {
		if (savedTestId !== null && genStatus === "saved") {
			navigate(paths.candidate.tests.in(savedTestId).PRACTICE);
			dispatch(practiceGenSlice.actions.acknowledgeGeneratedTest());
		}
	}, [savedTestId, genStatus]);

	const handleSelectTemplate = (template: TemplateCoreSchema) => {
		const newMainValue: PracticeStepAllData = templateToMainValue(template);
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
						validationErrors={validationErrorMessages.step1}
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
						step1Data={mainValue.step1}
					/>
				);
			case 3:
				return (
					<PracticeGenStep3
						mainValue={mainValue}
						onSaveTemplateClick={() => setShowSaveTemplateDialog(true)}
					/>
				);
			default:
				return t("gen_step_invalid");
		}
	};

	return (
		<div className='relative min-w-screen min-h-screen bg-gradient-to-br from-primary-toned-700 to-secondary-toned-700 -z-0 flex flex-col items-center justify-center'>

			{/* Header with buttons */}
			<div className='md:sticky top-0 flex items-center gap-2 w-full p-4'>
				<button className='text-white bg-transparent rounded-full hover:text-primary-toned-700 hover:bg-white transition-all duration-300 px-2 py-1 flex items-center gap-2' onClick={() => navigate(paths.candidate.tests.ROOT)}>
					<ArrowLeft size={18} />
					Back
				</button>

				<div className='ml-auto bg-white flex items-center gap-2 px-4 py-2 rounded-md shadow-md'>
					<MyButton
						size={"medium"}
						variant={"primary"}
					>
						<LayoutTemplate size={18} />
						{"Templates"}
					</MyButton>
					<MyButton
						size={"medium"}
						variant={"destructive"}
					>
						<FileText size={18} />
						{"Analyze JD"}
					</MyButton>
				</div>
			</div>

			<div className='flex-1 w-full h-full flex flex-col items-center justify-center my-12'>
				<div className='text-2xl font-semibold text-white mb-8 w-1/3 text-center'>
					<p>Use our AI-Powered Practice Generation Wizard and level up your skills</p>
				</div>

				<div className="py-12 px-12 flex flex-col gap-2 bg-white rounded-3xl shadow-md w-[40%]">
					<div className="flex-1">
						{genStatus !== "none" ? (
							<LoadingScreen state={genStatus} />
						) : (
							getStepContent()
						)}
					</div>

					<hr className='mt-4 mb-4 border-primary-toned-300' />

					<MyErrorMessages
						className='mb-4'
						errorMessages={currentErrorMessages.map(k => t(k))}
					/>

					<div className={`flex items-center justify-between`}>
						<MyButton
							disabled={step === 1}
							className="w-1/4 min-w-fit disabled:invisible"
							onClick={handlePrevStep}
						>
							{t("gen_step_prev")}
						</MyButton>
						{step < 3 && (
							<MyButton
								disabled={step === 3}
								className={"w-1/4 min-w-fit disabled:invisible"}
								onClick={handleNextStep}
							>
								{t("gen_step_next")}
							</MyButton>
						)}
						{step === 3 && (
							<MyButton
								className="w-1/4 min-w-fit bg-gradient-to-br from-primary to-secondary text-white hover:from-primary-toned-800 hover:to-secondary-toned-800"
								onClick={() => handleGeneratePractice(mainValue)}
								disabled={genStatus !== "none"}
							>
								<Sparkles size={18} />
								{t("gen_step_generate")}
							</MyButton>
						)}
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

					{errorMessage && (<ErrorMessageDialog errorMessage={errorMessage} />)}
				</div>
			</div>
		</div >
	);
};
