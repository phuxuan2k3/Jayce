import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface AddTopicButtonProps {
	onAddTopic: () => void;
}

export default function AddTopicButton({ onAddTopic }: AddTopicButtonProps) {
	return (
		<div className="mb-6">
			<button
				onClick={onAddTopic}
				className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-toned-600 transition-colors font-semibold"
			>
				<FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
				Add Topic
			</button>
		</div>
	);
}
