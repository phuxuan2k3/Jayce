import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import {
	selectWizardState,
	setCurrentStep,
	saveAsDraft
} from './state/wizardSlice';

// Step Components
import TestBasics from './components/step1/TestBasics';
import QuestionBlueprint from './components/step2/QuestionBlueprint';
import StyleRefinement from './components/step3/StyleRefinement';
import PreviewExport from './components/step4/PreviewExport';

const BuilderWizzardTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const { currentStep, isDirty } = useAppSelector(selectWizardState);

	// Steps configuration
	const steps = [
		{ id: 1, label: 'Exam Basics', component: TestBasics },
		{ id: 2, label: 'Question Blueprint', component: QuestionBlueprint },
		{ id: 3, label: 'Style & Refinement', component: StyleRefinement },
		{ id: 4, label: 'Preview & Export', component: PreviewExport },
	];

	// Get current step component
	const CurrentStepComponent = steps[currentStep - 1].component;

	// Navigation handlers
	const handleNext = () => {
		if (currentStep < steps.length) {
			dispatch(setCurrentStep(currentStep + 1));
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			dispatch(setCurrentStep(currentStep - 1));
		}
	};

	const handleSaveAsDraft = () => {
		dispatch(saveAsDraft());
	};

	const isLastStep = currentStep === steps.length;

	return (
		<div className="flex flex-col p-4">
			{/* Progress indicator */}
			<div className="mb-8">
				<div className="flex justify-between items-center mb-2">
					<h2 className="text-2xl font-bold text-gray-800">
						{steps[currentStep - 1].label}
					</h2>
					<span className="text-sm font-medium text-gray-500">
						Step {currentStep} of {steps.length}
					</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-2.5">
					<div
						className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
						style={{ width: `${(currentStep / steps.length) * 100}%` }}
					></div>
				</div>
			</div>

			{/* Step Content */}
			<div className="flex-grow mb-8">
				<CurrentStepComponent />
			</div>

			{/* Navigation buttons */}
			<div className="flex justify-between pt-6 border-t border-gray-200">
				<div>
					{currentStep > 1 && (
						<button
							onClick={handleBack}
							className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
						>
							Back
						</button>
					)}
				</div>
				<div className="flex space-x-3">
					{isDirty && (
						<button
							onClick={handleSaveAsDraft}
							className="px-6 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
						>
							Save & Resume Later
						</button>
					)}
					<button
						onClick={handleNext}
						className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
					>
						{isLastStep ? 'Generate & Export' : 'Next'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default BuilderWizzardTab;
