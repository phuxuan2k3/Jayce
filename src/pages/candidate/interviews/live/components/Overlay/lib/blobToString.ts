export function blobToString(blob: Blob): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result as string);
		};
		reader.onerror = () => {
			reject(new Error("Failed to read blob as string"));
		};
		reader.readAsDataURL(blob);
	});
}

