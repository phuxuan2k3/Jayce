import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faRepeat } from '@fortawesome/free-solid-svg-icons';
import MyItemCardTemplate from '../../../../../../../../features/tests/ui-templates/MyItemCardTemplate';

export const ParticipantsOverviewCard = ({
	totalParticipants,
	totalAttempts,
}: {
	totalParticipants: number;
	totalAttempts: number;
}) => {
	return (
		<MyItemCardTemplate
			header='Participant Statistics'
			icon={<FontAwesomeIcon icon={faChartBar} className="text-primary mr-3" />}
			body={
				<div className="flex flex-col gap-4">
					<div className="flex items-center">
						<FontAwesomeIcon icon={faUsers} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Total Participants:</p>
							<p className="font-semibold">{totalParticipants}</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faRepeat} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Total Attempts:</p>
							<p className="font-semibold">{totalAttempts}</p>
						</div>
					</div>
				</div>
			}
		/>
	);
};