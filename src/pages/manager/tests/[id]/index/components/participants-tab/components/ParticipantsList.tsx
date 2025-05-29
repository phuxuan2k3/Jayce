import ParticipantCard from './ParticipantCard'
import { mockParticipants } from '../mocks/mockParticipants';
import { mockCandidates } from '../../../../../../../../infra-test/mocks/mockUsers';
import { mockAttetmptsOfCandidateInTestAggregate } from '../../../../../../../../infra-test/mocks/mockAttempts';

export default function ParticipantsList() {
	const candidates = mockCandidates;
	const candidateAttemptsAggregates = mockAttetmptsOfCandidateInTestAggregate;


	return (
		<div className="space-y-4">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-800">Test Participants</h2>
				<p className="text-gray-600 mt-1">
					View participant profiles and their test performance statistics
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
				{mockParticipants.map((participant) => (
					<ParticipantCard
						key={participant.user.id}
						user={participant.user}
						highestScore={participant.userAttemptsAggregate.highestScore}
						totalAttempts={participant.userAttemptsAggregate.totalAttempts}
						rank={participant.userAttemptsAggregate.rank}
					/>
				))}
			</div>

			{mockParticipants.length === 0 && (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">No participants found for this test.</p>
				</div>
			)}
		</div>
	)
}
