import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faClipboardList, faClock, faGlobe,
	faKey, faCalendarAlt, faDoorOpen, faUsers, faEye, faUserLock, faLockOpen, faLock, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../utils';
import { TestFullSchema } from '../../../../../../../../features/tests/api/test.api-gen-v2';
import MyItemCardTemplate from '../../../../../../../../features/tests/ui-templates/MyItemCardTemplate';
import { useLanguage } from '../../../../../../../../LanguageProvider';

export const ExamDetails = ({
	exam
}: {
	exam: TestFullSchema;
}) => {
	const { t } = useLanguage();

	if (exam.mode !== "EXAM" || exam._detail.mode !== "EXAM") return null;
	const detail = exam._detail;

	return (
		<div className="flex flex-col md:flex-row gap-8 w-full">
			<div className="flex-1 min-w-[280px]">
				<MyItemCardTemplate
					header={t("exam_details_config_title")}
					icon={<FontAwesomeIcon icon={faClipboardList} className="text-primary mr-3" />}
					body={
						<div className="flex flex-col gap-4">
							<div className="flex items-center">
								<FontAwesomeIcon icon={faGlobe} className="text-primary w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">{t("exam_details_language")}:</p>
									<p className="font-semibold">{exam.language}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faClock} className="text-primary w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">{t("exam_details_duration")}:</p>
									<p className="font-semibold">{exam.minutesToAnswer} {t("exam_details_duration_unit")}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faUserLock} className="text-primary w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">{t("exam_details_attempts_allowed")}:</p>
									<p className="font-semibold">{detail.numberOfAttemptsAllowed === undefined || detail.numberOfAttemptsAllowed === 0 ? t("exam_details_unlimited") : detail.numberOfAttemptsAllowed}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faUsers} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">{t("exam_details_participants_allowed")}:</p>
									<p className="font-semibold">{detail.numberOfParticipants === undefined || detail.numberOfParticipants === 0 ? t("exam_details_unlimited") : detail.numberOfParticipants}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faEye} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">{t("exam_details_answer_visible")}:</p>
									<p className="font-semibold">{detail.isAnswerVisible ? t("yes") : t("no")}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faCheck} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">{t("exam_details_see_other_results")}:</p>
									<p className="font-semibold">{detail.isAllowedToSeeOtherResults ? t("allowed") : t("not_allowed")}</p>
								</div>
							</div>
						</div>
					}
				/>
			</div>
			<div className="flex-1 min-w-[280px]">
				<MyItemCardTemplate
					header={t("exam_details_access_title")}
					icon={<FontAwesomeIcon icon={faClipboardList} className="text-primary mr-3" />}
					body={
						<div className="flex flex-col gap-4">
							<div className="flex items-center">
								<FontAwesomeIcon icon={faDoorOpen} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">{t("exam_details_room_id")}:</p>
									<p className="font-semibold">{detail.roomId}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={faKey} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">{t("exam_details_password")}:</p>
									<p className="font-semibold">{detail.hasPassword ? t("required") : t("not_required")}</p>
								</div>
							</div>
							{detail.openDate && (
								<div className="flex items-center">
									<FontAwesomeIcon icon={faCalendarAlt} className="text-primary-toned-500 w-4 mr-4" />
									<div>
										<p className="text-sm text-gray-500">{t("exam_details_open_date")}:</p>
										<p className="font-semibold">{formatDate(detail.openDate)}</p>
									</div>
								</div>
							)}
							{detail.closeDate && (
								<div className="flex items-center">
									<FontAwesomeIcon icon={faCalendarAlt} className="text-primary-toned-500 w-4 mr-4" />
									<div>
										<p className="text-sm text-gray-500">{t("exam_details_close_date")}:</p>
										<p className="font-semibold">{formatDate(detail.closeDate)}</p>
									</div>
								</div>
							)}
							<div className="flex items-center">
								<FontAwesomeIcon icon={faUsers} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">{t("exam_details_participants_joined")}:</p>
									<p className="font-semibold">{detail.participants.length}</p>
								</div>
							</div>
							<div className="flex items-center">
								<FontAwesomeIcon icon={detail.isPublic ? faLockOpen : faLock} className="text-primary-toned-500 w-4 mr-4" />
								<div>
									<p className="text-sm text-gray-500">{t("exam_details_visibility")}:</p>
									<p className="font-semibold">{detail.isPublic ? t("public") : t("private")}</p>
								</div>
							</div>
						</div>
					}
				/>
			</div>
		</div>
	);
};
