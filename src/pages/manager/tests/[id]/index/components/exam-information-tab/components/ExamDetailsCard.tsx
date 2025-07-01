import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClipboardList, faClock, faGlobe,
	faKey, faCalendarAlt, faDoorOpen, faUsers, faEye, faUserLock, faLockOpen, faLock, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils';
import { TestFullSchema } from '../../../../../../../../features/tests/api/test.api-gen-v2';
import MyItemCardTemplate from '../../../../../../../../features/tests/templates/MyItemCardTemplate';

export const ExamDetails = ({
	exam
}: {
	exam: TestFullSchema;
}) => {
	if (exam.mode !== "EXAM" || exam._detail.mode !== "EXAM") return null;
	const detail = exam._detail;

	return (
		<div className="flex flex-col md:flex-row gap-8 w-full">
			<div className="flex-1 min-w-[280px]">
				<MyItemCardTemplate
					header="Exam Configs"
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
								<FontAwesomeIcon icon={faUserLock} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">Attempts Allowed:</p>
									<p className="font-semibold">{detail.numberOfAttemptsAllowed === undefined ? "Unlimited" : detail.numberOfAttemptsAllowed}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faUsers} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">Participants Allowed:</p>
									<p className="font-semibold">{detail.numberOfParticipants === undefined ? "Unlimited" : detail.numberOfParticipants}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faEye} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">Answer Visible:</p>
									<p className="font-semibold">{detail.isAnswerVisible ? "Yes" : "No"}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faCheck} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">See Other Results:</p>
									<p className="font-semibold">{detail.isAllowedToSeeOtherResults ? "Allowed" : "Not Allowed"}</p>
								</div>
							</div>
						</div>
					}
				/>
			</div>
			<div className="flex-1 min-w-[280px]">
				<MyItemCardTemplate
					header="Exam Access Info"
					icon={<FontAwesomeIcon icon={faClipboardList} className="text-primary mr-3" />}
					body={
						<div className="flex flex-col gap-4">
							<div className="flex items-center">
								<FontAwesomeIcon icon={faDoorOpen} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">Room ID:</p>
									<p className="font-semibold">{detail.roomId}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faKey} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">Password:</p>
									<p className="font-semibold">{detail.hasPassword ? "Required" : "Not Required"}</p>
								</div>
							</div>
							{detail.openDate && (
								<div className="flex items-center">
									<FontAwesomeIcon icon={faCalendarAlt} className="text-primary-toned-500 w-4 mr-4" />
									<div>
										<p className="text-sm text-gray-500">Open Date:</p>
										<p className="font-semibold">{formatDate(detail.openDate)}</p>
									</div>
								</div>
							)}
							{detail.closeDate && (
								<div className="flex items-center">
									<FontAwesomeIcon icon={faCalendarAlt} className="text-primary-toned-500 w-4 mr-4" />
									<div>
										<p className="text-sm text-gray-500">Close Date:</p>
										<p className="font-semibold">{formatDate(detail.closeDate)}</p>
									</div>
								</div>
							)}
							<div className="flex items-center">
								<FontAwesomeIcon icon={faUsers} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">Participants Joined:</p>
									<p className="font-semibold">{detail.participants.length}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={detail.isPublic ? faLockOpen : faLock} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">Visibility:</p>
									<p className="font-semibold">{detail.isPublic ? "Public" : "Private"}</p>
								</div>
							</div>
						</div>
					}
				/>
			</div>
		</div>
	);
};
