import SummaryCards from "./components/SummaryCards";
import AddTopicButton from "./components/AddTopicButton";
import TopicCard from "./components/TopicCard";
import HelpText from "./components/HelpText";
import useTopicsManage from "./hooks/useTopicsManage";
import useGetTotalQuestions from "./hooks/useGetTotalQuestions";
import { Step2Data } from "../../common/model-types";
import { Topic } from "../utils/base-schema";

export default function Step2({
	data,
	onDataChange,
}: {
	data: Step2Data;
	onDataChange: (data: Step2Data) => void;
}) {
	const {
		addTopic,
		updateTopic,
		deleteTopic,
	} = useTopicsManage({
		onTopicsChange: (topics: Topic[]) => {
			onDataChange({
				...data,
				topics
			});
		},
		topics: data.topics,
	});

	const totalQuestions = useGetTotalQuestions({ topics: data.topics });
	return (
		<div className="p-6 space-y-6">
			<SummaryCards
				totalTopics={data.topics.length}
				totalQuestions={totalQuestions}
			/>

			<AddTopicButton onAddTopic={addTopic} />

			{/* Topics List */}
			<div className="space-y-4">
				{data.topics.map((topic, index) => (
					<TopicCard
						key={index}
						topic={topic}
						index={index}
						canDelete={data.topics.length > 1}
						onUpdate={updateTopic}
						onDelete={deleteTopic}
					/>
				))}
			</div>

			<HelpText />
		</div>
	);
}
