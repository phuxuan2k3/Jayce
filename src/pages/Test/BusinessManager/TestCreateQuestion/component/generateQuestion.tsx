import { useState } from "react";
import { Step1 } from "./step1";
import { Step2 } from "./step2";
import { Step3 } from "./step3";
import { Step4 } from "./step4";

export const GenerateQuestion: React.FC = () => {
    const [step, setStep] = useState(1);

    return (
        <div>
            {step === 1 && <Step1 onNext={() => setStep(2)} />}
            {step === 2 && <Step2 onNext={() => setStep(3)} />}
            {step === 3 && <Step3 onNext={() => setStep(4)} />}
            {step === 4 && <Step4 onNext={() => setStep(2)} />}
        </div>
    );
};
