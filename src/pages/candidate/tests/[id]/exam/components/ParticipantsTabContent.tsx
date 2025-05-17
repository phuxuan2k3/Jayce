import { useState } from "react";
import ParticipantsList from "./ParticipantsList";
import ParticipantsResult from "./ParticipantsResult";

export default function ParticipantsTabContent({
	isAllowedToSeeOtherResults,
	testId,
}: {
	isAllowedToSeeOtherResults: boolean;
	testId: string;
}) {
	const [currentCandidateId, setCurrentCandidateId] = useState<string | null>(null);


	if (!isAllowedToSeeOtherResults) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-gray-500">You are not allowed to see other results.</p>
			</div>
		);
	}

	return (
		<div className="border border-gray-200 rounded-lg p-4">
			<ParticipantsList
				testId={testId}
				onParticipantClicked={(participantId) => {
					setCurrentCandidateId(participantId);
				}}
			/>

			<ParticipantsResult
				testId={testId}
				candidateId={currentCandidateId}
				onBack={() => setCurrentCandidateId(null)}
			/>
		</div>
	)
}
