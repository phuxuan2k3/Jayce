import React, { createContext, useContext } from "react";
import { TestFullSchema } from '../../api/test.api-gen-v2';
import { Calendar, Users, Star, ListChecks, KeyRound, Eye, EyeOff } from "lucide-react";

// Context for sharing test and handlers
interface TestFullCardContextProps {
	test: TestFullSchema;
	onClick?: () => void;
}
const TestFullCardContext = createContext<TestFullCardContextProps | undefined>(undefined);

function useTestFullCardContext() {
	const ctx = useContext(TestFullCardContext);
	if (!ctx) throw new Error("TestFullCard subcomponent must be used within TestFullCard");
	return ctx;
}

// Header
const TestFullCardHeader: React.FC = () => {
	const { test } = useTestFullCardContext();
	const modeColors: Record<string, string> = {
		EXAM: "bg-red-100 text-red-700",
		PRACTICE: "bg-blue-100 text-blue-700",
	};
	const modeClass = modeColors[test.mode] || "bg-gray-100 text-gray-700";
	return (
		<div className="flex flex-col gap-2 border-b border-primary-toned-200 pb-2">
			<div className="flex justify-between items-center">
				<h3 className="font-bold text-lg">{test.title}</h3>
				<span className={`text-xs px-2 py-1 rounded-full ${modeClass}`}>{test.mode}</span>
			</div>
		</div>
	);
};

// Description
const TestFullCardDescription: React.FC = () => {
	const { test } = useTestFullCardContext();
	return <p className="text-primary-toned-600 text-sm mt-2">{test.description}</p>;
};

// Aggregate Stats
const TestFullCardAggregate: React.FC = () => {
	const { test } = useTestFullCardContext();
	if (!test._aggregate) return null;
	const agg = test._aggregate;
	return (
		<div className="flex flex-wrap gap-4 mt-3 text-sm text-primary-toned-500">
			<div className="flex items-center gap-1"><ListChecks size={14} />{agg.numberOfQuestions} questions</div>
			<div className="flex items-center gap-1"><Star size={14} />{agg.totalPoints} pts</div>
			<div className="flex items-center gap-1"><Users size={14} />{agg.totalCandidates} candidates</div>
			<div className="flex items-center gap-1"><span>Attempts:</span> {agg.totalAttempts}</div>
			<div className="flex items-center gap-1"><span>Avg:</span> {agg.averageScore}</div>
			<div className="flex items-center gap-1"><span>High:</span> {agg.highestScore}</div>
			<div className="flex items-center gap-1"><span>Low:</span> {agg.lowestScore}</div>
		</div>
	);
};

// Details (tags, outlines, room, etc.)
const TestFullCardDetails: React.FC = () => {
	const { test } = useTestFullCardContext();
	const detail = test._detail;
	if (!detail) return null;

	if (detail.mode === "PRACTICE") {
		return (
			<div className="mt-3 flex flex-col gap-2">
				{Array.isArray(detail.tags) && detail.tags.length > 0 && (
					<div className="flex flex-wrap gap-1">
						{detail.tags.map((tag: string) => (
							<span key={tag} className="text-xs bg-blue-chill-100 text-blue-chill-700 px-2 py-1 rounded-full">{tag}</span>
						))}
					</div>
				)}
				{Array.isArray(detail.outlines) && detail.outlines.length > 0 && (
					<div className="flex flex-wrap gap-1">
						{detail.outlines.map((outline: string) => (
							<span key={outline} className="text-xs bg-primary-toned-100 text-primary-toned-700 px-2 py-1 rounded-full">{outline}</span>
						))}
					</div>
				)}
				{typeof detail.numberOfQuestions === 'number' && (
					<div className="flex items-center gap-2 text-xs text-primary-toned-500">
						<ListChecks size={14} /> {detail.numberOfQuestions} questions
					</div>
				)}
				{typeof detail.numberOfOptions === 'number' && (
					<div className="flex items-center gap-2 text-xs text-primary-toned-500">
						<span>Options per question:</span> {detail.numberOfOptions}
					</div>
				)}
			</div>
		);
	}

	if (detail.mode === "EXAM") {
		return (
			<div className="mt-3 flex flex-col gap-2">
				{detail.roomId && (
					<div className="flex items-center gap-2 text-xs text-primary-toned-500">
						<KeyRound size={14} /> Room: {detail.roomId}
					</div>
				)}
				{typeof detail.hasPassword === 'boolean' && (
					<div className="flex items-center gap-2 text-xs text-primary-toned-500">
						{detail.hasPassword ? <KeyRound size={14} /> : <KeyRound size={14} className="opacity-30" />} {detail.hasPassword ? 'Password protected' : 'No password'}
					</div>
				)}
				{typeof detail.isPublic === 'boolean' && (
					<div className="flex items-center gap-2 text-xs text-primary-toned-500">
						{detail.isPublic ? <Eye size={14} /> : <EyeOff size={14} />} {detail.isPublic ? 'Public' : 'Private'}
					</div>
				)}
				{detail.openDate && (
					<div className="flex items-center gap-2 text-xs text-primary-toned-500">
						<Calendar size={14} /> Open: {new Date(detail.openDate).toLocaleDateString()}
					</div>
				)}
				{detail.closeDate && (
					<div className="flex items-center gap-2 text-xs text-primary-toned-500">
						<Calendar size={14} /> Close: {new Date(detail.closeDate).toLocaleDateString()}
					</div>
				)}
			</div>
		);
	}

	return null;
};

// Footer
const TestFullCardFooter: React.FC = () => {
	const { test } = useTestFullCardContext();
	const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();
	return (
		<div className="flex justify-between items-center mt-4 pt-2 border-t border-primary-toned-100">
			<span className="text-xs text-primary-toned-400">
				Created: {formatDate(test.createdAt)} | Updated: {formatDate(test.updatedAt)}
			</span>
			<span className="text-xs text-primary-toned-400">ID: {test.id}</span>
		</div>
	);
};

// Main Card
export type TestFullCardProps = {
	test: TestFullSchema;
	onClick?: (test: TestFullSchema) => void;
};

const TestFullCard: React.FC<TestFullCardProps> = ({ test, onClick }) => (
	<TestFullCardContext.Provider value={{
		test,
		onClick: onClick ? () => onClick?.(test) : undefined,
	}}>
		<div
			className="border border-primary-toned-300 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
			onClick={() => onClick?.(test)}
		>
			<TestFullCardHeader />
			<TestFullCardDescription />
			<TestFullCardAggregate />
			<TestFullCardDetails />
			<TestFullCardFooter />
		</div>
	</TestFullCardContext.Provider>
);

export default TestFullCard;
