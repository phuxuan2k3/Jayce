import CreativitySlider from './components/CreativitySlider';
import ContextSection from './components/ContextSection';
import HelpText from './components/HelpText';
import { BuilderStep3Type } from '../../common/step-schema';

export default function Step3({
	data,
	onDataChange,
}: {
	data: BuilderStep3Type;
	onDataChange: (data: BuilderStep3Type) => void;
}) {
	const handleCreativityChange = (value: number) => {
		onDataChange({
			...data,
			creativity: value,
		});
	};

	const handleContextChange = (field: keyof BuilderStep3Type['context'], value: any) => {
		onDataChange({
			...data,
			context: {
				...data.context,
				[field]: value,
			},
		});
	}; return (
		<div className="space-y-6">
			<CreativitySlider
				value={data.creativity}
				onChange={handleCreativityChange}
			/>

			<ContextSection
				context={data.context}
				onContextChange={handleContextChange}
			/>

			<HelpText />
		</div>
	);
}
