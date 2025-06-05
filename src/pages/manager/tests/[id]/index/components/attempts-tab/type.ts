import { AttemptsOfTestAggregate, AttemptCore } from "../../../../../../../infra-test/core/attempt.model";
import { UserCore } from "../../../../../../../infra-test/core/user.model";

export type Filter = {
	page: number;
	perPage: number;
	sort: string;
};

export type AttemptsTabModel = {
	attemptsWithCandidates: AttemptWithCandidate[];
	attempsOfTestAggregate: AttemptsOfTestAggregate;
};

export type AttemptWithCandidate = {
	attempt: AttemptCore;
	candidate: UserCore;
};
