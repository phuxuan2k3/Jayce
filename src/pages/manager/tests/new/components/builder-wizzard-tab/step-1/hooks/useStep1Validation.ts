import { useState, useEffect } from "react";
import { ExamConfigPersist } from "../../../../../../../../infra-test/core/test.model";

export interface ValidationErrors {
	title?: string;
	description?: string;
	language?: string;
	openDate?: string;
	closeDate?: string;
	password?: string;
}

export const useStep1Validation = (
	examConfigPersist: ExamConfigPersist,
	onValidationChange?: (isValid: boolean) => void
) => {
	const [errors, setErrors] = useState<ValidationErrors>({});

	const validateField = (field: keyof ValidationErrors, value: any): string | undefined => {
		switch (field) {
			case 'title':
				if (!value || value.trim().length === 0) {
					return 'Title is required';
				}
				if (value.trim().length < 3) {
					return 'Title must be at least 3 characters long';
				}
				break;
			case 'description':
				if (!value || value.trim().length === 0) {
					return 'Description is required';
				}
				if (value.trim().length < 10) {
					return 'Description must be at least 10 characters long';
				}
				break;
			case 'language':
				if (!value || value.trim().length === 0) {
					return 'Language selection is required';
				}
				break;
			case 'openDate':
				if (!value) {
					return 'Open date is required';
				}
				if (new Date(value) < new Date()) {
					return 'Open date cannot be in the past';
				}
				break;
			case 'closeDate':
				if (!value) {
					return 'Close date is required';
				}
				if (examConfigPersist.openDate && new Date(value) <= new Date(examConfigPersist.openDate)) {
					return 'Close date must be after open date';
				}
				break;
			case 'password':
				if (examConfigPersist.password !== null && examConfigPersist.password !== undefined) {
					if (!value || value.trim().length === 0) {
						return 'Password is required when password protection is enabled';
					}
					if (value.trim().length < 4) {
						return 'Password must be at least 4 characters long';
					}
				}
				break;
		}
		return undefined;
	};

	const validateAllFields = (): ValidationErrors => {
		const newErrors: ValidationErrors = {};

		newErrors.title = validateField('title', examConfigPersist.title);
		newErrors.description = validateField('description', examConfigPersist.description);
		newErrors.language = validateField('language', examConfigPersist.language);
		newErrors.openDate = validateField('openDate', examConfigPersist.openDate);
		newErrors.closeDate = validateField('closeDate', examConfigPersist.closeDate);
		newErrors.password = validateField('password', examConfigPersist.password);

		return newErrors;
	};

	useEffect(() => {
		const newErrors = validateAllFields();
		setErrors(newErrors);

		const isValid = Object.values(newErrors).every(error => error === undefined);
		onValidationChange?.(isValid);
	}, [
		examConfigPersist.title,
		examConfigPersist.description,
		examConfigPersist.language,
		examConfigPersist.openDate,
		examConfigPersist.closeDate,
		examConfigPersist.password
	]);

	const clearFieldError = (field: keyof ValidationErrors) => {
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: undefined }));
		}
	};

	return {
		errors,
		validateField,
		clearFieldError
	};
};
