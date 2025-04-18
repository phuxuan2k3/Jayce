import { useEffect, useState } from "react";
import { useTestCreateTab } from "../contexts/test-create-tab.context";

export default function TestCreateStepper() {
	const { activeTab, setActiveTab } = useTestCreateTab();
	const [maxTab, setMaxTab] = useState(0);

	useEffect(() => {
		if (activeTab > maxTab) {
			setMaxTab(activeTab);
		}
	}, [activeTab]);

	if (activeTab < 0 || activeTab > 2) {
		throw new Error("Invalid step number.");
	}

	const stepLabels = [
		"Overview",
		"Questions",
		"Preview",
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
							allowedStep={maxTab}
							onStepChange={setActiveTab}
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
	allowedStep,
	stepLength,
	onStepChange,
	stepLabel,
}: {
	step: number;
	allowedStep: number;
	stepLength: number;
	onStepChange: (step: number) => void;
	stepLabel: string;
}) {
	return (
		<div
			className={`flex items-center gap-2 text-2xl ${allowedStep >= step
				? "text-[var(--primary-color)]"
				: "text-gray-300"
				}`}
		>
			<div
				className={`flex items-center gap-2 ${allowedStep >= step ? "cursor-pointer" : "cursor-not-allowed"}`}
				onClick={() => {
					if (allowedStep >= step) {
						onStepChange(step);
					}
				}}
			>
				{/* Step number */}
				<div className={`flex items-center justify-center gap-2 text-[24px] ${allowedStep >= step
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
				<div className={`w-24 h-[2px] ${allowedStep > step
					? "bg-[var(--primary-color)]"
					: "bg-gray-300"
					} `}
				>
				</div>
			)}
		</div>
	);
}