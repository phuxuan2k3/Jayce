import { AttemptCore } from "../../../../../../infra-test/core/attempt.model";
import { UserCore } from "../../../../../../infra-test/core/user.model";

export type AttemptCandidate = {
	attempt: AttemptCore;
	candidate: UserCore;
};