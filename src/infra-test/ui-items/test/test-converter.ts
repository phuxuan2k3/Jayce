import { QuestionCoreSchema, TestFullSchema } from "../../api/test.api-gen-v2";
import { QuestionPersistCoreSchema } from "../question/types";
import { ExamPersistCoreSchema } from "./types";

export class TestConverter {
	static testFullWithQuestions_2_examPersistCore(test: TestFullSchema, questions: QuestionCoreSchema[]): ExamPersistCoreSchema | null {
		if (test.mode !== "EXAM" || test._detail.mode !== "EXAM") return null;
		return {
			...test,
			detail: {
				...test._detail,
				mode: "EXAM",
			},
			questions: questions.map(q => this.questionCoreSchema_2_questionPersistCoreSchema(q)).filter((q): q is QuestionPersistCoreSchema => q !== null),
		};
	}

	static questionCoreSchema_2_questionPersistCoreSchema(question: QuestionCoreSchema): QuestionPersistCoreSchema | null {
		if (question.detail.type === "MCQ") {
			return {
				...question,
				detail: {
					...question.detail,
					correctOption: question.detail.correctOption ?? 0,
				},
			};
		} else if (question.detail.type === "LONG_ANSWER") {
			return {
				...question,
				detail: {
					...question.detail,
					correctAnswer: question.detail.correctAnswer ?? "",
				},
			};
		}
		return null;
	}
}