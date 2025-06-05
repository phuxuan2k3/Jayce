import { useMemo, useState } from "react";
import { Participant } from "../type";

export default function useParticipantsList({
	participants,
}: {
	participants: Participant[];
}) {
	const [selectedParticipantId, setSelectedParticipantId] = useState<string | null>(null);

	const handleParticipantSelect = (participantId: string | null) => {
		setSelectedParticipantId(participantId);
	}

	const selectedParticipant = useMemo(() => {
		return participants.find(p => p.user.id === selectedParticipantId) || null;
	}, [participants, selectedParticipantId]);

	return {
		handleParticipantSelect,
		selectedParticipant,
	}
}
