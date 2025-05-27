import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import {
	selectWizardState,
	setExpertPersona,
	setTemperature,
	setSelfConsistencyRuns,
	setExamples,
	togglePreset
} from '../../state/wizardSlice';

// Tooltip component for help texts
const Tooltip: React.FC<{ content: string }> = ({ content }) => {
	return (
		<div className="group relative">
			<button
				type="button"
				className="text-gray-400 hover:text-gray-600 focus:outline-none"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
				</svg>
			</button>
			<div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 px-4 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10">
				{content}
				<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
			</div>
		</div>
	);
};

// Accordion component
const Accordion: React.FC<{
	title: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = false }) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className="border border-gray-200 rounded-md overflow-hidden mb-4">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 focus:outline-none"
			>
				<span className="font-medium text-gray-700">{title}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
				</svg>
			</button>
			<div
				className={`transition-max-height ease-in-out duration-300 ${isOpen
					? 'max-h-screen opacity-100 visible'
					: 'max-h-0 opacity-0 invisible'
					}`}
			>
				<div className="p-4 border-t border-gray-200">{children}</div>
			</div>
		</div>
	);
};

const StyleRefinement: React.FC = () => {
	const dispatch = useAppDispatch();
	const {
		expertPersona,
		temperature,
		selfConsistencyRuns,
		examples,
		selectedPresets
	} = useAppSelector(selectWizardState);

	// File upload handler
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setUploadedFile(file);

			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target?.result) {
					// Convert file content to string and update examples
					dispatch(setExamples(event.target.result as string));
				}
			};
			reader.readAsText(file);
		}
	};

	// Preset examples
	const presets = [
		{ id: 'react-basics', name: 'React Basics', description: 'Fundamental React concepts and patterns' },
		{ id: 'javascript-advanced', name: 'Advanced JavaScript', description: 'Closures, prototypes, and async patterns' },
		{ id: 'system-design', name: 'System Design', description: 'Architecture and scalability questions' },
		{ id: 'algorithms', name: 'Algorithms', description: 'Common coding interview questions' },
		{ id: 'behavioral', name: 'Behavioral', description: 'Soft skills and teamwork scenarios' }
	];

	return (
		<div>
			<p className="text-sm text-gray-500 mb-6">
				Fine-tune your test generation settings to match your desired expert style and complexity.
			</p>

			{/* Expert Persona */}
			<Accordion title="Expert Persona" defaultOpen={true}>
				<div className="space-y-4">
					<p className="text-sm text-gray-500">
						Choose the expertise level that matches your assessment needs.
					</p>

					<div className="flex flex-col space-y-3">
						{[
							{ id: 'Senior Architect', description: 'High-level design questions, advanced concepts, and industry best practices' },
							{ id: 'Hands-on Developer', description: 'Practical coding scenarios, implementation details, and technical problem-solving' },
							{ id: 'Beginner-Friendly', description: 'Foundational concepts, clear explanations, and gradual complexity increase' },
						].map((persona) => (
							<div key={persona.id} className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id={`persona-${persona.id}`}
										type="radio"
										name="expertPersona"
										checked={expertPersona === persona.id}
										onChange={() => dispatch(setExpertPersona(persona.id as any))}
										className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
									/>
								</div>
								<div className="ml-3 text-sm">
									<label htmlFor={`persona-${persona.id}`} className="font-medium text-gray-700 cursor-pointer">
										{persona.id}
									</label>
									<p className="text-gray-500">{persona.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</Accordion>

			{/* Sampling Settings */}
			<Accordion title="Sampling Settings" defaultOpen={false}>
				<div className="space-y-6">
					{/* Temperature slider */}
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
								Temperature
							</label>
							<Tooltip content="Controls the creativity level. Lower values make answers more focused and deterministic, higher values increase variability." />
						</div>
						<div className="flex items-center space-x-4">
							<input
								type="range"
								id="temperature"
								min="0.2"
								max="1.0"
								step="0.1"
								value={temperature}
								onChange={(e) => dispatch(setTemperature(parseFloat(e.target.value)))}
								className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
							/>
							<span className="w-12 text-center font-mono bg-gray-100 py-1 px-2 rounded-md text-sm">
								{temperature.toFixed(1)}
							</span>
						</div>
						<div className="flex justify-between text-xs text-gray-500 px-1">
							<span>More focused</span>
							<span>More creative</span>
						</div>
					</div>

					{/* Self-consistency runs */}
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<label htmlFor="consistency" className="block text-sm font-medium text-gray-700">
								Self-Consistency Runs
							</label>
							<Tooltip content="Higher values generate multiple answers per prompt and select the most consistent one. Improves quality but increases generation time." />
						</div>
						<div className="flex items-center space-x-4">
							{[1, 2, 3, 4, 5].map((value) => (
								<button
									key={value}
									type="button"
									onClick={() => dispatch(setSelfConsistencyRuns(value))}
									className={`flex-1 py-2 border ${selfConsistencyRuns === value
										? 'bg-blue-100 border-blue-500 text-blue-700'
										: 'border-gray-300 text-gray-700 hover:bg-gray-50'
										} rounded-md text-center`}
								>
									{value}
								</button>
							))}
						</div>
						<div className="flex justify-between text-xs text-gray-500 px-1">
							<span>Faster</span>
							<span>Higher quality</span>
						</div>
					</div>
				</div>
			</Accordion>

			{/* Examples & RAG */}
			<Accordion title="Examples & RAG" defaultOpen={false}>
				<div className="space-y-4">
					<p className="text-sm text-gray-500">
						Provide examples of questions and answers to guide the AI's style and format.
					</p>

					{/* File upload */}
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<label className="block text-sm font-medium text-gray-700">
								Upload Examples
							</label>
							<Tooltip content="Upload a text file containing example Q&A pairs to guide the generator." />
						</div>
						<div className="flex items-center space-x-3">
							<button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
							>
								Choose File
							</button>
							<span className="text-sm text-gray-500 truncate">
								{uploadedFile ? uploadedFile.name : 'No file chosen'}
							</span>
							<input
								ref={fileInputRef}
								type="file"
								accept=".txt,.json"
								onChange={handleFileUpload}
								className="hidden"
							/>
						</div>
					</div>

					{/* Text area for examples */}
					<div className="space-y-2">
						<label htmlFor="examples" className="block text-sm font-medium text-gray-700">
							Example Q&A Pairs
						</label>
						<textarea
							id="examples"
							rows={6}
							value={examples}
							onChange={(e) => dispatch(setExamples(e.target.value))}
							placeholder="Example:\nQ: What are React hooks?\nA: React hooks are functions that let you use state and other React features in functional components..."
							className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
						></textarea>
					</div>

					{/* Preset gallery */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Select from Example Gallery
						</label>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							{presets.map((preset) => (
								<div
									key={preset.id}
									onClick={() => dispatch(togglePreset(preset.id))}
									className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedPresets.includes(preset.id)
										? 'border-blue-500 bg-blue-50'
										: 'border-gray-200 hover:bg-gray-50'
										}`}
								>
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input
												type="checkbox"
												checked={selectedPresets.includes(preset.id)}
												onChange={() => { }}
												className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
											/>
										</div>
										<div className="ml-3 text-sm">
											<label className="font-medium text-gray-700">{preset.name}</label>
											<p className="text-gray-500">{preset.description}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</Accordion>
		</div>
	);
};

export default StyleRefinement;
