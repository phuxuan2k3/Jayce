import { QuestionCoreSchema, TestFullSchema } from "../../api/test.api-gen-v2";
import { QuestionsConverter } from "../question/questions-converter";
import { QuestionPersistCoreSchema } from "../question/types";
import { ExamPersistCoreSchema } from "./types";

export class TestConverter {
	static testFullWithQuestions_2_examPersistCore(test: TestFullSchema, questions: QuestionCoreSchema[]): ExamPersistCoreSchema | null {
		if (test.mode !== "EXAM" || test._detail.mode !== "EXAM") return null;
		return {
			...test,
			detail: {
				...test._detail,
				openDate: test._detail.openDate || new Date().toISOString(),
				closeDate: test._detail.closeDate || new Date().toISOString(),
				mode: "EXAM",
			},
			questions: questions.map(q => QuestionsConverter.questionCoreSchema_2_questionPersistCoreSchema(q)).filter((q): q is QuestionPersistCoreSchema => q !== null),
			hasAttempts: test._aggregate.totalAttempts > 0,
		};
	}
}