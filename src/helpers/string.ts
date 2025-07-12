
/**
 * Sometimes, MCQ options may have an option label that needs to be removed.
 * @param option - The option string from which to remove the optional label.
 * @returns The option string with the optional label removed.
 */
export function mcqOptionsRemoveOptionalLabel(option: string) {
	// Remove starting label (A-Z or a-z followed by dot and space) only at the start
	return option.replace(/^[A-Za-z]\.\s/, '');
}