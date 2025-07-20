import StepperHeader from "./StepperHeader";
import StepperNavigation from "./StepperNavigation";
import { PracticeSteps } from "../../types";

const StepsEnum: PracticeSteps[] = ["step1", "step2", "step3"] as const;

export default function TestGenerationStepper({
  step: step,
  onStepChange,
  onFinish,
  hasErrors,
}: {
  step: PracticeSteps;
  onStepChange: (step: PracticeSteps) => void;
  onFinish: () => void;
  hasErrors: boolean;
}) {
  const isFinalStep = step === StepsEnum[StepsEnum.length - 1];
  const isFirstStep = step === StepsEnum[0];

  const isNextDisabled = false; // Always allow next step
  const isBackDisabled = isFirstStep;

  const handleNext = () => {
    if (hasErrors) {
      return;
    }
    const nextStepIndex = StepsEnum.indexOf(step) + 1;
    if (nextStepIndex < StepsEnum.length) {
      onStepChange(StepsEnum[nextStepIndex]);
    } else {
      console.error("No next step available");
    }
  };
  const handleBack = () => {
    const prevStepIndex = StepsEnum.indexOf(step) - 1;
    if (prevStepIndex >= 0) {
      onStepChange(StepsEnum[prevStepIndex]);
    } else {
      console.error("No previous step available");
    }
  };

  return (
    <div className="w-full   ">
      <StepperHeader step={step} />
      <StepperNavigation
        isFinalStep={isFinalStep}
        isNextDisabled={isNextDisabled}
        isBackDisabled={isBackDisabled}
        onBack={handleBack}
        onNext={handleNext}
        onFinish={onFinish}
      />
    </div>
  );
}
