import { useState } from 'react'
import { useGetExamsByTestIdAttemptsSelfQuery } from '../../../../../../features/tests/api/test.api-gen';

type Filter = {
	page: number;
	perPage: number;
	sort: string;
}

export default function useExamSelfAttempts(testId: string) {
	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
		sort: "createdAt",
	});

	const examSelfAttemptsQuery = useGetExamsByTestIdAttemptsSelfQuery({
		testId,
		...filter,
	});

	return {
		filter,
		setFilter,
		data: {
			attempts: examSelfAttemptsQuery.data?.data,
			totalPages: examSelfAttemptsQuery.data?.totalPages || 0,
		},
		isLoading: examSelfAttemptsQuery.isLoading,
	}
}
