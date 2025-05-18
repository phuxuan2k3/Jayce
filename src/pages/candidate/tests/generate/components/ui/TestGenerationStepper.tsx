import React from 'react';

interface TestGenerationStepperProps {
	activeStep: number;
	onNext: () => void;
	onBack: () => void;
	onFinish: () => void;
	isNextDisabled: boolean;
	isBackDisabled: boolean;
}

const TestGenerationStepper: React.FC<TestGenerationStepperProps> = ({
	activeStep,
	onNext,
	onBack,
	onFinish,
	isNextDisabled,
	isBackDisabled
}) => {
	const steps = [
		'Test Information',
		'Prompt Configuration',
		'Add Outlines & Generate'
	];

	return (
		<div className="w-full font-arya">

			{/* Stepper Header */}
			<div className="flex items-center justify-between mb-8">
				{steps.map((label, index) => (
					<div key={index} className="flex-1 flex flex-col items-center">
						<div
							className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${activeStep === index
									? 'bg-primary-toned-600 text-white'
									: activeStep > index
										? 'bg-secondary-toned-500 text-white'
										: 'bg-gray-200 text-gray-600'}`}
						>
							{activeStep > index ? (
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							) : (
								index + 1
							)}
						</div>
						<p className={`mt-2 text-sm font-medium ${activeStep === index ? 'text-primary-toned-600' : 'text-gray-500'}`}>
							{label}
						</p>
					</div>
				))}
			</div>

			{/* Stepper Navigation */}
			<div className="flex justify-between mt-6">
				<button
					onClick={onBack}
					disabled={isBackDisabled}
					className={`px-4 py-2 border border-gray-300 rounded-md 
            ${isBackDisabled
							? 'bg-gray-100 text-gray-400 cursor-not-allowed'
							: 'bg-white text-gray-700 hover:bg-gray-50'}`}
				>
					Back
				</button>

				<button
					onClick={activeStep === steps.length - 1 ? onFinish : onNext}
					disabled={isNextDisabled}
					className={`px-4 py-2 rounded-md 
            ${isNextDisabled
							? 'bg-primary-toned-300 cursor-not-allowed'
							: 'bg-primary-toned-600 hover:bg-primary-toned-700 text-white'}`}
				>
					{activeStep === steps.length - 1 ? 'Generate Test' : 'Next'}
				</button>
			</div>
		</div>
	);
};

export default TestGenerationStepper;