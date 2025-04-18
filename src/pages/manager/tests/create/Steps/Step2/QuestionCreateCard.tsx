import QuestionFormCard from "../../../common/QuestionFormCard";
import { useTestCreate } from "../../contexts/test-create.context";
import { testCreateSelectors } from "../../contexts/test.reducer";

export default function QuestionCreateCard({
	index
}: {
	index: number;
}) {
	const { state, dispatch } = useTestCreate();
	const { questions } = state.data;
	const isAiGenerated = testCreateSelectors.isAIQuestion(state, index);
	return (
		<QuestionFormCard
			index={index}
			isAiGenerated={isAiGenerated}
			question={questions[index]}
			onQuestionContentChange={(index, key, value) => dispatch({
				type: "UPDATE_QUESTION",
				payload: {
					index,
					question: { [key]: value }
				},
			})}
			onDeleteQuestion={(index) => dispatch({
				type: "REMOVE_QUESTION",
				payload: { index },
			})}
			onAddOption={(questionIndex, option) => dispatch({
				type: "ADD_OPTION",
				payload: { questionIndex, option },
			})}
			onOptionContentChange={(questionIndex, optionIndex, value) => dispatch({
				type: "UPDATE_OPTION",
				payload: { questionIndex, optionIndex, option: value },
			})}
			onDeleteOption={(questionIndex, optionIndex) => dispatch({
				type: "REMOVE_OPTION",
				payload: { questionIndex, optionIndex },
			})}
		/>
	)
}