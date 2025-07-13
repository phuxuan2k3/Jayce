import { useGetUsersQuery } from '../../auth/api/auth-profile.api'
import FetchStateCover2 from '../ui/fetch-states/FetchStateCover2'
import UserCoreCard from '../ui-items/user/UserCoreCard'
import { getUserCore } from '../../auth/types/profile'
import { useLanguage } from '../../../LanguageProvider'

export default function UserCard({
	userId,
}: {
	userId?: string
}) {
	const { t } = useLanguage();

	const userQuery = useGetUsersQuery({
		user_ids: userId ? [userId] : [],
	}, {
		skip: !userId,
	})
	return (
		<FetchStateCover2
			fetchState={userQuery}
			dataComponent={(data) => (
				<div className="p-4 bg-white rounded-lg shadow">
					<h2 className="text-lg font-semibold">{t("user_card_author_info")}</h2>
					{data.users.length > 0 && data.users[0] != null ? (
						<UserCoreCard user={getUserCore(data.users[0])} />
					) : (
						<p className="mt-2">{t("user_card_no_info")}</p>
					)}
				</div>
			)}
		/>
	)
}
