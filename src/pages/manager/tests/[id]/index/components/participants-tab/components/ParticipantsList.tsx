import ParticipantCard from './ParticipantCard'
import { Participant } from '../type';
import MyPagination from '../../../../../../../../components/ui/common/MyPagination';

export default function ParticipantsList({
	participants,
	onParticipantSelect,
	totalPages,
	page,
	onPageChange,
}: {
	participants: Participant[];
	onParticipantSelect: (candidateId: string) => void;
	totalPages: number;
	page: number;
	onPageChange: (page: number) => void;
}) {
	return (
		<div className="space-y-4">
			<div className="mb-6">
				<h2 className="text-2xl font-bold text-gray-800">Test Participants</h2>
				<p className="text-gray-600 mt-1">
					View participant profiles and their test performance statistics
				</p>
			</div>

			{participants.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">No participants found for this test.</p>
				</div>
			) : (
				<>
					<div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
						{participants.map((participant) => (
							<div
								key={participant.user.id}
								className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
								onClick={() => onParticipantSelect(participant.user.id)}
							>
								<ParticipantCard
									user={participant.user}
									highestScore={participant.attemptsAggregate.highestScore}
									totalAttempts={participant.attemptsAggregate.totalAttempts}
									rank={participant.attemptsAggregate.rank}
								/>
							</div>
						))}
					</div>

					<MyPagination
						totalPage={totalPages}
						initialPage={page}
						onPageChange={onPageChange}
					/>
				</>
			)}
		</div>
	)
}
