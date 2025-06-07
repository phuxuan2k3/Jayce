import SummaryCards from "./components/SummaryCards";
import AddTopicButton from "./components/AddTopicButton";
import TopicCard from "./components/TopicCard";
import HelpText from "./components/HelpText";
import { Topic } from "../../../models/topic.model";
import useTopicsManage from "./hooks/useTopicsManage";
import useGetTotalQuestions from "./hooks/useGetTotalQuestions";
import { Step2Data } from "../../../common/model-types";

export default function Step2({
	step2Data,
	onStep2DataChange,
}: {
	step2Data: Step2Data;
	onStep2DataChange: (data: Step2Data) => void;
}) {
	const {
		addTopic,
		updateTopic,
		deleteTopic,
	} = useTopicsManage({
		onTopicsChange: (topics: Topic[]) => {
			onStep2DataChange({
				...step2Data,
				topics
			});
		},
		topics: step2Data.topics,
	});

	const totalQuestions = useGetTotalQuestions({ topics: step2Data.topics });
	return (
		<div className="p-6 space-y-6">
			<SummaryCards
				totalTopics={step2Data.topics.length}
				totalQuestions={totalQuestions}
			/>

			<AddTopicButton onAddTopic={addTopic} />

			{/* Topics List */}
			<div className="space-y-4">
				{step2Data.topics.map((topic, index) => (
					<TopicCard
						key={index}
						topic={topic}
						index={index}
						canDelete={step2Data.topics.length > 1}
						onUpdate={updateTopic}
						onDelete={deleteTopic}
					/>
				))}
			</div>

			<HelpText />
		</div>
	);
}
