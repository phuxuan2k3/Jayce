import { useCallback, useEffect, useMemo } from 'react';
import BottomNavButtons from './components/BottomNavButtons';
import MyErrorMessages from '../../../../../features/tests/ui/MyErrorMessage';
import Header from './components/Header';
import MyStepsBar from '../../../../../features/tests/ui/MyStepsBar';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';
import { getStepInfo, StepInfoKey } from '../common/types';
import { toast } from 'react-toastify';
import useBuilderStepsData from './hooks/useBuilderStepsData';
import { useLanguage } from '../../../../../LanguageProvider';

export default function BuilderWizzardTabMain({
	builderAllStepData,
	onGenerationConfirm,
}: {
	onGenerationConfirm: () => void;
	builderAllStepData: ReturnType<typeof useBuilderStepsData>;
}) {
	const { t } = useLanguage();

	const {
		handleValueChangeOfStep,
		mainValue,
		currentErrorMessages,
		handleNextStep,
		handlePrevStep,
		handleSetStep,
		step,
	} = builderAllStepData;

	useEffect(() => {
		if (currentErrorMessages.length > 0) {
			toast.warn(`${currentErrorMessages.join(", ")}`, {
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
					onConfirm={() => onGenerationConfirm()}
				/>;
			default:
				return <div>{t("builder_step_invalid_step")}</div>;
		}
	}, [step, mainValue, handleSetStep]);

	const stepInfo = useMemo(() => getStepInfo(step), [step]);

	return (
		<div className="flex flex-col gap-4 p-6 h-full overflow-y-auto">
			<MyStepsBar
				step={step}
				onStepChange={(newStep) => {
					if (newStep !== step) {
						const newStepInfo = newStep as StepInfoKey;
						if (newStepInfo == null) {
							toast.error(`${t("builder_step_invalid_step")}: ${newStepInfo}`, {
								autoClose: 5000,
								position: "top-right",
								hideProgressBar: false,
								closeOnClick: true,
							});
							return;
						}
						handleSetStep(newStepInfo);
					}
				}}
			/>

			<hr className=" border-primary-toned-300 w-full my-4" />

			<div className="flex flex-col gap-2">
				{step !== 4 && <Header
					title={t(stepInfo.title)}
					description={t(stepInfo.description)}
				/>}

				<MyErrorMessages
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
