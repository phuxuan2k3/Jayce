import { AnswerCoreSchema, QuestionCoreSchema } from "../api/test.api-gen-v2"

type QuestionWithOptionalAnswer = {
	question: QuestionCoreSchema;
	answer?: AnswerCoreSchema;
}

export default function concatQuestionsWithOptionalAnswers({
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


