import { UserCore } from "../../../../../../features/tests/model/user.model";

export type ParticipantWithUserInfo = UserCore & {
	rank: number;
	totalAttempts: number;
	highestScore: number;
}