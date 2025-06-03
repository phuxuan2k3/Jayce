import { Step3Data } from '../common/model-types';
import CreativitySlider from './components/CreativitySlider';
import ContextSection from './components/ContextSection';
import HelpText from './components/HelpText';

export default function Step3({
	step3Data,
	onStep3DataChange,
}: {
	step3Data: Step3Data;
	onStep3DataChange: (data: Step3Data) => void;
}) {
	const handleCreativityChange = (value: number) => {
		onStep3DataChange({
			...step3Data,
			creativity: value,
		});
	};

	const handleContextChange = (field: keyof Step3Data['context'], value: any) => {
		onStep3DataChange({
			...step3Data,
			context: {
				...step3Data.context,
				[field]: value,
			},
		});
	}; return (
		<div className="p-6 space-y-6">
			<CreativitySlider
				value={step3Data.creativity}
				onChange={handleCreativityChange}
			/>

			<ContextSection
				context={step3Data.context}
				onContextChange={handleContextChange}
			/>

			<HelpText />
		</div>
	);
}
