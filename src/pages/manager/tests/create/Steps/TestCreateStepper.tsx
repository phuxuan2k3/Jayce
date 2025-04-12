export default function TestCreateStepper({
	step,
	onStepChange,
}: {
	step: number;
	onStepChange: (step: number) => void;
}) {
	if (step < 0 || step > 3) {
		throw new Error("Invalid step number. Step number should be between 0 and 3.");
	}
	const stepLabels = [
		"Overview",
		"Question",
		"Review",
		"Finish",
	];

	return (
		<div>
			<div className="text-center">
				<div className="font-arya pt-12 flex gap-2 items-center justify-center ">
					{stepLabels.map((stepLabel, index) => (
						<StepItem
							key={index}
							step={index}
							stepLength={stepLabels.length}
							currentStep={step}
							onStepChange={onStepChange}
							stepLabel={stepLabel}
						/>
					))}
				</div>
			</div>
		</div>
	);
};


function StepItem({
	step,
	currentStep,
	stepLength,
	onStepChange,
	stepLabel,
}: {
	step: number;
	currentStep: number;
	stepLength: number;
	onStepChange: (step: number) => void;
	stepLabel: string;
}) {
	return (
		<div
			className={`flex items-center gap-2 text-2xl ${currentStep >= step
				? "text-[var(--primary-color)]"
				: "text-gray-300"
				}`}
		>
			<div
				className={`flex items-center gap-2 ${currentStep >= step ? "cursor-pointer" : "cursor-not-allowed"}`}
				onClick={() => {
					if (currentStep >= step) {
						onStepChange(step);
					}
				}}
			>
				{/* Step number */}
				<div className={`flex items-center justify-center gap-2 text-[24px] ${currentStep >= step
					? "bg-[var(--primary-color)]"
					: "bg-gray-300"
					} rounded-3xl h-10 w-10 text-white font-bold text-center`}
				>
					{step + 1}
				</div>

				{/* Step label*/}
				<span>{stepLabel}</span>
			</div>

			{/* Step line */}
			{/* Only show the line if it's not the last step */}
			{step != stepLength - 1 && (
				<div className={`w-24 h-[2px] ${currentStep > step
					? "bg-[var(--primary-color)]"
					: "bg-gray-300"
					} `}
				>
				</div>
			)}
		</div>
	);
}