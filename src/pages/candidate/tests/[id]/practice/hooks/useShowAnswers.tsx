import { useCallback, useMemo, useState } from 'react'
import { QuestionCore } from '../../../../../../features/tests/model/question.model';

export default function useShowAnswers(questions: Array<QuestionCore>) {
	const [visibleAnswerIndices, setVisibleAnswerIndices] = useState<Array<boolean>>(questions.map(() => false));
	const [showAllAnswers, setShowAllAnswers] = useState(false);

	const questionsIdToIndexMap = useMemo(() => {
		return questions.reduce((acc, question, index) => {
			acc[question.id] = index;
			return acc;
		}, {} as Record<number, number>);
	}, [questions]);

	const isQuesionAnswerVisible = useCallback((id: number) => {
		const index = questionsIdToIndexMap[id];
		if (index === undefined) {
			console.error(`Question with id ${id} not found`);
			return false;
		}
		return visibleAnswerIndices[index];
	}, [visibleAnswerIndices, questionsIdToIndexMap]);

	const handleToggleAnswer = (id: number) => {
		const index = questionsIdToIndexMap[id];
		if (index === undefined) {
			console.error(`Question with id ${id} not found`);
			return;
		}
		const newVisibleAnswerIndices = [...visibleAnswerIndices];
		newVisibleAnswerIndices[index] = !newVisibleAnswerIndices[index];
		setVisibleAnswerIndices(newVisibleAnswerIndices);
	}

	const handleToggleAllAnswers = () => {
		const newVisibleAnswerIndices = questions.map(() => !showAllAnswers);
		setVisibleAnswerIndices(newVisibleAnswerIndices);
		setShowAllAnswers(prev => !prev);
	}

	return {
		showAllAnswers,
		isQuesionAnswerVisible,
		handleToggleAnswer,
		handleToggleAllAnswers,
	}
}
