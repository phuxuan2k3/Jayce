export type Paged<T> = {
	data: T[];
	page: number;
	totalPage: number;
	perPage: number;
}

export type PagedFilter = {
	page: number;
	perPage: number;
}

export type QuerySortValues = "asc" | "desc" | undefined;