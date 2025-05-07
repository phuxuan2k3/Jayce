import React, { createContext, useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import GradientBorderGood from '../../../components/ui/border/GradientBorder.good';
import { AccessTime as AccessTimeIcon } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Types based on test.model.ts
export type TestItemProps = {
	id: number;
	authorId: string;
	title: string;
	description: string;
	minutesToAnswer: number;
	createdAt: string;
	authorName?: string;
	authorAvatar?: string;
	mode: "practice" | "exam";
	template?: {
		id: number;
		difficulty: number;
		tags: string[];
		numberOfQuestions: number;
		numberOfOptions: number;
		extraContexts: string[];
	};
	examConfig?: {
		roomId: string;
		password?: string;
		allowBackwardsNavigation: boolean;
		answerVisibility: boolean;
		openDate: string;
		closeDate: string;
		numberOfAttemptsAllowed: number;
	};
	children?: React.ReactNode;
	onClick?: () => void;
	className?: string;
};

// Context to share data between compound components
type TestItemsContextValue = TestItemProps | null;

const TestItemsContext = createContext<TestItemsContextValue>(null);

// Hook to use the context
const useTestItems = () => {
	const context = useContext(TestItemsContext);
	if (!context) {
		throw new Error('TestItems compound components must be used within a TestItems component');
	}
	return context;
};

// Main container component
export const TestItem: React.FC<TestItemProps> & {
	Header: typeof TestItemHeader;
	Title: typeof TestItemTitle;
	Description: typeof TestItemDescription;
	Metadata: typeof TestItemMetadata;
	Tags: typeof TestItemTags;
	Author: typeof TestItemAuthor;
	Actions: typeof TestItemActions;
	Timer: typeof TestItemTimer;
	Mode: typeof TestItemMode;
	Questions: typeof TestItemQuestions;
} = ({ children, ...props }) => {
	return (
		<TestItemsContext.Provider value={props}>
			<div
				className={`bg-white rounded-lg shadow-primary border border-gray-200 p-4 ${props.onClick ? 'cursor-pointer' : ''} ${props.className || ''}`}
				onClick={props.onClick}
			>
				{children}
			</div>
		</TestItemsContext.Provider>
	);
};

// Header component with author info and created date
const TestItemHeader: React.FC = () => {
	const test = useTestItems();

	return (
		<div className="flex flex-row items-center gap-3 mb-3">
			<Avatar src={test.authorAvatar} alt={test.authorId} />
			<div className="flex flex-col">
				<div className="flex items-center text-sm text-blue-chill-500 mb-0">
					<span className="font-semibold">Created by {test.authorName || test.authorId}</span>
					<span className="mx-2">&#8226;</span>
					<span>{formatDistanceToNow(new Date(test.createdAt))} ago</span>
				</div>
			</div>
		</div>
	);
};

// Title component
const TestItemTitle: React.FC = () => {
	const test = useTestItems();

	return (
		<h2 className="font-bold text-xl text-gray-800 my-2">
			{test.title}
		</h2>
	);
};

// Description component
const TestItemDescription: React.FC = () => {
	const test = useTestItems();

	return (
		<p className="text-gray-600 mb-3">
			{test.description}
		</p>
	);
};

// Metadata component for time and questions
const TestItemMetadata: React.FC = () => {
	return (
		<div className="flex justify-between text-sm text-gray-700 my-2">
			<TestItem.Timer />
			<TestItem.Questions />
		</div>
	);
};

// Timer component
const TestItemTimer: React.FC = () => {
	const test = useTestItems();
	const minutesToAnswerString = test.minutesToAnswer === 1 ? "1 minute" : `${test.minutesToAnswer} minutes`;

	return (
		<div className="flex flex-row items-center text-primary-toned-600 font-medium">
			<AccessTimeIcon className="mr-1" fontSize="small" />
			<span>{minutesToAnswerString}</span>
		</div>
	);
};

// Questions count component
const TestItemQuestions: React.FC = () => {
	const test = useTestItems();
	const questionCount = test.template?.numberOfQuestions || 0;

	return (
		<span className="font-semibold text-primary-toned-600">
			{questionCount} Questions
		</span>
	);
};

// Tags component
const TestItemTags: React.FC = () => {
	const test = useTestItems();

	if (!test.template?.tags || test.template.tags.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-2 mb-4">
			{test.template.tags.map((tag, index) => (
				<GradientBorderGood key={index}>
					{tag}
				</GradientBorderGood>
			))}
		</div>
	);
};

// Author component
const TestItemAuthor: React.FC = () => {
	const test = useTestItems();

	return (
		<div className="flex items-center mt-2">
			<Avatar src={test.authorAvatar} alt={test.authorId} sx={{ width: 24, height: 24 }} />
			<span className="ml-2 text-sm text-gray-600">{test.authorName || test.authorId}</span>
		</div>
	);
};

// Mode component (Practice/Exam)
const TestItemMode: React.FC = () => {
	const test = useTestItems();

	return (
		<div className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${test.mode === 'practice' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
			}`}>
			{test.mode === 'practice' ? 'Practice' : 'Exam'}
		</div>
	);
};

// Actions component for edit, delete
const TestItemActions: React.FC<{
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}> = ({ onEdit, onDelete }) => {
	const test = useTestItems();

	return (
		<div className="flex gap-2 justify-end mt-2">
			{onEdit && (
				<button
					className="p-2 text-primary-toned-600 hover:bg-primary-toned-50 rounded-full"
					onClick={(e) => {
						e.stopPropagation();
						onEdit(test.id);
					}}
				>
					<FontAwesomeIcon icon={faPen} className="h-4 w-4" />
				</button>
			)}
			{onDelete && (
				<button
					className="p-2 text-red-500 hover:bg-red-50 rounded-full"
					onClick={(e) => {
						e.stopPropagation();
						onDelete(test.id);
					}}
				>
					<FontAwesomeIcon icon={faTrashCan} className="h-4 w-4" />
				</button>
			)}
		</div>
	);
};

// Assign sub-components to the main component
TestItem.Header = TestItemHeader;
TestItem.Title = TestItemTitle;
TestItem.Description = TestItemDescription;
TestItem.Metadata = TestItemMetadata;
TestItem.Tags = TestItemTags;
TestItem.Author = TestItemAuthor;
TestItem.Actions = TestItemActions;
TestItem.Timer = TestItemTimer;
TestItem.Mode = TestItemMode;
TestItem.Questions = TestItemQuestions;

export default TestItem;