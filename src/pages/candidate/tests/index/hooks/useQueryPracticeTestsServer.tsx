import { useState } from "react";
import { useGetPracticeTestsQuery } from "../../../../../features/tests/api/test.api-gen";
import { useAppSelector } from "../../../../../app/hooks";
import { authSelectors } from "../../../../../features/auth/store/authSlice";
import { TestPracticeCore } from "../../../../../features/tests/model/test.model";

export default function useTestServerState() {
	const user = useAppSelector(authSelectors.selectUserInfo);
	const [filters, setFilters] = useState({
		searchTitle: "",
		page: 1,
	});

	const state = useGetPracticeTestsQuery({
		...filters,
		...(user && {
			authorId: user?.id,
		}),
		perPage: 10,
	}, {
		skip: !user,
	});

	const paging: typeof state.data = state.data || {
		page: 1,
		totalPages: 1,
		total: 0,
		perPage: 10,
		data: [],
	};

	const data: TestPracticeCore[] = state.data?.data.map(test => ({
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