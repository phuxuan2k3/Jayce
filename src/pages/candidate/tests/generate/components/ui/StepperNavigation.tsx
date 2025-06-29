import React from 'react';

interface StepperNavigationProps {
	isFinalStep: boolean;
	isNextDisabled: boolean;
	isBackDisabled: boolean;
	onBack: () => void;
	onNext: () => void;
	onFinish: () => void;
}

const StepperNavigation: React.FC<StepperNavigationProps> = ({
	isFinalStep,
	isNextDisabled,
	isBackDisabled,
	onBack,
	onNext,
	onFinish,
}) => {
	return (
		<div className="flex justify-between mt-6">
			<button
				onClick={onBack}
				disabled={isBackDisabled}
				className={`px-4 py-2 border border-gray-300 rounded-md ${isBackDisabled
					? 'bg-gray-100 text-gray-400 cursor-not-allowed'
					: 'bg-white text-gray-700 hover:bg-gray-50'}`}
			>
				Back
			</button>

			<button
				onClick={isFinalStep ? onFinish : onNext}
				disabled={isNextDisabled}
				className={`px-4 py-2 rounded-md ${isNextDisabled
					? 'bg-primary-toned-300 cursor-not-allowed'
					: 'bg-primary-toned-600 hover:bg-primary-toned-700 text-white'}`}
			>
				{isFinalStep ? 'Generate Test' : 'Next'}
			</button>
		</div>
	);
};

export default StepperNavigation;
