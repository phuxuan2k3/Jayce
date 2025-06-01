import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Settings, User, BookOpen } from 'lucide-react';
import ExpertPersonaSection from './components/ExpertPersonaSection';
import SamplingSettingsSection from './components/SamplingSettingsSection';
import ExamplesAndRAGSection from './components/ExamplesAndRAGSection';
import { useStep3Validation } from './hooks/useStep3Validation';
import { StyleRefinementData, ExpertPersona, SamplingSettings, ExamplesAndRAG } from './types';

interface Step3Props {
	data?: StyleRefinementData;
	onChange?: (data: StyleRefinementData) => void;
	onValidationChange?: (isValid: boolean) => void;
}

const defaultData: StyleRefinementData = {
	expertPersona: {
		type: 'senior-architect',
		customDescription: '',
	},
	samplingSettings: {
		temperature: 0.7,
		selfConsistencyRuns: 3,
	},
	examplesAndRAG: {
		uploadedFiles: [],
		customExamples: '',
		selectedGalleryPresets: [],
	},
};

export default function Step3({
	data = defaultData,
	onChange,
	onValidationChange
}: Step3Props) {
	const [expandedSections, setExpandedSections] = useState({
		expertPersona: true,
		samplingSettings: true,
		examplesAndRAG: true,
	});

	const { errors, validateStep } = useStep3Validation();

	useEffect(() => {
		const isValid = validateStep(data);
		onValidationChange?.(isValid);
	}, [data, validateStep, onValidationChange]);

	const handleExpertPersonaChange = (expertPersona: ExpertPersona) => {
		const updatedData = { ...data, expertPersona };
		onChange?.(updatedData);
	};

	const handleSamplingSettingsChange = (samplingSettings: SamplingSettings) => {
		const updatedData = { ...data, samplingSettings };
		onChange?.(updatedData);
	};

	const handleExamplesAndRAGChange = (examplesAndRAG: ExamplesAndRAG) => {
		const updatedData = { ...data, examplesAndRAG };
		onChange?.(updatedData);
	};

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections(prev => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const sections = [
		{
			key: 'expertPersona' as const,
			title: 'Expert Persona',
			icon: User,
			description: 'Choose the AI personality and expertise level for question generation',
			component: (
				<ExpertPersonaSection
					data={data.expertPersona}
					onChange={handleExpertPersonaChange}
					errors={errors?.expertPersona}
				/>
			),
		},
		{
			key: 'samplingSettings' as const,
			title: 'Sampling Settings',
			icon: Settings,
			description: 'Configure AI generation parameters for question quality and variety',
			component: (
				<SamplingSettingsSection
					data={data.samplingSettings}
					onChange={handleSamplingSettingsChange}
					errors={errors?.samplingSettings}
				/>
			),
		},
		{
			key: 'examplesAndRAG' as const,
			title: 'Examples & Reference Content',
			icon: BookOpen,
			description: 'Provide examples and reference materials to guide question generation',
			component: (
				<ExamplesAndRAGSection
					data={data.examplesAndRAG}
					onChange={handleExamplesAndRAGChange}
					errors={errors?.examplesAndRAG}
				/>
			),
		},
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h2 className="text-xl font-semibold text-gray-900 mb-2">
					Style & Refinement
				</h2>
				<p className="text-gray-600">
					Configure AI generation parameters and provide examples to guide question creation.
				</p>
			</div>

			{/* Accordion Sections */}
			<div className="space-y-4">
				{sections.map((section) => {
					const isExpanded = expandedSections[section.key];
					const Icon = section.icon;

					return (
						<div
							key={section.key}
							className="border border-gray-200 rounded-lg overflow-hidden"
						>
							{/* Section Header */}
							<button
								onClick={() => toggleSection(section.key)}
								className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
							>
								<div className="flex items-center space-x-3">
									<Icon className="h-5 w-5 text-gray-600" />
									<div>
										<h3 className="font-semibold text-gray-900">
											{section.title}
										</h3>
										<p className="text-sm text-gray-600 mt-1">
											{section.description}
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									{/* Error indicator */}
									{errors?.[section.key] && Object.keys(errors[section.key] || {}).length > 0 && (
										<div className="w-2 h-2 bg-red-500 rounded-full" />
									)}

									{/* Expand/Collapse Icon */}
									{isExpanded ? (
										<ChevronDown className="h-5 w-5 text-gray-400" />
									) : (
										<ChevronRight className="h-5 w-5 text-gray-400" />
									)}
								</div>
							</button>

							{/* Section Content */}
							{isExpanded && (
								<div className="px-6 py-6 bg-white border-t border-gray-200">
									{section.component}
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* Summary Section */}
			<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
				<h4 className="font-medium text-blue-900 mb-2">Configuration Summary</h4>
				<div className="text-sm text-blue-800 space-y-1">
					<p>
						<span className="font-medium">Expert Persona:</span>{' '}
						{data.expertPersona.type === 'senior-architect' && 'Senior Architect'}
						{data.expertPersona.type === 'hands-on-developer' && 'Hands-on Developer'}
						{data.expertPersona.type === 'beginner-friendly' && 'Beginner-Friendly'}
						{data.expertPersona.type === 'custom' && 'Custom'}
					</p>
					<p>
						<span className="font-medium">Temperature:</span> {data.samplingSettings.temperature} |
						<span className="font-medium"> Self-Consistency Runs:</span> {data.samplingSettings.selfConsistencyRuns}
					</p>
					<p>
						<span className="font-medium">Reference Materials:</span>{' '}
						{data.examplesAndRAG.uploadedFiles.length} file(s), {' '}
						{data.examplesAndRAG.selectedGalleryPresets.length} gallery preset(s)
						{data.examplesAndRAG.customExamples && ', custom examples provided'}
					</p>
				</div>
			</div>
		</div>
	);
}
