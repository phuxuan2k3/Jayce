import { useState, useCallback } from "react";
import { StyleRefinementData, ValidationErrors } from "../types";

export type { ValidationErrors };

export const useStep3Validation = () => {
	const [errors, setErrors] = useState<ValidationErrors>({});

	const validateStep = useCallback((data: StyleRefinementData): boolean => {
		const newErrors: ValidationErrors = {};

		// Expert Persona validation
		if (!data.expertPersona.type) {
			newErrors.expertPersona = { type: 'Expert persona selection is required' };
		} else if (data.expertPersona.type === 'custom' && !data.expertPersona.customDescription.trim()) {
			newErrors.expertPersona = { customDescription: 'Custom description is required when using custom persona' };
		}

		// Sampling Settings validation
		const samplingErrors: { temperature?: string; selfConsistencyRuns?: string } = {};

		if (data.samplingSettings.temperature < 0.2 || data.samplingSettings.temperature > 1.0) {
			samplingErrors.temperature = 'Temperature must be between 0.2 and 1.0';
		}

		if (data.samplingSettings.selfConsistencyRuns < 1 || data.samplingSettings.selfConsistencyRuns > 5) {
			samplingErrors.selfConsistencyRuns = 'Self-consistency runs must be between 1 and 5';
		}

		if (Object.keys(samplingErrors).length > 0) {
			newErrors.samplingSettings = samplingErrors;
		}

		// Examples & RAG validation (mostly optional, but basic validation)
		const examplesErrors: { uploadedFiles?: string; customExamples?: string; selectedGalleryPresets?: string } = {};

		// All fields are optional, so no strict validation needed
		// Could add file size validation or other constraints here if needed

		if (Object.keys(examplesErrors).length > 0) {
			newErrors.examplesAndRAG = examplesErrors;
		}

		setErrors(newErrors);

		// Step is valid if there are no errors
		const isValid = Object.keys(newErrors).length === 0;
		return isValid;
	}, []);
	const validateField = useCallback((_field: keyof ValidationErrors, _value: any): string | undefined => {
		// Individual field validation can be implemented here if needed
		return undefined;
	}, []);

	const clearFieldError = useCallback((field: keyof ValidationErrors) => {
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: undefined }));
		}
	}, [errors]);

	return {
		errors,
		validateStep,
		validateField,
		clearFieldError
	};
};
