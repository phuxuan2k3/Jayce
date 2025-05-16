import { useState } from 'react'
import { useGetPracticesByTestIdAttemptsQuery } from '../../../../../../../features/tests/api/test.api-gen'
import useGetTestIdParams from '../../../../../../../features/tests/hooks/useGetTestIdParams';

type Filter = {
	page: number;
	perPage: number;
	sort: string;
}

export default function useAttemptsTab() {
	const testId = useGetTestIdParams();
	const [filter, setFilter] = useState<Filter>({
		sort: '+createdAt',
		page: 1,
		perPage: 10,
	});

	const { data, isLoading } = useGetPracticesByTestIdAttemptsQuery({
		...filter,
		testId,
	});

	return {
		data,
		isLoading,
		filter,
		setFilter,
	}
}
