import { useState } from 'react';
import { mockAttempts } from '../../../../../../../infra-test/mocks/mockAttempts'
import ParticipantDetails from './components/ParticipantDetails'
import ParticipantsList from './components/ParticipantsList'
import useParticipantsTabData from './hooks/useParticipantsTabData';
import { Filter } from './type';
import useParticipantsList from './hooks/useParticipantsList';

export default function ParticipantsTab({
	testId,
}: {
	testId: string;
}) {
	const [filter, setFilter] = useState<Filter>({
		page: 1,
		perPage: 10,
	});

	const {
		participants,
		totalPages,
	} = useParticipantsTabData({ testId, filter });

	const {
		handleParticipantSelect,
		selectedParticipant,
	} = useParticipantsList({ participants });

	return (
		<div className='flex flex-col items-center justify-center'>
			{selectedParticipant == null ? (
				<ParticipantsList
					onParticipantSelect={(id) => handleParticipantSelect(id)}
					participants={participants}
					totalPages={totalPages}
					onPageChange={(page) => setFilter({ ...filter, page })}
					page={filter.page}
				/>
			) : (
				<ParticipantDetails
					participant={selectedParticipant}
					attempts={mockAttempts}
					onBack={() => handleParticipantSelect(null)}
				/>
			)}
		</div>
	)
}
