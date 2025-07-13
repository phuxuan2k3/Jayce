import { useLanguage } from '../../../../LanguageProvider';
import { Metadata2 } from '../../../auth/types/auth'

export default function ParticipantDetailCard({
	metadata,
}: {
	metadata: Metadata2;
}) {
	const { t } = useLanguage();

	return (
		<div className='rounded-lg px-6 py-8 bg-primary-toned-50 shadow-md max-h-full overflow-y-auto'>
			<h3 className="text-xl font-semibold mb-3">{t("participant_detail_title")}</h3>
			<hr className="mb-4" />
			<div className='grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-primary-toned-600 
			[&>*:nth-child(odd)]:font-bold 
			[&>*:nth-child(odd)]:text-primary-toned-700
			[&>*:nth-child(even)]:text-right
			'>
				{metadata.fullname && (
					<>
						<span>{t("fullname")}:</span>
						<span>{metadata.fullname}</span>
					</>
				)}

				{metadata.jobTitle && (
					<>
						<span>{t("job_title")}:</span>
						<span>{metadata.jobTitle}</span>
					</>
				)}

				{metadata.company && (
					<>
						<span>{t("company")}:</span>
						<span>{metadata.company}</span>
					</>
				)}

				{metadata.country && (
					<>
						<span>{t("country")}:</span>
						<span>{metadata.country}</span>
					</>
				)}

				{metadata.gender && (
					<>
						<span>{t("gender")}:</span>
						<span>{metadata.gender}</span>
					</>
				)}

				{metadata.birthday && (
					<>
						<span>{t("birthday")}:</span>
						<span>{metadata.birthday}</span>
					</>
				)}

				{metadata.education && (
					<>
						<span>{t("education")}:</span>
						<span>{metadata.education}</span>
					</>
				)}

				{metadata.website && (
					<>
						<span>{t("website")}:</span>
						<span>{metadata.website}</span>
					</>
				)}

				{metadata.linkedIn && (
					<>
						<span>{t("linkedin")}:</span>
						<span>{metadata.linkedIn}</span>
					</>
				)}

				{metadata.summary && (
					<>
						<span>{t("summary")}:</span>
						<span className="text-left col-span-2 mt-2 pt-2 border-t border-primary-toned-200">
							{metadata.summary}
						</span>
					</>
				)}
			</div>
		</div>
	)
}
