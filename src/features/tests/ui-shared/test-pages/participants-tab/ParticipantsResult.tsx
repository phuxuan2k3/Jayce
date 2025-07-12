import { ArrowLeft } from "lucide-react";
import ParticipantStatisticCard from "./ParticipantStatistic";
import { ParticipantUser } from "./type";
import MyButton from "../../../ui/buttons/MyButton";
import MyTabs from "../../../ui/MyTabs";
import ParticipantCard from "../../../ui-items/user/ParticipantCard";
import ParticipantAttempts from "./ParticipantAttempts";
import { AttemptCoreSchema } from "../../../api/test.api-gen-v2";
import ParticipantDetailCard from "../../../ui-items/user/ParticipantDetailCard";

export default function ParticipantsResult({
	participantUser: { user, participant },
	onBack,
	onAttemptClick,
}: {
	participantUser: ParticipantUser;
	onBack: () => void;
	onAttemptClick: (attempt: AttemptCoreSchema) => void;
}) {
	return (
		<div className='flex flex-col gap-4 h-full'>
			<div className='flex items-center justify-between'>
				<MyButton
					variant={"outline"}
					onClick={onBack}
					size={"medium"}
				>
					<ArrowLeft className="w-4 h-4" />
					<span>Back</span>
				</MyButton>
			</div>

			<ParticipantCard user={user} participant={participant} />

			<MyTabs
				tabs={[
					{
						label: "Attempts",
						id: "attempts",
						content: <ParticipantAttempts
							candidateId={participant.candidateId}
							onAttemptClick={onAttemptClick}
						/>
					},
					{
						label: "Statistic",
						id: "statistic",
						content: <ParticipantStatisticCard
							participant={participant}
						/>
					},
					{
						label: "Details",
						id: "details",
						content: <ParticipantDetailCard
							metadata={user.metadata}
						/>

					}
				]}>
			</MyTabs>
		</div>
	);
}
