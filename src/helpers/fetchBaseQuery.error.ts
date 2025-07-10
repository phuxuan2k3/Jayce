import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
function isFetchBaseQueryError(
	error: unknown,
): error is FetchBaseQueryError {
	return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
function isErrorWithMessage(
	error: unknown,
): error is { message: string } {
	return (
		typeof error === 'object' &&
		error != null &&
		'message' in error &&
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		typeof (error as any).message === 'string'
	)
}

export function parseQueryError(error: FetchBaseQueryError | SerializedError | undefined | unknown): string | null {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === 'string') {
		return error;
	}
	if (error) {
		if (isFetchBaseQueryError(error)) {
			// The request couldn't reach the server (e.g., the server is down, DNS issues, etc.). 
			// The request timed out or encountered a network error(e.g., no internet connection).
			if (error.status === "FETCH_ERROR") {
				return 'Cannot connect to the server.';
			}
			else if (error.status === "TIMEOUT_ERROR") {
				return 'The request timed out. Please try again later.';
			}
			else if (error.status === 401) {
				return 'Unauthorized';
			}
			else if (error.status === 500) {
				let message = "Unknown error";
				const data = error.data as any;
				if ("message" in data) {
					message = data.message;
				}
				return 'Error: ' + message;
			}
			else if (error.status === 400) {
				let message = "Unknown error";
				const data = error.data as any;
				if ("message" in data) {
					message = data.message;
				}
				return message;
			}
			return 'error' in error ? error.error : JSON.stringify(error.data)
		} else if (isErrorWithMessage(error)) {
			return error.message
		}
		return 'An error occurred'
	}
	return null;
}


export type QueryStatus = "FETCH_ERROR" | "TIMEOUT_ERROR" | "UNAUTHORIZED" | "SERVER_ERROR" | "BAD_REQUEST" | "PAYMENT_REQUIRED" | "UNKNOWN_ERROR";

export function parseQueryStatus(error: FetchBaseQueryError | SerializedError | undefined): QueryStatus {
	if (isFetchBaseQueryError(error)) {
		if (error.status === "FETCH_ERROR") {
			return 'FETCH_ERROR';
		}
		else if (error.status === "TIMEOUT_ERROR") {
			return 'TIMEOUT_ERROR';
		}
		else if (error.status === 401) {
			return 'UNAUTHORIZED';
		}
		else if (error.status === 500) {
			return 'SERVER_ERROR';
		}
		else if (error.status === 400) {
			return 'BAD_REQUEST';
		}
		else if (error.status === 402) {
			return 'PAYMENT_REQUIRED';
		}
		return 'UNKNOWN_ERROR';
	} else if (isErrorWithMessage(error)) {
		return "BAD_REQUEST";
	}
	else {
		return "UNKNOWN_ERROR";
	}
}