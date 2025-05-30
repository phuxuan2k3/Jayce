import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StepsBar({
	step,
	onStepChange,
	canNavigateToStep,
	validationState,
}: {
	step: 1 | 2 | 3 | 4;
	onStepChange: (step: 1 | 2 | 3 | 4) => void;
	canNavigateToStep?: (step: 1 | 2 | 3 | 4) => boolean;
	validationState?: { [key: number]: boolean };
}) {
	const steps = [1, 2, 3, 4] as const;

	const handleNext = () => {
		if (step < 4) {
			const nextStep = (step + 1) as 1 | 2 | 3 | 4;
			if (!canNavigateToStep || canNavigateToStep(nextStep)) {
				onStepChange(nextStep);
			}
		}
	};

	const handleBack = () => {
		if (step > 1) {
			onStepChange((step - 1) as 1 | 2 | 3 | 4);
		}
	};

	const handleStepClick = (stepNum: 1 | 2 | 3 | 4) => {
		if (!canNavigateToStep || canNavigateToStep(stepNum)) {
			onStepChange(stepNum);
		}
	};

	const getStepStatus = (stepNum: number) => {
		if (stepNum === step) return 'current';
		if (stepNum < step) return 'completed';
		if (validationState && !validationState[stepNum - 1] && stepNum > 1) return 'invalid';
		return 'upcoming';
	};
	return (
		<div className="flex items-center justify-center gap-6 p-6 bg-white rounded-lg shadow-sm border">
			{/* Back Button */}
			<button
				onClick={handleBack}
				disabled={step === 1}
				className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${step === 1
					? 'bg-gray-100 text-gray-400 cursor-not-allowed'
					: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
					}`}
			>
				<ChevronLeft size={20} />
			</button>

			{/* Steps */}
			<div className="flex items-center gap-4">
				{steps.map((stepNum, index) => {
					const status = getStepStatus(stepNum);
					const isClickable = !canNavigateToStep || canNavigateToStep(stepNum);

					return (
						<div key={stepNum} className="flex items-center">
							{/* Step Circle */}
							<button
								onClick={() => handleStepClick(stepNum)}
								disabled={!isClickable}
								className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg transition-all duration-200 ${status === 'current'
										? 'bg-blue-500 text-white shadow-lg scale-110'
										: status === 'completed'
											? 'bg-green-500 text-white hover:bg-green-600'
											: status === 'invalid'
												? 'bg-red-200 text-red-600 cursor-not-allowed'
												: isClickable
													? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
													: 'bg-gray-100 text-gray-400 cursor-not-allowed'
									}`}
							>
								{stepNum}
							</button>

							{/* Connector Line */}
							{index < steps.length - 1 && (
								<div className="flex items-center">
									<div
										className={`w-12 h-1 mx-2 transition-colors duration-300 ${stepNum < step ? 'bg-green-500' : 'bg-gray-300'
											}`}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* Next Button */}
			<button
				onClick={handleNext}
				disabled={step === 4 || (canNavigateToStep && !canNavigateToStep((step + 1) as 1 | 2 | 3 | 4))}
				className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${step === 4 || (canNavigateToStep && !canNavigateToStep((step + 1) as 1 | 2 | 3 | 4))
						? 'bg-gray-100 text-gray-400 cursor-not-allowed'
						: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
					}`}
			>
				<ChevronRight size={20} />
			</button>
		</div>
	);
}
