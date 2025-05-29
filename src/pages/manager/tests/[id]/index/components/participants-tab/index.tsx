import ParticipantsList from './components/ParticipantsList'

export default function ParticipantsTab() {
	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">Participants</h2>
			<div className='flex flex-col items-center justify-center'>
				<ParticipantsList />

			</div>
		</div>
	)
}
