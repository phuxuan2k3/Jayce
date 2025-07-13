import { Check } from 'lucide-react';
import { PracticeSteps } from '../../types';
import { useLanguage } from '../../../../../../LanguageProvider';

const StepsEnum: PracticeSteps[] = [
	"step1",
	"step2",
	"step3",
] as const;

const NumberedSteps: Record<PracticeSteps, number> = {
	step1: 1,
	step2: 2,
	step3: 3,
};

const StepsLabels: Record<PracticeSteps, string> = {
	step1: 'stepper_label_step1',
	step2: 'stepper_label_step2',
	step3: 'stepper_label_step3',
};

const stepCompare = (a: PracticeSteps, b: PracticeSteps) => {
	return NumberedSteps[a] - NumberedSteps[b];
}

export default function StepperHeader({ step }: { step: PracticeSteps }) {
	const { t } = useLanguage();

	return (
		<div className="flex items-center justify-between mb-8">
			{StepsEnum.map((key, index) => (
				<div key={index} className="flex-1 flex flex-col items-center">
					<div
						className={`w-10 h-10 rounded-full flex items-center justify-center 
							${step === key
								? 'bg-primary-toned-600 text-white'
								: stepCompare(step, key) > 0
									? 'bg-secondary-toned-500 text-white'
									: 'bg-gray-200 text-gray-600'
							}`}
					>
						{stepCompare(step, key) > 0 ? (
							<Check />
						) : (
							index + 1
						)}
					</div>
					<p className={`mt-2 text-sm font-medium ${step === key ? 'text-primary-toned-600' : 'text-gray-500'}`}>
						{t(StepsLabels[key])}
					</p>
				</div>
			))}
		</div>
	);
}
