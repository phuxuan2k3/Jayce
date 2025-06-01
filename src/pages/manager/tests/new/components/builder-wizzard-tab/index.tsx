import { useCallback, useState } from "react";
import { ExamConfigPersist } from "../../../../../../infra-test/core/test.model";
import StepsBar from "./components/StepsBar";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import Step4 from "./step-4";
import { TopicBlueprintData } from "../../models/generate.types";
import { StyleRefinementData } from "./step-3/types";
import ErrorMessages from "./components/ErrorMessage";
import { ErrorContextProvider } from "./contexts/error.context";
import { StepContextProvider } from "./contexts/step.context";
import Header from "./components/Header";

export default function BuilderWizzardTab({
	examInitialConfig,
	onExamConfigChange,
}: {
	examInitialConfig: ExamConfigPersist;
	onExamConfigChange?: (config: Partial<ExamConfigPersist>) => void;
}) {
	const [step, setStep] = useState<Steps>(1);
	const [errorMessages, setErrorMessages] = useState<string[]>([]);


	const [examConfig, setExamConfig] = useState<ExamConfigPersist>(examInitialConfig);
	const [topicBlueprint, setTopicBlueprint] = useState<TopicBlueprintData>({
		topics: []
	});
	const [styleRefinement, setStyleRefinement] = useState<StyleRefinementData>({
		expertPersona: {
			type: 'senior-architect',
			customDescription: '',
		},
		samplingSettings: {
			temperature: 0.7,
			selfConsistencyRuns: 3,
		},
		examplesAndRAG: {
			uploadedFiles: [],
			customExamples: '',
			selectedGalleryPresets: [],
		},
	});
	const [validationState, setValidationState] = useState<{ [key: number]: boolean }>({
		1: false,
		2: false,
		3: false,
		4: true
	});

	const handleExamConfigChange = useCallback((changes: Partial<ExamConfigPersist>) => {
		setExamConfig(prev => {
			const updatedConfig = { ...prev, ...changes };
			onExamConfigChange?.(changes);
			return updatedConfig;
		});
	}, [onExamConfigChange]);
	const handleTopicBlueprintChange = useCallback((changes: Partial<TopicBlueprintData>) => {
		setTopicBlueprint(prev => ({ ...prev, ...changes }));
	}, []);

	const handleStyleRefinementChange = useCallback((changes: StyleRefinementData) => {
		setStyleRefinement(changes);
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
					topicBlueprintData={topicBlueprint}
					onTopicBlueprintChange={handleTopicBlueprintChange}
					onValidationChange={(isValid) => handleValidationChange(2, isValid)}
				/>; case 3:
				return <Step3
					data={styleRefinement}
					onChange={handleStyleRefinementChange}
					onValidationChange={(isValid) => handleValidationChange(3, isValid)}
				/>;
			case 4:
				return <Step4 />;
			default:
				return <div>Invalid Step</div>;
		}
	}, [examConfig, handleExamConfigChange, handleValidationChange, topicBlueprint, handleTopicBlueprintChange, styleRefinement, handleStyleRefinementChange]);


	return (
		<ErrorContextProvider
			errorMessages={errorMessages}
			setErrorMessages={setErrorMessages}
		>
			<StepContextProvider
				step={step}
				setStep={setStep}
			>
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

				<Header />

				<ErrorMessages
					errorMessages={[]}
				/>

				<div className="col-span-2 border-b border-primary-toned-300 w-full" />

				<div className="text-base [&>label]:text-primary [&>label]:font-semibold w-full h-full overflow-y-auto grid grid-cols-[auto_1fr] items-center place-items-end gap-y-6 gap-x-8 p-6">
					{stepSwitcher(step)}
				</div>

			</StepContextProvider>
		</ErrorContextProvider>
	);
}

type Steps = 1 | 2 | 3 | 4;

