import { useTestPersistContext } from '../../../../../../features/tests/reducers/test-persist.context';
import QuestionFormEditCard from './QuestionFormEditCard';

export default function QuestionEditCard({
	index,
}: {
	index: number;
}) {
	const { state, dispatch } = useTestPersistContext();
	const { questions } = state.data;
	return (
		<QuestionFormEditCard
			index={index}
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
