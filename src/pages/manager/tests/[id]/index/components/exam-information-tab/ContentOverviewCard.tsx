import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { TestAggregateCore } from '../../../../../../../features/tests/model/test.model';
import Card from './Card';

interface ContentOverviewCardProps {
	testAggregate: TestAggregateCore;
}

export const ContentOverviewCard = ({ testAggregate }: ContentOverviewCardProps) => {
	return (
		<Card
			header='Content Overview'
			icon={<FontAwesomeIcon icon={faQuestionCircle} className="text-primary mr-3" />}
			body={
				<div className="flex flex-col gap-4">
					<div className="flex items-center">
						<FontAwesomeIcon icon={faQuestionCircle} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Number of Questions:</p>
							<p className="font-semibold">{testAggregate.numberOfQuestions}</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faBullseye} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Total Points:</p>
							<p className="font-semibold">{testAggregate.totalPoints}</p>
						</div>
					</div>
				</div>
			}
		/>
	);
};