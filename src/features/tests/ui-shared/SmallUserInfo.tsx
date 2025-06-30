import { useGetUsersQuery } from "../../auth/api/auth-profile.api";
import FetchStateCover2 from "../ui/fetch-states/FetchStateCover2";

export function SmallUserInfo({ userId }: { userId: string; }) {
	const userQuery = useGetUsersQuery({ user_ids: [userId] });

	return (
		<FetchStateCover2
			fetchState={userQuery}
			loadingComponent={<div className="flex items-center gap-2 mt-2">
				<div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full" />
				<div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
			</div>}
			dataComponent={(user) => (
				<div className="flex items-center gap-2 mt-2">
					<img
						src={user.users.at(0)?.avatarPath || "/avatar/default.png"}
						alt={user.users.at(0)?.metadata.fullname || "Unknown Author"}
						className="w-8 h-8 rounded-full" />
					<span className="text-sm font-semibold font-arya text-primary-toned-700">
						{user.users.at(0)?.metadata.fullname || "Unknown Author"}
					</span>
				</div>
			)} />
	);
}
