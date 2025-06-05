import { useState } from "react";
import { PracticeCore } from "../../../../../infra-test/core/test.model";
import { useGetPracticesQuery } from "../../../../../features/tests/api/test.api-gen";

export default function useTestsPage() {
	const [filters, setFilters] = useState({
		searchTitle: "",
		page: 1,
	});

	const state = useGetPracticesQuery({
		...filters,
		perPage: 10,
	});

	const paging: typeof state.data = state.data || {
		page: 1,
		totalPages: 1,
		total: 0,
		perPage: 10,
		data: [],
	};

	const data: PracticeCore[] = state.data?.data.map(test => ({
		...test,
	})) || [];

	return {
		state,
		totalPages: paging.totalPages,
		total: paging.total,
		data,
		filters,
		setFilters,
	}
}