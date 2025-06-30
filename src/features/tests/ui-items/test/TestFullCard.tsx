import React from "react";
import { TestFullSchema } from '../../api/test.api-gen-v2';
import { Calendar, Users, Star, ListChecks, KeyRound, Eye, EyeOff } from "lucide-react";
import { TestUtils } from "./test-utils";
import { cn } from "../../../../app/cn";

export type TestFullCardProps = {
	test: TestFullSchema;
	onClick?: (test: TestFullSchema) => void;
	className?: string;
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

const TestFullCard: React.FC<TestFullCardProps> = ({ test, onClick, className = "" }) => {
	const modeClass = TestUtils.getBandageClassName(test.mode as any);
	return (
		<div
			className={cn(
				"border border-primary-toned-300 rounded-lg p-4 transition-shadow bg-white hover:shadow-md",
				onClick && "cursor-pointer",
				className
			)}
			onClick={() => onClick?.(test)}
		>
			{/* Header */}
			<div className="flex flex-col gap-2 border-b border-primary-toned-200 pb-2">
				<div className="flex justify-between items-center">
					<h3 className="font-bold text-lg text-primary-toned-900">{test.title}</h3>
					<span className={modeClass}>{test.mode}</span>
				</div>
			</div>

			{/* Description */}
			<p className="text-primary-toned-600 text-sm mt-2 min-h-[40px]">{test.description}</p>

			{/* Aggregate Stats */}
			{test._aggregate && (
				<div className="flex flex-wrap gap-4 mt-3 text-sm text-primary-toned-500">
					<div className="flex items-center gap-1"><ListChecks size={14} />{test._aggregate.numberOfQuestions} questions</div>
					<div className="flex items-center gap-1"><Star size={14} />{test._aggregate.totalPoints} pts</div>
					<div className="flex items-center gap-1"><Users size={14} />{test._aggregate.totalCandidates} candidates</div>
					<div className="flex items-center gap-1"><span>Attempts:</span> {test._aggregate.totalAttempts}</div>
					<div className="flex items-center gap-1"><span>Avg:</span> {test._aggregate.averageScore}</div>
					<div className="flex items-center gap-1"><span>High:</span> {test._aggregate.highestScore}</div>
					<div className="flex items-center gap-1"><span>Low:</span> {test._aggregate.lowestScore}</div>
				</div>
			)}

			{/* Details (tags, outlines, room, etc.) */}
			{test._detail && (
				<div className="mt-3 flex flex-col gap-2">
					{test._detail.mode === "PRACTICE" && (
						<>
							{Array.isArray(test._detail.tags) && test._detail.tags.length > 0 && (
								<div className="flex flex-wrap gap-1">
									{test._detail.tags.map((tag: string) => (
										<span key={tag} className="text-xs bg-blue-chill-100 text-blue-chill-700 px-2 py-1 rounded-full">{tag}</span>
									))}
								</div>
							)}
							{Array.isArray(test._detail.outlines) && test._detail.outlines.length > 0 && (
								<div className="flex flex-wrap gap-1">
									{test._detail.outlines.map((outline: string) => (
										<span key={outline} className="text-xs bg-primary-toned-100 text-primary-toned-700 px-2 py-1 rounded-full">{outline}</span>
									))}
								</div>
							)}
							{typeof test._detail.numberOfQuestions === 'number' && (
								<div className="flex items-center gap-2 text-xs text-primary-toned-500">
									<ListChecks size={14} /> {test._detail.numberOfQuestions} questions
								</div>
							)}
							{typeof test._detail.numberOfOptions === 'number' && (
								<div className="flex items-center gap-2 text-xs text-primary-toned-500">
									<span>Options per question:</span> {test._detail.numberOfOptions}
								</div>
							)}
						</>
					)}
					{test._detail.mode === "EXAM" && (
						<>
							{test._detail.roomId && (
								<div className="flex items-center gap-2 text-xs text-primary-toned-500">
									<KeyRound size={14} /> Room: {test._detail.roomId}
								</div>
							)}
							{typeof test._detail.hasPassword === 'boolean' && (
								<div className="flex items-center gap-2 text-xs text-primary-toned-500">
									{test._detail.hasPassword ? <KeyRound size={14} /> : <KeyRound size={14} className="opacity-30" />} {test._detail.hasPassword ? 'Password protected' : 'No password'}
								</div>
							)}
							{typeof test._detail.isPublic === 'boolean' && (
								<div className="flex items-center gap-2 text-xs text-primary-toned-500">
									{test._detail.isPublic ? <Eye size={14} /> : <EyeOff size={14} />} {test._detail.isPublic ? 'Public' : 'Private'}
								</div>
							)}
							{test._detail.openDate && (
								<div className="flex items-center gap-2 text-xs text-primary-toned-500">
									<Calendar size={14} /> Open: {formatDate(test._detail.openDate)}
								</div>
							)}
							{test._detail.closeDate && (
								<div className="flex items-center gap-2 text-xs text-primary-toned-500">
									<Calendar size={14} /> Close: {formatDate(test._detail.closeDate)}
								</div>
							)}
						</>
					)}
				</div>
			)}

			{/* Footer */}
			<div className="flex justify-between items-center mt-4 pt-2 border-t border-primary-toned-100">
				<span className="text-xs text-primary-toned-400">
					Created: {formatDate(test.createdAt)} | Updated: {formatDate(test.updatedAt)}
				</span>
				<span className="text-xs text-primary-toned-400">ID: {test.id}</span>
			</div>
		</div>
	);
};

export default TestFullCard;
