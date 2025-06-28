import { useGetUsersQuery } from "../../../features/auth/api/auth-profile.api";
import { UserInfo } from "../../../features/auth/store/authSlice";
import { CandidateCoreSchema } from "../../api/test.api-gen-v2";
import FetchStateCover2 from "../../ui/fetch-states/FetchStateCover2";
import ParticipantsTable from "../../ui-items/user/ParticipantsTable";

export default function ParticipantsList({
	participants,
	onParticipantClicked,
}: {
	participants: CandidateCoreSchema[];
	onParticipantClicked: ({
		user,
		participant,
	}: {
		user: UserInfo;
		participant: CandidateCoreSchema;
	}) => void;

}) {
	const usersQuery = useGetUsersQuery({
		user_ids: participants.map((p) => p.candidateId),
	});

	return (
		<FetchStateCover2
			fetchState={usersQuery}
			dataComponent={(users) => (
				<ParticipantsTable
					participants={participants}
					users={users.users}
					onItemClicked={onParticipantClicked}
				/>
			)}
		/>
	)
}
