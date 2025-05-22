import { AttemptCore } from "../../../../../../features/tests/model/attempt.model";
import { UserCore } from "../../../../../../features/tests/model/user.model";

export type AttemptCandidate = {
	attempt: AttemptCore;
	candidate: UserCore;
};