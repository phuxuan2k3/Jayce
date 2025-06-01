// Types for Step 3 - Style & Refinement
export type ExpertPersonaType = 'senior-architect' | 'hands-on-developer' | 'beginner-friendly' | 'custom';

export type ExpertPersona = {
	type: ExpertPersonaType;
	customDescription: string;
};

export type SamplingSettings = {
	temperature: number; // 0.2 to 1.0
	selfConsistencyRuns: number; // 1 to 5
};

export type ExamplesAndRAG = {
	uploadedFiles: File[]; // Uploaded files
	customExamples: string; // Textarea content for custom examples
	selectedGalleryPresets: string[]; // Selected presets from gallery (array of IDs)
};

export type StyleRefinementData = {
	expertPersona: ExpertPersona;
	samplingSettings: SamplingSettings;
	examplesAndRAG: ExamplesAndRAG;
};

export type ValidationErrors = {
	expertPersona?: {
		type?: string;
		customDescription?: string;
	};
	samplingSettings?: {
		temperature?: string;
		selfConsistencyRuns?: string;
	};
	examplesAndRAG?: {
		uploadedFiles?: string;
		customExamples?: string;
		selectedGalleryPresets?: string;
	};
};
