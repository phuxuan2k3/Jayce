export function arrayPagination<T>(array: T[], page: number, perPage: number): {
	data: T[];
	totalPages: number;
	page: number;
	perPage: number;
	total: number;
} {
	const total = array.length;
	const totalPages = Math.ceil(total / perPage);
	const startIndex = (page - 1) * perPage;
	const endIndex = startIndex + perPage;

	return {
		data: array.slice(startIndex, endIndex),
		totalPages,
		page,
		perPage,
		total
	};
}