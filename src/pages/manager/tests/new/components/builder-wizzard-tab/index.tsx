import { useCallback, useState } from "react";
import { ExamConfigPersist } from "../../../../../../infra-test/core/test.model";
import StepsBar from "./components/StepsBar";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import { TopicBlueprintData } from "../../models/generate.types";

export default function BuilderWizzardTab({
	examInitialConfig,
	onExamConfigChange,
}: {
	examInitialConfig: ExamConfigPersist;
	onExamConfigChange?: (config: Partial<ExamConfigPersist>) => void;
}) {
	const [step, setStep] = useState<Steps>(1);
	const [examConfig, setExamConfig] = useState<ExamConfigPersist>(examInitialConfig);
	const [topicBlueprint, setTopicBlueprint] = useState<TopicBlueprintData>({
		topics: []
	});
	const [validationState, setValidationState] = useState<{ [key: number]: boolean }>({
		1: false,
		2: false,
		3: true,
		4: true
	}); const handleExamConfigChange = useCallback((changes: Partial<ExamConfigPersist>) => {
		setExamConfig(prev => {
			const updatedConfig = { ...prev, ...changes };
			onExamConfigChange?.(changes);
			return updatedConfig;
		});
	}, [onExamConfigChange]);

	const handleTopicBlueprintChange = useCallback((changes: Partial<TopicBlueprintData>) => {
		setTopicBlueprint(prev => ({ ...prev, ...changes }));
	}, []);

	const handleValidationChange = useCallback((stepNumber: number, isValid: boolean) => {
		setValidationState(prev => ({
			...prev,
			[stepNumber]: isValid
		}));
	}, []);

	const canNavigateToStep = useCallback((targetStep: Steps) => {
		// Can always go back to previous steps
		if (targetStep <= step) return true;

		// Can only go forward if all previous steps are valid
		for (let i = 1; i < targetStep; i++) {
			if (!validationState[i]) return false;
		}
		return true;
	}, [step, validationState]);
	const stepSwitcher = useCallback((step: Steps) => {
		switch (step) {
			case 1:
				return <Step1
					examConfigPersist={examConfig}
					onExamConfigChange={handleExamConfigChange}
					onValidationChange={(isValid) => handleValidationChange(1, isValid)}
				/>;
			case 2:
				return <Step2
					examConfigPersist={examConfig}
					onExamConfigChange={handleExamConfigChange}
					topicBlueprintData={topicBlueprint}
					onTopicBlueprintChange={handleTopicBlueprintChange}
					onValidationChange={(isValid) => handleValidationChange(2, isValid)}
				/>;
			case 3:
				return <Step3 />;
			case 4:
				return <Step4 />;
			default:
				return <div>Invalid Step</div>;
		}
	}, [examConfig, handleExamConfigChange, handleValidationChange, topicBlueprint, handleTopicBlueprintChange]);
	return (
		<div>
			{/* Step display bar */}
			<StepsBar
				step={step}
				onStepChange={(newStep) => {
					if (canNavigateToStep(newStep)) {
						setStep(newStep);
					}
				}}
				canNavigateToStep={canNavigateToStep}
				validationState={validationState}
			/>

			{stepSwitcher(step)}

		</div>
	);
}

type Steps = 1 | 2 | 3 | 4;

