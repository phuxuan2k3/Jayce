import React from 'react'
import { Topic } from "../../../../models/topic.model";

export default function useGetTotalQuestions({
	topics,
}: {
	topics: Topic[];
}) {
	const totalQuestions = React.useMemo(() => {
		return topics.reduce((total, topic) => {
			return total + Object.values(topic.difficultyDistribution).reduce((sum, count) => sum + count, 0);
		}, 0);
	}, [topics]);
	return totalQuestions;
}
