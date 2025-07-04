import SummaryCards from "./components/SummaryCards";
import TopicCard from "./components/TopicCard";
import useTopicsManage from "./hooks/useTopicsManage";
import useGetTotalQuestions from "./hooks/useGetTotalQuestions";
import { Topic } from "../../common/base-schema";
import { BuilderStep2Type } from "../../common/step-schema";
import { Plus } from "lucide-react";
import MyButton from "../../../../../../features/tests/ui/buttons/MyButton";

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
		<div className="space-y-6">
			<SummaryCards
				totalTopics={data.topics.length}
				totalQuestions={totalQuestions}
			/>

			{/* Topics List */}
			<div className="flex flex-col gap-4">
				{data.topics.map((topic, index) => (
					<TopicCard
						key={index}
						topic={topic}
						index={index}
						canDelete={true}
						onUpdate={updateTopic}
						onDelete={deleteTopic}
					/>
				))}
			</div>

			<MyButton
				className="w-full"
				onClick={addTopic}
			>
				<Plus className="w-5 h-5" strokeWidth={2.5} />
				Add Topic
			</MyButton>
		</div>
	);
}
