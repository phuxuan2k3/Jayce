import useGetTestIdParams from '../../../../../../../../features/tests/hooks/useGetTestIdParams';
import { useGetTestsByTestIdParticipantsAndParticipantIdQuery } from '../../../../../../../../features/tests/api/test.api-gen-v2';
import FetchStateCover2 from '../../../../../../../../features/tests/ui/fetch-states/FetchStateCover2';
import { useGetUsersQuery } from '../../../../../../../../features/auth/api/auth-profile.api';
import ParticipantCard from '../../../../../../../../features/tests/ui-items/user/ParticipantCard';

export default function ParticipantInfo({
	participantId,
}: {
	participantId: string;
}) {
	const testId = useGetTestIdParams();
	const participantQuery = useGetTestsByTestIdParticipantsAndParticipantIdQuery({
		testId,
		participantId,
	});
	const userQuery = useGetUsersQuery({
		user_ids: [participantId],
	});

	return (
		<FetchStateCover2
			fetchState={participantQuery}
			loadingComponent={<div className='w-full h-32 animate-pulse bg-gray-200 rounded-lg' />}
			dataComponent={(data) => (
				<FetchStateCover2
					fetchState={userQuery}
					dataComponent={({ users }) => (
						<ParticipantCard
							participant={data}
							user={users[0]}
						/>
					)}
				/>
			)}
		/>

	)
}
