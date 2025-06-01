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
