import { useCallback } from 'react'
import { Topic } from "../../models/topic.model";

export default function useTopicsManage({
	topics,
	onTopicsChange,
}: {
	topics: Topic[];
	onTopicsChange: (topicBlueprints: Topic[]) => void;
}) {
	const addTopic = useCallback(() => {
		return onTopicsChange([
			...topics,
			{
				name: "",
				difficultyDistribution: {
					Easy: 1,
					Medium: 0,
					Hard: 0,
				}
			}
		]);
	}, [topics]);

	const updateTopic = useCallback((index: number, updatedTopic: Partial<Topic>) => {
		const updatedTopics = [...topics];
		updatedTopics[index] = {
			...updatedTopics[index],
			...updatedTopic,
		};
		onTopicsChange(updatedTopics);
	}, [topics]);

	const deleteTopic = useCallback((index: number) => {
		const updatedTopics = topics.filter((_, i) => i !== index);
		onTopicsChange(updatedTopics);
	}, [topics]);

	return (
		{
			addTopic,
			updateTopic,
			deleteTopic,
		}
	);
}
