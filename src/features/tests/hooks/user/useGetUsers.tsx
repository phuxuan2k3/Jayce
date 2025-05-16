import { useGetUsersQuery } from "../../../auth/api/auth-profile.api";

export default function useGetUsers(userIds?: string[]) {
	const parseUserIds = (ids: string[]) => ids.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
	const parsedUserIds = parseUserIds(userIds || []);

	const { data } = useGetUsersQuery({ user_ids: parsedUserIds || [] }, {
		skip: userIds == null || userIds.length === 0,
		selectFromResult: ({ data, ...rest }) => ({
			data: data?.users || [],
			...rest,
		}),
	});

	return { users: data };
}