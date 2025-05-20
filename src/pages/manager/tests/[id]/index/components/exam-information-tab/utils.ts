/**
 * Utility functions for formatting dates and time
 */

/**
 * Formats a date string into a user-friendly format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return `${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
};

/**
 * Formats seconds into minutes and seconds
 * @param seconds - Total seconds
 * @returns Formatted time string
 */
export const formatTime = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}m ${remainingSeconds}s`;
};
