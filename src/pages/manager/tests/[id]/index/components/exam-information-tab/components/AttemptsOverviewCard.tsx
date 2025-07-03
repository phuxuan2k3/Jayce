import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faTrophy, faHourglassHalf, faUsers } from '@fortawesome/free-solid-svg-icons';
import { formatTime } from '../utils';
import MyItemCardTemplate from '../../../../../../../../features/tests/ui-templates/MyItemCardTemplate';

export const AttemptsOverviewCard = ({
	totalAttempts,
	averageScore,
	highestScore,
	lowestScore,
	averageTime,
	totalCandidates,
}: {
	totalAttempts: number;
	averageScore: number;
	highestScore: number;
	lowestScore: number;
	averageTime: number;
	totalCandidates: number;
}) => {
	return (
		<MyItemCardTemplate
			header='Attempts Overview'
			icon={<FontAwesomeIcon icon={faChartBar} className="text-primary mr-3" />}
			body={
				<div className="flex flex-col gap-4">
					<div className="flex items-center">
						<FontAwesomeIcon icon={faUsers} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Total Candidates:</p>
							<p className="font-semibold">{totalCandidates}</p>
						</div>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faChartBar} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Total Attempts:</p>
							<p className="font-semibold">{totalAttempts}</p>
						</div>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faTrophy} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Highest Score:</p>
							<p className="font-semibold">{highestScore.toFixed(2)}%</p>
						</div>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faChartBar} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Average Score:</p>
							<p className="font-semibold">{averageScore.toFixed(2)}%</p>
						</div>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faChartBar} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Lowest Score:</p>
							<p className="font-semibold">{lowestScore.toFixed(2)}%</p>
						</div>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faHourglassHalf} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Average Time:</p>
							<p className="font-semibold">{formatTime(averageTime)}</p>
						</div>
					</div>
				</div>
			}
		/>
	);
};