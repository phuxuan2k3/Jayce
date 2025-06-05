import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClipboardList, faClock, faGlobe,
	faKey, faCalendarAlt, faDoorOpen
} from '@fortawesome/free-solid-svg-icons';
import { ExamCore } from '../../../../../../../infra-test/core/test.model';
import { formatDate } from './utils';
import Card from './Card';

interface ExamDetailsProps {
	exam: ExamCore;
}

export const ExamDetails = ({ exam }: ExamDetailsProps) => {
	return (
		<Card
			header='Exam Details'
			icon={<FontAwesomeIcon icon={faClipboardList} className="text-primary mr-3" />}
			body={
				<div className="flex flex-col gap-4">
					<div className="flex items-center">
						<FontAwesomeIcon icon={faGlobe} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Language:</p>
							<p className="font-semibold">{exam.language}</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faClock} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Duration:</p>
							<p className="font-semibold">{exam.minutesToAnswer} minutes</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faDoorOpen} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Room ID:</p>
							<p className="font-semibold">{exam.roomId}</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faKey} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Password:</p>
							<p className="font-semibold">{exam.hasPassword ? "Required" : "Not Required"}</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faCalendarAlt} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">Created At:</p>
							<p className="font-semibold">{formatDate(exam.createdAt)}</p>
						</div>
					</div>
				</div>
			}
		/>
	);
};
