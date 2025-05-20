import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCalendarCheck, faCalendarAlt, faCalendarTimes,
	faEye, faEyeSlash, faUsers, faRepeat
} from '@fortawesome/free-solid-svg-icons';
import { ExamCore } from '../../../../../../../features/tests/model/test.model';
import { formatDate } from './utils';
import Card from './Card';

interface ScheduleAccessProps {
	exam: ExamCore;
}

export const ScheduleAccess = ({ exam }: ScheduleAccessProps) => {
	return (
		<Card
			header='Schedule & Access'
			icon={<FontAwesomeIcon icon={faCalendarCheck} className="text-primary mr-3" />}
			body={
				<div className="flex flex-col gap-4">
					<div className="flex items-center">
						<FontAwesomeIcon icon={faCalendarAlt} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Open Date:</p>
							<p className="font-semibold">{formatDate(exam.openDate)}</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faCalendarTimes} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Close Date:</p>
							<p className="font-semibold">{formatDate(exam.closeDate)}</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faRepeat} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Attempts Allowed:</p>
							<p className="font-semibold">{exam.numberOfAttemptsAllowed}</p>
						</div>
					</div>

					<div className="flex items-center">
						{exam.isAnswerVisible ?
							<FontAwesomeIcon icon={faEye} className="text-primary-toned-500 w-4 mr-4" /> :
							<FontAwesomeIcon icon={faEyeSlash} className="text-primary-toned-500 w-4 mr-4" />
						}
						<div>
							<p className="text-sm text-gray-500">Answers Visible:</p>
							<p className="font-semibold">{exam.isAnswerVisible ? "Yes" : "No"}</p>
						</div>
					</div>

					<div className="flex items-center">
						{exam.isAllowedToSeeOtherResults ?
							<FontAwesomeIcon icon={faUsers} className="text-primary-toned-500 w-4 mr-4" /> :
							<FontAwesomeIcon icon={faEyeSlash} className="text-primary-toned-500 w-4 mr-4" />
						}
						<div>
							<p className="text-sm text-gray-500">View Others' Results:</p>
							<p className="font-semibold">{exam.isAllowedToSeeOtherResults ? "Yes" : "No"}</p>
						</div>
					</div>
				</div>
			}
		/>
	);
};
