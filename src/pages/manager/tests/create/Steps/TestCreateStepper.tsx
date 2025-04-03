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
	const steps = [
		"Overview",
		"Question",
		"Review",
	];
	const stepClasses = (step: number) => {
		return `flex items-center gap-2 text-[24px] ${step === step ? "bg-[var(--primary-color)]" : "bg-gray-300"} rounded-3xl h-10 w-10 text-white font-bold text-center`;
	}

	const stepTextClasses = (step: number) => {
		return `flex items-center gap-2 text-[24px] ${step === step ? "text-[var(--primary-color)]" : "text-gray-300"}`;
	}

	const stepLineClasses = (step: number) => {
		return `w-24 ${step > step ? "border-[var(--primary-color)]" : "border-gray-800"}`;
	}

	const stepText = (step: number) => {
		return step === step ? steps[step] : steps[step];
	}

	return (
		<div>
			<div className="relative h-[600px] text-center">
				<div className="font-arya pt-12 flex gap-2 items-center justify-center ">
					{steps.map((_, index) => (
						<div onClick={() => onStepChange(index)} key={index}>
							<div className={stepTextClasses(index)}>
								<div className={stepClasses(index)}>
									{index + 1}
								</div>
								<span>{stepText(index)}</span>
							</div>
							<div className={stepLineClasses(index)}>
								<hr className="border-2" />
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="w-1/2 h-1 bg-gray-300 rounded-full animate-pulse"></div>
				<div className="absolute w-1/2 h-1 bg-[var(--primary-color)] rounded-full animate-pulse"></div>
			</div>
			<div className="font-arya text-[24px] font-bold text-center mt-10">
				Now, complete some specific contexts to generate questions...
			</div>
		</div>
	);
};
