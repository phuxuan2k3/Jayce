import { AttemptsOfTestAggregate } from "../../../../../../../infra-test/core/attempt.model";
import { ExamCore, TestAggregateCore } from "../../../../../../../infra-test/core/test.model";

export type InformationTabModel = {
	exam: ExamCore;
	testAggregate: TestAggregateCore;
	attemptOfTestAggregate: AttemptsOfTestAggregate;
};
