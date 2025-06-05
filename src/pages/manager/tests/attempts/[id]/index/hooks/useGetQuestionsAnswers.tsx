import { useMemo } from 'react';
import { mockAnswers } from '../../../../../../../infra-test/mocks/mockAttempts';
import { mockQuestions } from '../../../../[id]/index/components/questions-tab/mockData';
import { QuestionAnswer } from '../types/type'

export default function useGetQuestionsAnswers(): QuestionAnswer[] {
	const questions = mockQuestions;
	const answers = mockAnswers;

	const questionsAnswers: QuestionAnswer[] = useMemo(() => questions.map((question) => {
		const answer = answers.find((answer) => answer.questionId === question.id) || null;
		return {
			question,
			answer
		};
	}), [questions, answers]);

	return questionsAnswers;
}
