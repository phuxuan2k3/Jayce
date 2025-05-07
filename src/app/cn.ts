import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values using clsx and optimizes them using tailwind-merge.
 * This utility helps to properly merge Tailwind CSS classes with proper specificity.
 * 
 * @param inputs - Class values to be merged (strings, objects, arrays, etc.)
 * @returns - Optimized class string
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}