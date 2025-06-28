import { UserInfo } from "../store/authSlice";

export type EditAbleUserInfo = Pick<UserInfo, "email" | "username" | "avatarPath">;

export type UserCore = UserInfo & {
	fullname: string;
	avatarPath: string;
}

export function getUserCore(user: UserInfo): UserCore {
	return {
		...user,
		fullname: user.metadata?.fullname || "",
		avatarPath: user.metadata?.avatarPath || "",
	};
}

export type CandidateCore = Omit<UserCore, "role">;
export type ManagerCore = Omit<UserCore, "role">;
