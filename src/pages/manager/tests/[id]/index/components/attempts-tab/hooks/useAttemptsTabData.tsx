import { useMemo } from 'react'
import { Filter } from '../type'
import { useGetExamsByTestIdAttemptsAggregateQuery, useGetExamsByTestIdAttemptsQuery } from '../../../../../../../../infra-test/api/test.api-gen';
import { useGetUsersQuery } from '../../../../../../../../features/auth/api/auth-profile.api';
import { AttemptsTabModel, AttemptWithCandidate } from "../type";
import { getUserCore } from '../../../../../../../../infra-test/core/user.model';
import { EMPTY_ATTEMPT_AGGREGATE } from '../../../../../../../../infra-test/core/attempt.model';

export default function useAttemptsTabData(testId: string, filter: Filter) {
	const examAttemptsQuery = useGetExamsByTestIdAttemptsQuery({
		testId,
		page: filter.page,
		perPage: filter.perPage,
		sort: filter.sort,
	});

	const attemptsOfTestAggregate = useGetExamsByTestIdAttemptsAggregateQuery({ testId });

	const usersQuery = useGetUsersQuery({
		user_ids: examAttemptsQuery.data?.data.map(att => att.candidateId) || []
	}, {
		skip: examAttemptsQuery.data == null || examAttemptsQuery.data.data.length === 0,
	});

	const attemptsWithCandidates: AttemptWithCandidate[] = useMemo(() => {
		if (!examAttemptsQuery.data || !usersQuery.data) return [];
		return examAttemptsQuery.data.data.map(attempt => {
			const user = usersQuery.data?.users.find(user => user.id === attempt.candidateId);
			if (!user) return null;
			const candidate = getUserCore(user);
			return {
				attempt: attempt,
				candidate: candidate,
			}
		}).filter(item => item !== null) as AttemptWithCandidate[];
	}, [examAttemptsQuery.data, usersQuery.data]);

	const isLoading = examAttemptsQuery.isLoading || attemptsOfTestAggregate.isLoading || usersQuery.isLoading;
	const error = examAttemptsQuery.error || attemptsOfTestAggregate.error || usersQuery.error;

	const hasNoData = examAttemptsQuery.data == null &&
		attemptsOfTestAggregate.data == null &&
		usersQuery.data == null;

	const totalPages = examAttemptsQuery.data?.totalPages ?? 1;

	const model: AttemptsTabModel = {
		attempsOfTestAggregate: attemptsOfTestAggregate.data || EMPTY_ATTEMPT_AGGREGATE,
		attemptsWithCandidates: attemptsWithCandidates,
	};

	return {
		model,
		isLoading,
		error,
		hasNoData,
		totalPages,
	};
}
