import SummaryCards from "./components/SummaryCards";
import AddTopicButton from "./components/AddTopicButton";
import TopicCard from "./components/TopicCard";
import HelpText from "./components/HelpText";
import useTopicsManage from "./hooks/useTopicsManage";
import useGetTotalQuestions from "./hooks/useGetTotalQuestions";
import { Topic } from "../../common/base-schema";
import { BuilderStep2Type } from "../../common/step-schema";

export default function Step2({
	data,
	onDataChange,
}: {
	data: BuilderStep2Type;
	onDataChange: (data: BuilderStep2Type) => void;
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
