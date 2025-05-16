import { useState } from "react";
import { useGetTemplatesQuery } from "../../api/test.api-gen";

type QueryFilters = {
	searchName: string;
	page: number;
};

export default function useTemplateServerQuery() {
	const [filters, setFilters] = useState<QueryFilters>({
		searchName: "",
		page: 1,
	});

	const state = useGetTemplatesQuery({
		perPage: 10,
		...filters,
	});

	const data: typeof state.data = state.data ? state.data : {
		page: 1,
		totalPages: 1,
		perPage: 10,
		total: 0,
		data: [],
	};

	return {
		filters,
		setFilters,
		state,
		data,
	};
}