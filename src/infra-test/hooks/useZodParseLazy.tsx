import React from 'react'
import { z } from 'zod'

type Options<T> = {
	messageRetriver?: (error: z.ZodError<T>) => string[];
}

/**
 * This hook is a placeholder for Zod parsing logic.
 * It can be used to parse and validate data structures using Zod schemas.
 */
export default function useZodParseLazy<T>(schema: z.ZodType<T>, options?: Options<T>): {
	handleParse: (data: unknown) => T | undefined;
	errors: z.ZodError<T> | undefined;
	errorMessages: string[];
} {
	const { messageRetriver } = options || {};

	const [errors, setErrors] = React.useState<z.ZodError<T> | undefined>(undefined);
	const handleParse = React.useCallback((data: unknown): T | undefined => {
		try {
			const parsedData = schema.parse(data);
			setErrors(undefined);
			return parsedData;
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErrors(error);
			} else {
				console.error("Unexpected error during Zod parsing:", error);
			}
			return undefined;
		}
	}, [schema]);

	const errorMessages = React.useMemo(() => {
		if (!errors) return [];
		if (messageRetriver) {
			return messageRetriver(errors);
		}
		return errors.errors.map((error) => error.message);
	}, [errors, messageRetriver]);

	return {
		errors,
		errorMessages,
		handleParse,
	};
}
