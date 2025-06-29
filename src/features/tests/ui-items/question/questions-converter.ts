import { AnswerCoreSchema, QuestionCoreSchema } from "../../api/test.api-gen-v2";
import { QuestionPersistCoreSchema, QuestionWithOptionalAnswer } from "./types";

export class QuestionsConverter {
	static concatQuestionsWithOptionalAnswers({
		questions,
		answers,
	}: {
		questions: QuestionCoreSchema[];
		answers: AnswerCoreSchema[];
	}): QuestionWithOptionalAnswer[] {
		const questionMap = new Map<number, QuestionCoreSchema>();
		const answerMap = new Map<number, AnswerCoreSchema>();

		// Populate the maps
		questions.forEach(question => {
			questionMap.set(question.id, question);
		});
		answers.forEach(answer => {
			answerMap.set(answer.questionId, answer);
		});

		// Combine questions and answers
		const combined: QuestionWithOptionalAnswer[] = [];
		for (const question of questions) {
			const answer = answerMap.get(question.id);
			combined.push({
				question,
				answer: answer ? answer : undefined,
			});
		}

		return combined;
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