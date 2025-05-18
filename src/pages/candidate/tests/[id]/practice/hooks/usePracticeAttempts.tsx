import { useState } from 'react'
import useGetTestIdParams from '../../../../../../features/tests/hooks/useGetTestIdParams';
import { useGetPracticesByTestIdAttemptsQuery } from '../../common/apis/attempts.api-enhance';

type Filter = {
	page: number;
	perPage: number;
	sort: string;
}

export default function usePracticeAttempts() {
	const testId = useGetTestIdParams();
	const [filter, setFilter] = useState<Filter>({
		sort: '-createdAt',
		page: 1,
		perPage: 10,
	});

	const { data, isLoading } = useGetPracticesByTestIdAttemptsQuery({
		...filter,
		testId,
	});

	return {
		totalPages: data?.totalPages || 0,
		attempts: data?.data,
		isLoading,
		filter,
		setFilter,
	}
}
