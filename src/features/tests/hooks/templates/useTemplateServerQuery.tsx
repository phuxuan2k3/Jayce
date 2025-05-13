import { useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { authSelectors } from "../../../auth/store/authSlice";
import { useGetTemplatesQuery } from "../../api/test.api-gen";

type QueryFilters = {
	searchName: string;
	page: number;
};

export default function useTemplateServerQuery() {
	const userId = useAppSelector(authSelectors.selectUserId);
	const [filters, setFilters] = useState<QueryFilters>({
		searchName: "",
		page: 1,
	});

	const state = useGetTemplatesQuery({
		userId: userId || "",
		perPage: 10,
		...filters,
	}, {
		skip: !userId,
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