import { UserInfo } from "../../../features/auth/store/authSlice";
import { CandidateCoreSchema } from "../../api/test.api-gen-v2";
import { UserCore } from "../../core/user.model";

export type ParticipantWithUserInfo = UserCore & {
	rank: number;
	totalAttempts: number;
	highestScore: number;
}

export type ParticipantUser = {
	user: UserInfo;
	participant: CandidateCoreSchema;
};