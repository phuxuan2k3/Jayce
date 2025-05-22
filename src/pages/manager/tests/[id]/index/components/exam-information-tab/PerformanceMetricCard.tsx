import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTrophy, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { AttemptsOfTestAggregate } from '../../../../../../../features/tests/model/attempt.model';
import { formatTime } from './utils';
import Card from './Card';

interface PerformanceMetricCardProps {
	attemptOfTestAggregate: AttemptsOfTestAggregate;
}

export const PerformanceMetricCard = ({ attemptOfTestAggregate }: PerformanceMetricCardProps) => {
	return (
		<Card
			header='Performance Metrics'
			icon={<FontAwesomeIcon icon={faStar} className="text-primary mr-3" />}
			body={
				<div className="flex flex-col gap-4">
					<div className="flex items-center">
						<FontAwesomeIcon icon={faStar} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Average Score:</p>
							<p className="font-semibold">{attemptOfTestAggregate.averageScore.toFixed(2)}%</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faTrophy} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Highest Score:</p>
							<p className="font-semibold">{attemptOfTestAggregate.highestScore.toFixed(2)}%</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faStar} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Lowest Score:</p>
							<p className="font-semibold">{attemptOfTestAggregate.lowestScore.toFixed(2)}%</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faHourglassHalf} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Average Time:</p>
							<p className="font-semibold">{formatTime(attemptOfTestAggregate.averageTime)}</p>
						</div>
					</div>
				</div>
			}
		/>
	);
};