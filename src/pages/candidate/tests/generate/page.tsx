import React, { useCallback, useEffect, useReducer, useState } from 'react';
import LeftLayoutTemplate from "../../../../components/layouts/LeftLayoutTemplate";
import TestGenerationSidebar from "./components/ui/TestGenerationSidebar";
import TemplateSelectionModal from "./components/ui/TemplateSelectionModal";
import SaveTemplateDialog from "./components/ui/SaveTemplateDialog";
import TestGenerationStepper from './components/ui/TestGenerationStepper';
import PracticeBasicInfoStep from './components/steps/PracticeBasicInfoStep';
import PracticePromptConfigStep from './components/steps/PracticePromptConfigStep';
import OutlinesStep from './components/steps/OutlinesStep';
import { LoadingScreen } from './components/ui/LoadingScreen';
import useGeneratePractice from './hooks/useGeneratePractice';
import { initialState, practiceGenerationReducer } from './reducers/practice-generation.reducer';
import ApiErrorDialog from './components/ui/ApiErrorDialog';
import { PracticeGenerationActionTypes } from './reducers/reducer-types';
import { PracticeGenerationData } from './types';
import usePracticeGenerationSelectors from './reducers/practice-generation.selector';
import { TemplateCoreSchema } from '../../../../features/tests/api/test.api-gen-v2';

const CandidateTestsGeneratePage: React.FC = () => {
	const [state, dispatch] = useReducer(practiceGenerationReducer, initialState);

	const {
		handleGeneratePractice,
	} = useGeneratePractice({
		state,
		dispatch,
	});

	const { verifyData } = usePracticeGenerationSelectors({ state });

	const [showApiErrorDialog, setShowApiErrorDialog] = useState(false);
	useEffect(() => {
		if (state.apiError) {
			setShowApiErrorDialog(true);
		}
	}, [state.apiError]);

	const [activeStep, setActiveStep] = useState(0);
	const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
	const [showTemplatesModal, setShowTemplatesModal] = useState(false);

	const setData = useCallback((data: Partial<PracticeGenerationData>) => {
		dispatch({
			type: PracticeGenerationActionTypes.SET_DATA,
			payload: {
				...state.data,
				...data,
			},
		});
		dispatch({
			type: PracticeGenerationActionTypes.SET_ERROR,
			payload: null,
		});
	}, [state.data]);

	const handleNext = () => {
		const { isValid, message } = verifyData(activeStep);
		if (!isValid) {
			dispatch({
				type: PracticeGenerationActionTypes.SET_ERROR,
				payload: message,
			});
			return;
		}
		dispatch({
			type: PracticeGenerationActionTypes.SET_ERROR,
			payload: null,
		});
		setActiveStep((prev) => prev + 1);
	};

	const handleBack = () => {
		setActiveStep((prev) => prev - 1);
	};

	const handleSelectTemplate = (template: TemplateCoreSchema) => {
		dispatch({
			type: PracticeGenerationActionTypes.APPLY_TEMPLATE,
			payload: template,
		});
	};

	const handleSaveAsTemplateClick = () => {
		setShowSaveTemplateDialog(true);
	};

	const getStepContent = (step: number) => {
		switch (step) {
			case 0:
				return (
					<PracticeBasicInfoStep
						info={state.data}
						onInfoChange={(info) => setData(info)}
						selectedTemplate={state.template}
						onSelectTemplateClick={() => setShowTemplatesModal(true)}
					/>
				);
			case 1:
				return (
					<PracticePromptConfigStep
						promptConfig={state.data}
						onPromptConfigChange={(promptConfig) => setData(promptConfig)}
						testTitle={state.data.title}
						testDescription={state.data.description}
					/>
				);
			case 2:
				return (
					<OutlinesStep
						reducer={{
							state,
							dispatch,
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
						onFinish={handleGeneratePractice}
						isNextDisabled={state.error != null || activeStep === 3}
						isBackDisabled={activeStep === 0}
					/>

					{state.error && (
						<div className="mt-4 text-red-500">
							{state.error}
						</div>
					)}

					<div className="mt-8">
						{state.loadingState !== "none" ? (
							<LoadingScreen
								state={state.loadingState} />
						) : (
							getStepContent(activeStep)
						)}
					</div>
				</div>
			</LeftLayoutTemplate>

			{/* Template Selection Modal */}
			<TemplateSelectionModal
				isOpen={showTemplatesModal}
				onClose={() => setShowTemplatesModal(false)}
				onSelectTemplate={handleSelectTemplate}
			/>

			{/* Save Template Dialog */}
			<SaveTemplateDialog
				isOpen={showSaveTemplateDialog}
				onClose={() => setShowSaveTemplateDialog(false)}
				initializeTemplateCreateData={state.data}
				onTemplateSaved={(templateData) => setData(templateData)}
			/>

			<ApiErrorDialog
				error={state.apiError}
				onClose={() => setShowApiErrorDialog(false)}
				onRetry={() => handleGeneratePractice()}
				isOpen={showApiErrorDialog}
			/>
		</>
	);
};

export default CandidateTestsGeneratePage;