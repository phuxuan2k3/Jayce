import { useState } from 'react';
import { mockAttempts } from '../../../../../../../infra-test/mocks/mockAttempts'
import ParticipantDetails from './components/ParticipantDetails'
import ParticipantsList from './components/ParticipantsList'
import { mockParticipants } from './mocks/mockParticipants'

export default function ParticipantsTab() {
	const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

	const handleParticipantSelect = (candidateId: string) => {
		setSelectedCandidateId(candidateId);
	}

	return (
		<div className='flex flex-col items-center justify-center'>
			{selectedCandidateId == null ? (
				<ParticipantsList
					onParticipantSelect={handleParticipantSelect}
					participants={mockParticipants}
				/>
			) : (
				<ParticipantDetails
					participant={mockParticipants[0]}
					attempts={mockAttempts}
					onBack={() => setSelectedCandidateId(null)}
				/>
			)}
		</div>
	)
}
