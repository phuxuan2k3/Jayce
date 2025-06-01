import { SamplingSettings, ValidationErrors } from "../types";

interface SamplingSettingsSectionProps {
	data: SamplingSettings;
	onChange: (settings: SamplingSettings) => void;
	errors?: ValidationErrors['samplingSettings'];
}

export default function SamplingSettingsSection({
	data,
	onChange,
	errors
}: SamplingSettingsSectionProps) {
	const handleTemperatureChange = (temperature: number) => {
		onChange({ ...data, temperature });
	};

	const handleSelfConsistencyChange = (selfConsistencyRuns: number) => {
		onChange({ ...data, selfConsistencyRuns });
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<div className="mb-4">
				<h3 className="text-lg font-semibold text-primary mb-2">Sampling Settings</h3>
				<p className="text-sm text-gray-600">
					Configure AI generation parameters for creativity and consistency
				</p>
			</div>

			<div className="space-y-6">
				{/* Temperature Slider */}
				<div>					<div className="flex items-center justify-between mb-3">
					<label className="text-sm font-medium text-gray-700">
						Temperature
					</label>
					<span className="text-sm font-medium text-primary bg-primary-50 px-2 py-1 rounded">
						{data.temperature.toFixed(1)}
					</span>
				</div>
					<div className="relative">
						<input
							type="range"
							min="0.2"
							max="1.0"
							step="0.1"
							value={data.temperature}
							onChange={(e) => handleTemperatureChange(parseFloat(e.target.value))}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
						/>
						<div className="flex justify-between text-xs text-gray-500 mt-1">
							<span>0.2 (Conservative)</span>
							<span>1.0 (Creative)</span>
						</div>
					</div>
					<p className="text-xs text-gray-600 mt-2">
						Lower values generate more focused and consistent questions, higher values allow more creativity
					</p>
					{errors?.temperature && (
						<p className="text-red-500 text-sm mt-1">{errors.temperature}</p>
					)}
				</div>

				{/* Self-Consistency Runs */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-3">
						Self-Consistency Runs
					</label>					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<button
								type="button"
								onClick={() => handleSelfConsistencyChange(Math.max(1, data.selfConsistencyRuns - 1))}
								disabled={data.selfConsistencyRuns <= 1}
								className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								−
							</button>
							<input
								type="number"
								min="1"
								max="5"
								value={data.selfConsistencyRuns}
								onChange={(e) => {
									const value = parseInt(e.target.value) || 1;
									if (value >= 1 && value <= 5) {
										handleSelfConsistencyChange(value);
									}
								}}
								className="w-16 text-center border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
							/>
							<button
								type="button"
								onClick={() => handleSelfConsistencyChange(Math.min(5, data.selfConsistencyRuns + 1))}
								disabled={data.selfConsistencyRuns >= 5}
								className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								+
							</button>
						</div>
						<span className="text-sm text-gray-600">
							runs (1-5)
						</span>
					</div>
					<p className="text-xs text-gray-600 mt-2">
						Number of independent generation attempts for improved consistency and quality
					</p>
					{errors?.selfConsistencyRuns && (
						<p className="text-red-500 text-sm mt-1">{errors.selfConsistencyRuns}</p>
					)}
				</div>
			</div>
		</div>
	);
}
