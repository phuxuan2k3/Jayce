import { useCallback, useEffect, useMemo } from 'react';
import BottomNavButtons from './components/BottomNavButtons';
import ErrorMessages from './components/ErrorMessage';
import Header from './components/Header';
import StepsBar from './components/StepsBar';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';
import useBuiderStepsData from './hooks/useBuilderStepsData';
import { AllStepData, getStepInfo, StepInfoKey } from '../common/types';
import { toast } from 'react-toastify';

export default function BuilderWizzardTabMain({
	initialData,
	onDataConfirm,
}: {
	initialData?: AllStepData;
	onDataConfirm: (data: AllStepData) => void;
}) {
	const {
		handleValueChangeOfStep,
		mainValue,
		currentErrorMessages,
		handleNextStep,
		handlePrevStep,
		handleSetStep,
		step,
	} = useBuiderStepsData(initialData);

	useEffect(() => {
		if (currentErrorMessages.length > 0) {
			toast.warn(`Constraints: ${currentErrorMessages.join(", ")}`, {
				autoClose: 5000,
				position: "top-right",
				hideProgressBar: false,
				closeOnClick: true,
			});
		}
	}, [currentErrorMessages]);

	const stepSwitcher = useCallback((step: StepInfoKey) => {
		switch (step) {
			case 1:
				return <Step1
					data={mainValue.step1}
					onDataChange={(value) => handleValueChangeOfStep('step1', value)}
				/>;
			case 2:
				return <Step2
					data={mainValue.step2}
					onDataChange={(value) => handleValueChangeOfStep('step2', value)}
				/>;
			case 3:
				return <Step3
					data={mainValue.step3}
					onDataChange={(value) => handleValueChangeOfStep('step3', value)}
				/>;
			case 4:
				return <Step4
					{...mainValue}
					onConfirm={() => onDataConfirm(mainValue)}
				/>;
			default:
				return <div>Invalid Step</div>;
		}
	}, [step, mainValue, handleSetStep]);

	const stepInfo = useMemo(() => getStepInfo(step), [step]);

	return (
		<div className="flex flex-col gap-4 p-6 h-full overflow-y-auto">
			<StepsBar
				step={step}
				onStepChange={handleSetStep}
			/>

			<hr className=" border-primary-toned-300 w-full my-4" />

			<div className="flex flex-col gap-2">
				{step !== 4 && <Header
					title={stepInfo.title}
					description={stepInfo.description}
				/>}

				<ErrorMessages
					errorMessages={currentErrorMessages}
				/>
			</div>

			{stepSwitcher(step)}

			<hr className="border-primary-toned-300 w-full my-4" />

			<BottomNavButtons
				isLastStep={step === 4}
				isFirstStep={step === 1}
				onNext={handleNextStep}
				onBack={handlePrevStep}
			/>
		</div>
	)
}
