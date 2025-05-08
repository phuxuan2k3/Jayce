import { useState } from "react";
import { mockTestCoreDos } from "../mocks/test";
import { TestCoreDo } from "../model/test.model";

export default function useTestDo() {
	const [testDo, setTestDo] = useState<TestCoreDo>(mockTestCoreDos[0]);

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const onCurrentQuestionIndexChange = (index: number) => {
		setCurrentQuestionIndex(index);
	};
	const secondsLeft = 20 * 60; // 20 minutes in seconds

	const onTestCancel = () => {
	};

	const onTestSubmit = () => {
	};

	const onQuestionAnswered = (questionId: number, optionIndex?: number) => {
		const updatedQuestions = testDo.questions.map((question) => {
			if (question.id === questionId) {
				return {
					...question,
					chosenOption: optionIndex,
				};
			}
			return question;
		});
		setTestDo({
			...testDo,
			questions: updatedQuestions,
		});
	};

	const onQuestionFlagToggled = (questionIndex: number) => {
		const updatedQuestions = testDo.questions.map((question, index) => {
			if (index === questionIndex) {
				return {
					...question,
					isFlagged: !question.isFlagged,
				};
			}
			return question;
		});
		setTestDo({
			...testDo,
			questions: updatedQuestions,
		});
	};


	return {
		testDo,
		currentQuestionIndex,
		secondsLeft,
		onTestCancel,
		onTestSubmit,
		onCurrentQuestionIndexChange,
		onQuestionAnswered,
		onQuestionFlagToggled,
	}
}
