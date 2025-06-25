import { useState } from "react";
import ParticipantsList from "./ParticipantsList";
import ParticipantsResult from "./ParticipantsResult";

export default function ParticipantsTabContent() {
	const [currentCandidateId, setCurrentCandidateId] = useState<string | null>(null);

	return (
		<div className="border border-gray-200 rounded-lg p-4">
			<div className={`${currentCandidateId ? "hidden" : ""}`}>
				<ParticipantsList
					onParticipantClicked={(participantId) => setCurrentCandidateId(participantId)}
				/>
			</div>
			<div className={`${currentCandidateId ? "" : "hidden"}`}>
				<ParticipantsResult
					testId={testId}
					candidateId={currentCandidateId}
					onBack={() => setCurrentCandidateId(null)}
				/>
			</div>
		</div>
	)
}
