import { AttemptsOfTestAggregate } from "../../../../../../../infra-test/core/attempt.model";
import { ExamCore, TestAggregate } from "../../../../../../../infra-test/core/test.model";

export type InformationTabModel = {
	exam: ExamCore;
	testAggregate: TestAggregate;
	attemptOfTestAggregate: AttemptsOfTestAggregate;
};
