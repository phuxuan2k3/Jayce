import { useCallback, useMemo } from 'react';
import BottomNavButtons from './components/BottomNavButtons';
import ErrorMessages from './components/ErrorMessage';
import Header from './components/Header';
import StepsBar from './components/StepsBar';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';
import useBuiderStepsData from './hooks/useBuilderStepsData';
import { AllStepData, getStepInfo, StepInfoKey } from './utils/types';

export default function MainStep({
	initialData,
	onDataConfirm,
}: {
	initialData?: AllStepData;
	onDataConfirm: (data: AllStepData) => void;
}) {
	const {
		currentErrorMessages,
		handleNextStep,
		handlePrevStep,
		handleSetStep,
		draftState: { step1Draft, step2Draft, step3Draft },
		mainState,
		step,
	} = useBuiderStepsData(initialData);

	const stepSwitcher = useCallback((step: StepInfoKey) => {
		switch (step) {
			case 1:
				return <Step1
					data={step1Draft.draftValue}
					onDataChange={step1Draft.setDraftValue}
				/>;
			case 2:
				return <Step2
					data={step2Draft.draftValue}
					onDataChange={step2Draft.setDraftValue}
				/>;
			case 3:
				return <Step3
					data={step3Draft.draftValue}
					onDataChange={step3Draft.setDraftValue}
				/>;
			case 4:
				return <Step4
					{...mainState}
					onConfirm={() => onDataConfirm(mainState)}
				/>;
			default:
				return <div>Invalid Step</div>;
		}
	}, [step, step1Draft, step2Draft, step3Draft, mainState, handleSetStep]);

	const stepInfo = useMemo(() => getStepInfo(step), [step]);

	return (
		<div className="flex flex-col gap-4">
			<StepsBar
				step={step}
				onStepChange={handleSetStep}
			/>

			<div className="border-b border-primary-toned-300 w-full" />

			<div className="flex flex-col gap-2 p-4">
				<Header
					title={stepInfo.title}
					description={stepInfo.description}
				/>

				<ErrorMessages
					errorMessages={currentErrorMessages}
				/>
			</div>

			<div className="border-b border-primary-toned-300 w-full" />
			{stepSwitcher(step)}

			<BottomNavButtons
				onNext={handleNextStep}
				onBack={handlePrevStep}
			/>
		</div>
	)
}
