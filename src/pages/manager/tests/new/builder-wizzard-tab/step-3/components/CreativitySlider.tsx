import { useLanguage } from "../../../../../../../LanguageProvider";

interface CreativitySliderProps {
	value: number;
	onChange: (value: number) => void;
}

export default function CreativitySlider({ value, onChange }: CreativitySliderProps) {
	const { t } = useLanguage();

	const getCreativityLabel = (value: number) => {
		if (value <= 3) return "creativity_level_conservative";
		if (value <= 7) return "creativity_level_balanced";
		return "creativity_level_creative";
	};

	return (
		<div className="mb-8">
			<h3 className="text-lg font-semibold text-primary mb-2">
				{t("creativity_slider_title")}
			</h3>
			<div className="space-y-4">
				<div className="relative">
					<style>
						{`
							.creativity-slider::-webkit-slider-thumb {
								appearance: none;
								width: 20px;
								height: 20px;
								border-radius: 50%;
								background: var(--primary-color);
								cursor: pointer;
								border: 2px solid white;
								box-shadow: 0 2px 4px rgba(0,0,0,0.2);
							}
							.creativity-slider::-moz-range-thumb {
								width: 20px;
								height: 20px;
								border-radius: 50%;
								background: var(--primary-color);
								cursor: pointer;
								border: 2px solid white;
								box-shadow: 0 2px 4px rgba(0,0,0,0.2);
								border: none;
							}
							.creativity-slider::-webkit-slider-track {
								background: transparent;
							}
							.creativity-slider::-moz-range-track {
								background: transparent;
								border: none;
							}
						`}
					</style>
					<input
						type="range"
						min="1"
						max="10"
						value={value}
						onChange={(e) => onChange(Number(e.target.value))}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer creativity-slider"
						style={{
							background: `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${((value - 1) / 9) * 100}%, #e5e7eb ${((value - 1) / 9) * 100}%, #e5e7eb 100%)`
						}}
					/>
				</div>
				<div className="flex justify-between text-sm text-gray-600">
					<span>{t("creativity_slider_min")}</span>
					<span className="font-medium text-primary">
						{value} - {t(getCreativityLabel(value))}
					</span>
					<span>{t("creativity_slider_max")}</span>
				</div>
			</div>
		</div>
	);
}
