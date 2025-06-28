export type QueryBoolean = "0" | "1" | undefined;
export type QuerySortValues = "asc" | "desc" | undefined;
export type PagingFilter = {
	page: number;
	perPage: number;
};

export function toggleQueryBoolean(value: QueryBoolean): QueryBoolean {
	if (value === "1") return "0";
	if (value === "0") return "1";
	return undefined;
}

export class QueryUtils {
	static toggleBoolean(value: QueryBoolean): QueryBoolean {
		return toggleQueryBoolean(value);
	}
	static toBoolean(value: QueryBoolean): boolean | undefined {
		if (value === "1") return true;
		if (value === "0") return false;
		return undefined;
	}
	static fromBoolean(value: boolean | undefined): QueryBoolean {
		if (value === true) return "1";
		if (value === false) return "0";
		return undefined;
	}
	static toggleSort(value: QuerySortValues): QuerySortValues {
		if (value === "asc") return "desc";
		if (value === "desc") return "asc";
		return undefined;
	}
}
