import { UserInfo } from "../store/authSlice";


export type EditAbleUserInfo = Pick<UserInfo, "email" | "username" | "avatarPath">;
