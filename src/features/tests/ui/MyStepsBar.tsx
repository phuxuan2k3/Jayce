import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../../app/cn";

export default function MyStepsBar({
	step,
	onStepChange,
	canNavigateToStep,
	validationState,
	className = "",
	steps = [1, 2, 3, 4],
	connectorWidth = 64, // Default width for connectors
}: {
	step: number;
	onStepChange: (step: number) => void;
	canNavigateToStep?: (step: number) => boolean;
	validationState?: { [key: number]: boolean };
	className?: string;
	steps?: number[];
	connectorWidth?: number;
}) {
	const handleNext = () => {
		if (step < 4) {
			const nextStep = step + 1;
			if (!canNavigateToStep || canNavigateToStep(nextStep)) {
				onStepChange(nextStep);
			}
		}
	};

	const handleBack = () => {
		if (step > 1) {
			onStepChange(step - 1);
		}
	};

	const handleStepClick = (stepNum: number) => {
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
		<div className={cn("flex items-center justify-center p-2", className)}>
			{/* Back Button */}
			<button
				onClick={handleBack}
				disabled={step === 1}
				className={cn(
					"flex items-center justify-center w-10 h-10 rounded-full transition-colors mr-auto",
					{
						"bg-gray-100 text-gray-400 cursor-not-allowed": step === 1,
						"bg-primary-toned-500 text-white hover:bg-primary-toned-600 active:bg-primary-toned-700": step !== 1,
					}
				)}
			>
				<ChevronLeft size={20} />
			</button>

			{/* Steps */}
			<div className="flex-1 flex items-center justify-center gap-4">
				{steps.map((stepNum, index) => {
					const status = getStepStatus(stepNum);
					const isClickable = !canNavigateToStep || canNavigateToStep(stepNum);

					return (
						<div key={stepNum} className="flex items-center w-fit">
							{/* Step Circle */}
							<button
								onClick={() => handleStepClick(stepNum)}
								disabled={!isClickable}
								className={cn(
									"flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg transition-all duration-200",
									{
										"bg-secondary-toned-500 text-white shadow-lg scale-110": status === "current",
										"bg-primary-toned-500 text-white hover:bg-primary-toned-600": status === "completed",
										"bg-red-200 text-red-600 cursor-not-allowed": status === "invalid",
										"bg-gray-200 text-gray-600 hover:bg-gray-300": status === "upcoming" && isClickable,
										"bg-gray-100 text-gray-400 cursor-not-allowed": status === "upcoming" && !isClickable,
									}
								)}
							>
								{stepNum}
							</button>

							{/* Connector Line */}
							{index < steps.length - 1 && (
								<div
									className={cn(
										"h-1 mx-2 transition-colors duration-300",
										{
											"bg-primary-toned-500": stepNum < step,
											"bg-gray-300": stepNum >= step,
										}
									)}
									style={{ width: connectorWidth }}
								/>
							)}
						</div>
					);
				})}
			</div>

			{/* Next Button */}
			{(() => {
				const nextStep = step + 1;
				let canGoNext = step !== 4;
				if (canGoNext && canNavigateToStep) {
					canGoNext = !!canNavigateToStep(nextStep as 1 | 2 | 3 | 4);
				}
				return (
					<button
						onClick={handleNext}
						disabled={!canGoNext}
						className={cn(
							"flex items-center justify-center w-10 h-10 rounded-full transition-colors ml-auto",
							{
								"bg-gray-100 text-gray-400 cursor-not-allowed": !canGoNext,
								"bg-primary-toned-500 text-white hover:bg-primary-toned-600 active:bg-primary-toned-700": canGoNext,
							}
						)}
					>
						<ChevronRight size={20} />
					</button>
				);
			})()}
		</div>
	);
}
