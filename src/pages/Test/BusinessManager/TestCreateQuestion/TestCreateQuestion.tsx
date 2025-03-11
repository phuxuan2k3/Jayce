import { useState } from "react";
import { Step1, Step2, Step3, Step4 } from "./component";

const CreateNewTest = () => {

	const [step, setStep] = useState(1);

	return (
		<>
			<div>
				{step === 1 && <Step1 onNext={() => setStep(2)} />}
				{step === 2 && <Step2 onNext={() => setStep(3)} />}
				{step === 3 && <Step3 onNext={() => setStep(4)} />}
				{step === 4 && <Step4 onNext={() => setStep(2)} />}
			</div>
		</>
	);
}

export default CreateNewTest;