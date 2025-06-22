import { useMemo } from "react";
import { useGetUsersQuery } from "../../../../../../../../features/auth/api/auth-profile.api";
import { useGetExamsByTestIdParticipantsAggregateQuery } from "../../../../../../../../infra-test/api/test.api-gen";
import { Filter, Participant } from "../type";
import { getUserCore } from "../../../../../../../../infra-test/core/user.model";

export default function useParticipantsTabData({
	testId,
	filter,
}: {
	testId: string;
	filter: Filter;
}): {
	participants: Participant[];
	totalPages: number;
} {
	const { page, perPage } = filter;
	const participantsAggregateQuery = useGetExamsByTestIdParticipantsAggregateQuery({
		testId,
		page,
		perPage,
	});
	const usersQuery = useGetUsersQuery({
		user_ids: participantsAggregateQuery.data?.data.map(p => p.candidateId) || [],
	}, {
		skip: !participantsAggregateQuery.data?.data,
	});

	const participants: Participant[] = useMemo(() => {
		if (!participantsAggregateQuery.data || !usersQuery.data) {
			return [];
		}
		return participantsAggregateQuery.data.data.map(participantAttemptsAggregate => {
			const user = usersQuery.data?.users.find(u => u.id === participantAttemptsAggregate.candidateId);
			if (!user) {
				return null;
			}
			const userCore = getUserCore(user);
			const res: Participant = {
				user: userCore,
				attemptsAggregate: participantAttemptsAggregate,
			}
			return res;
		}).filter(p => p !== null) as Participant[];
	}, []);

	return {
		participants,
		totalPages: participantsAggregateQuery.data?.totalPages || 0,
	};
}
