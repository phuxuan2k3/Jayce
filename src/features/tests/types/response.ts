export type PagedResponse<T> = {
	total: number;
	totalPages: number;
	data: T[];
};
