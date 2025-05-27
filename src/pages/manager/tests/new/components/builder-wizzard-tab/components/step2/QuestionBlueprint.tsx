import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../../app/hooks';
import {
	selectTopics,
	addTopic,
	updateTopic,
	deleteTopic,
	reorderTopics,
	Topic
} from '../../state/wizardSlice';
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
	verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Pie chart difficulty editor component
const DifficultyEditor: React.FC<{
	topic: Topic;
	onSave: (difficulty: Topic['difficulty']) => void;
}> = ({ topic, onSave }) => {
	const [easy, setEasy] = useState(topic.difficulty.easy);
	const [medium, setMedium] = useState(topic.difficulty.medium);
	const [hard, setHard] = useState(topic.difficulty.hard);

	const handleSave = () => {
		// Normalize to ensure they add up to 100
		const total = easy + medium + hard;
		const normalizedEasy = Math.round((easy / total) * 100);
		const normalizedMedium = Math.round((medium / total) * 100);
		const normalizedHard = 100 - normalizedEasy - normalizedMedium;

		onSave({
			easy: normalizedEasy,
			medium: normalizedMedium,
			hard: normalizedHard
		});
	};

	return (
		<div className="p-4 bg-white rounded-lg shadow-lg w-64">
			<h4 className="text-sm font-medium text-gray-700 mb-3">Set Difficulty Distribution</h4>

			{/* Easy slider */}
			<div className="mb-3">
				<div className="flex justify-between">
					<label className="text-xs text-gray-600">Easy</label>
					<span className="text-xs font-medium">{easy}%</span>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					value={easy}
					onChange={(e) => setEasy(parseInt(e.target.value))}
					className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
				/>
			</div>

			{/* Medium slider */}
			<div className="mb-3">
				<div className="flex justify-between">
					<label className="text-xs text-gray-600">Medium</label>
					<span className="text-xs font-medium">{medium}%</span>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					value={medium}
					onChange={(e) => setMedium(parseInt(e.target.value))}
					className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
				/>
			</div>

			{/* Hard slider */}
			<div className="mb-4">
				<div className="flex justify-between">
					<label className="text-xs text-gray-600">Hard</label>
					<span className="text-xs font-medium">{hard}%</span>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					value={hard}
					onChange={(e) => setHard(parseInt(e.target.value))}
					className="w-full h-2 bg-red-200 rounded-lg appearance-none cursor-pointer"
				/>
			</div>

			<div className="flex justify-between">
				<div className="flex-shrink-0 h-20 w-20">
					<svg viewBox="0 0 36 36" className="circular-chart">
						<path
							className="circle-bg"
							d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
							fill="none"
							stroke="#eee"
							strokeWidth="3"
						/>
						<path
							className="circle"
							d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
							fill="none"
							stroke="#4ade80"
							strokeWidth="3"
							strokeDasharray={`${easy}, 100`}
							strokeDashoffset="0"
						/>
						<path
							className="circle"
							d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
							fill="none"
							stroke="#facc15"
							strokeWidth="3"
							strokeDasharray={`${medium}, 100`}
							strokeDashoffset={`${-easy}`}
						/>
						<path
							className="circle"
							d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
							fill="none"
							stroke="#f87171"
							strokeWidth="3"
							strokeDasharray={`${hard}, 100`}
							strokeDashoffset={`${-(easy + medium)}`}
						/>
					</svg>
				</div>
				<div className="space-y-2">
					<button
						type="button"
						onClick={handleSave}
						className="w-full py-2 px-3 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
					>
						Apply
					</button>
					<button
						type="button"
						onClick={() => {
							setEasy(topic.difficulty.easy);
							setMedium(topic.difficulty.medium);
							setHard(topic.difficulty.hard);
						}}
						className="w-full py-2 px-3 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

// Sortable Topic Row Component
const SortableTopicRow: React.FC<{
	topic: Topic;
	onUpdate: (topic: Topic) => void;
	onDelete: (id: string) => void;
}> = ({ topic, onUpdate, onDelete }) => {
	const [showDifficultyEditor, setShowDifficultyEditor] = useState(false);
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: topic.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 10 : 1,
		opacity: isDragging ? 0.5 : 1
	};

	const handleQuestionCountChange = (value: number) => {
		if (value >= 1) {
			onUpdate({
				...topic,
				questionCount: value
			});
		}
	};

	const handleDifficultyUpdate = (difficulty: Topic['difficulty']) => {
		onUpdate({
			...topic,
			difficulty
		});
		setShowDifficultyEditor(false);
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex items-center px-4 py-3 border border-gray-200 rounded-md bg-white mb-2 relative"
			{...attributes}
		>
			{/* Drag handle */}
			<div {...listeners} className="mr-3 cursor-grab touch-manipulation">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
				</svg>
			</div>

			{/* Topic name */}
			<div className="flex-grow mr-4">
				<input
					type="text"
					value={topic.name}
					onChange={(e) => onUpdate({ ...topic, name: e.target.value })}
					placeholder="Topic name"
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
			</div>

			{/* Question count */}
			<div className="flex items-center mr-4">
				<button
					type="button"
					onClick={() => handleQuestionCountChange(topic.questionCount - 1)}
					disabled={topic.questionCount <= 1}
					className="px-2 py-1 border border-gray-300 rounded-l-md disabled:opacity-50"
				>
					-
				</button>
				<input
					type="number"
					min="1"
					value={topic.questionCount}
					onChange={(e) => handleQuestionCountChange(parseInt(e.target.value) || 1)}
					className="w-16 text-center border-t border-b border-gray-300 py-1"
				/>
				<button
					type="button"
					onClick={() => handleQuestionCountChange(topic.questionCount + 1)}
					className="px-2 py-1 border border-gray-300 rounded-r-md"
				>
					+
				</button>
			</div>

			{/* Difficulty pie chart */}
			<div className="relative">
				<button
					type="button"
					onClick={() => setShowDifficultyEditor(!showDifficultyEditor)}
					className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
				>
					<div className="w-5 h-5 rounded-full overflow-hidden">
						<svg viewBox="0 0 36 36" className="circular-chart">
							<path
								className="circle"
								d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="#4ade80"
								strokeWidth="12"
								strokeDasharray={`${topic.difficulty.easy}, 100`}
							/>
							<path
								className="circle"
								d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="#facc15"
								strokeWidth="12"
								strokeDasharray={`${topic.difficulty.medium}, 100`}
								strokeDashoffset={`${-topic.difficulty.easy}`}
							/>
							<path
								className="circle"
								d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
								fill="none"
								stroke="#f87171"
								strokeWidth="12"
								strokeDasharray={`${topic.difficulty.hard}, 100`}
								strokeDashoffset={`${-(topic.difficulty.easy + topic.difficulty.medium)}`}
							/>
						</svg>
					</div>
					<span className="text-xs">Difficulty</span>
				</button>

				{/* Difficulty editor popup */}
				{showDifficultyEditor && (
					<div className="absolute right-0 top-full z-10 mt-1">
						<DifficultyEditor topic={topic} onSave={handleDifficultyUpdate} />
					</div>
				)}
			</div>

			{/* Delete button */}
			<button
				type="button"
				onClick={() => onDelete(topic.id)}
				className="ml-4 text-red-500 hover:text-red-700"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
				</svg>
			</button>
		</div>
	);
};

// Main Component
const QuestionBlueprint: React.FC = () => {
	const dispatch = useAppDispatch();
	const topics = useAppSelector(selectTopics);

	// Set up sensors for drag and drop interactions
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleAddTopic = () => {
		const newTopic: Topic = {
			id: `topic-${Date.now()}`,
			name: '',
			questionCount: 5,
			difficulty: { easy: 33, medium: 34, hard: 33 } // Default even distribution
		};
		dispatch(addTopic(newTopic));
	};

	const handleUpdateTopic = (updatedTopic: Topic) => {
		dispatch(updateTopic(updatedTopic));
	};

	const handleDeleteTopic = (id: string) => {
		dispatch(deleteTopic(id));
	}; const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;
		if (active.id !== over.id) {
			const oldIndex = topics.findIndex((topic: Topic) => topic.id === active.id);
			const newIndex = topics.findIndex((topic: Topic) => topic.id === over.id);

			const reorderedTopics = arrayMove(topics, oldIndex, newIndex) as Topic[];
			dispatch(reorderTopics(reorderedTopics));
		}
	};

	return (
		<div>
			<div className="mb-4 flex justify-between items-center">
				<h3 className="text-lg font-medium text-gray-700">Question Topics</h3>
				<button
					type="button"
					onClick={handleAddTopic}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
					</svg>
					Add Topic
				</button>
			</div>

			{topics.length === 0 ? (
				<div className="text-center py-10 bg-gray-50 border border-dashed border-gray-300 rounded-md">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
					</svg>
					<h4 className="text-gray-500 font-medium mb-1">No topics added yet</h4>
					<p className="text-sm text-gray-400">
						Add topics to distribute your questions across different areas
					</p>
					<button
						type="button"
						onClick={handleAddTopic}
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
					>
						Add Your First Topic
					</button>
				</div>
			) : (
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={onDragEnd}
				>					<SortableContext
					items={topics.map((topic: Topic) => topic.id)}
					strategy={verticalListSortingStrategy}
				>
						<div className="space-y-2">
							{topics.map((topic: Topic) => (
								<SortableTopicRow
									key={topic.id}
									topic={topic}
									onUpdate={handleUpdateTopic}
									onDelete={handleDeleteTopic}
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
			)}			{/* Validation message */}
			{topics.length > 0 && topics.reduce((sum: number, topic: Topic) => sum + topic.questionCount, 0) === 0 && (
				<p className="mt-3 text-sm text-red-500">
					You must specify at least one question across your topics.
				</p>
			)}

			{/* Helpful info */}
			{topics.length > 0 && (
				<div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
					<h4 className="font-medium text-blue-800 mb-1">Topic distribution tips</h4>
					<ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
						<li>Balance your topics based on their importance to the role</li>
						<li>Ensure topic names are specific and descriptive</li>
						<li>Use the difficulty chart to create a balanced assessment</li>
					</ul>
				</div>
			)}			<style>{`
        .circular-chart {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
      `}</style>
		</div>
	);
};

export default QuestionBlueprint;
