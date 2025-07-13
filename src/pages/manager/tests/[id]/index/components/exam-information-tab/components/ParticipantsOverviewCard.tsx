import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUsers, faRepeat } from '@fortawesome/free-solid-svg-icons';
import MyItemCardTemplate from '../../../../../../../../features/tests/ui-templates/MyItemCardTemplate';
import { useLanguage } from '../../../../../../../../LanguageProvider';

export const ParticipantsOverviewCard = ({
	totalParticipants,
	totalAttempts,
}: {
	totalParticipants: number;
	totalAttempts: number;
}) => {
	const { t } = useLanguage();

	return (
		<MyItemCardTemplate
			header={t("participants_overview_title")}
			icon={<FontAwesomeIcon icon={faChartBar} className="text-primary mr-3" />}
			body={
				<div className="flex flex-col gap-4">
					<div className="flex items-center">
						<FontAwesomeIcon icon={faUsers} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">{t("participants_overview_total_participants")}:</p>
							<p className="font-semibold">{totalParticipants}</p>
						</div>
					</div>

					<div className="flex items-center">
						<FontAwesomeIcon icon={faRepeat} className="text-primary-toned-500 w-4 mr-4" />
						<div>
							<p className="text-sm text-gray-500">{t("participants_overview_total_attempts")}:</p>
							<p className="font-semibold">{totalAttempts}</p>
						</div>
					</div>
				</div>
			}
		/>
	);
};