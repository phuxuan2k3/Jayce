import React from 'react'
import { UserInfo } from '../../auth/store/authSlice';

export default function useMapUsers<T extends Record<string, any>>({
	users,
	objects,
	getUserIdFromObject,
}: {
	users: UserInfo[];
	objects: T[];
	getUserIdFromObject: (object: T) => string;
}): {
	user: UserInfo;
	object: T;
}[] {
	const userMap = React.useMemo(() => {
		const map: Record<string, UserInfo> = {};
		users.forEach(user => {
			map[user.id] = user;
		});
		return map;
	}, [users]);

	const mappedUsers = React.useMemo(() => {
		return objects.map(object => {
			const userId = getUserIdFromObject(object);
			const user = userMap[userId];
			if (!user) {
				throw new Error(`User with ID ${userId} not found in the provided users list`);
			}
			return { user, object };
		});
	}, [objects, getUserIdFromObject, userMap]);

	return mappedUsers;
}
