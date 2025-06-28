import { UserInfo } from "../../../../auth/store/authSlice";
import { UserCore } from "../../../../auth/types/profile";
import { CandidateCoreSchema } from "../../../api/test.api-gen-v2";

export type ParticipantWithUserInfo = UserCore & {
	rank: number;
	totalAttempts: number;
	highestScore: number;
}

export type ParticipantUser = {
	user: UserInfo;
	participant: CandidateCoreSchema;
};