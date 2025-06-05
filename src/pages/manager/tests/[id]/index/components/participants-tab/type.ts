import { AttemptsOfCandidateInTestAggregate } from "../../../../../../../infra-test/core/attempt.model";
import { CandidateCore } from "../../../../../../../infra-test/core/user.model"

export type Participant = {
	user: CandidateCore;
	attemptsAggregate: AttemptsOfCandidateInTestAggregate;
};

export type Filter = {
	page: number;
	perPage: number;
};