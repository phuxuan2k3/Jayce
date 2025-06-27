import { useGetUsersQuery } from '../../features/auth/api/auth-profile.api'
import FetchStateCover2 from '../ui/fetch-states/FetchStateCover2'
import { getUserCore } from '../core/user.model'
import UserCoreCard from '../ui-items/user/UserCoreCard'

export default function UserCard({
	userId,
}: {
	userId?: string
}) {
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
					<h2 className="text-lg font-semibold">Author Information</h2>
					{data.users.length > 0 && data.users[0] != null ? (
						<UserCoreCard user={getUserCore(data.users[0])} />
					) : (
						<p className="mt-2">No author information available.</p>
					)}
				</div>
			)}
		/>
	)
}
