import { ExpertPersona, ExpertPersonaType, ValidationErrors } from "../types";

interface ExpertPersonaSectionProps {
	data: ExpertPersona;
	onChange: (persona: ExpertPersona) => void;
	errors?: ValidationErrors['expertPersona'];
}

const EXPERT_PERSONAS: { value: ExpertPersonaType; label: string; description: string }[] = [
	{
		value: "senior-architect",
		label: "Senior Architect",
		description: "Focus on system design, architecture patterns, and high-level technical decisions"
	},
	{
		value: "hands-on-developer",
		label: "Hands-on Developer",
		description: "Emphasize practical coding skills, implementation details, and hands-on experience"
	},
	{
		value: "beginner-friendly",
		label: "Beginner-Friendly",
		description: "Create accessible questions suitable for junior developers and newcomers"
	},
	{
		value: "custom",
		label: "Custom",
		description: "Define your own expertise persona with a custom description"
	}
];

export default function ExpertPersonaSection({
	data,
	onChange,
	errors
}: ExpertPersonaSectionProps) {
	const handlePersonaTypeChange = (type: ExpertPersonaType) => {
		onChange({
			...data,
			type,
			// Clear custom description if switching away from custom
			customDescription: type === 'custom' ? data.customDescription : ''
		});
	};

	const handleCustomDescriptionChange = (customDescription: string) => {
		onChange({
			...data,
			customDescription
		});
	};

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6">
			<div className="mb-4">
				<h3 className="text-lg font-semibold text-primary mb-2">Expert Persona</h3>
				<p className="text-sm text-gray-600">
					Choose the expertise level and perspective for AI question generation
				</p>
			</div>

			<div className="space-y-3">
				{EXPERT_PERSONAS.map((persona) => (
					<div
						key={persona.value}
						className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${data.type === persona.value
								? 'border-primary bg-primary-50 ring-2 ring-primary ring-opacity-20'
								: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
							}`}
						onClick={() => handlePersonaTypeChange(persona.value)}
					>
						<div className="flex items-start space-x-3">
							<input
								type="radio"
								name="expertPersona"
								value={persona.value}
								checked={data.type === persona.value}
								onChange={() => handlePersonaTypeChange(persona.value)}
								className="mt-1 w-4 h-4 text-primary focus:ring-primary border-gray-300"
							/>
							<div className="flex-1">
								<label className="block text-sm font-medium text-gray-900 cursor-pointer">
									{persona.label}
								</label>
								<p className="text-sm text-gray-600 mt-1">
									{persona.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Custom description field */}
			{data.type === 'custom' && (
				<div className="mt-4">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Custom Persona Description
					</label>
					<textarea
						value={data.customDescription}
						onChange={(e) => handleCustomDescriptionChange(e.target.value)}
						placeholder="Describe the expertise level and perspective you want for question generation..."
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
						rows={3}
					/>
					{errors?.customDescription && (
						<p className="text-red-500 text-sm mt-1">{errors.customDescription}</p>
					)}
				</div>
			)}

			{errors?.type && (
				<p className="text-red-500 text-sm mt-2">{errors.type}</p>
			)}
		</div>
	);
}
