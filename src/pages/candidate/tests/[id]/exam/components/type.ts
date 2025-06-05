import { UserCore } from "../../../../../../infra-test/core/user.model";

export type ParticipantWithUserInfo = UserCore & {
	rank: number;
	totalAttempts: number;
	highestScore: number;
}