import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faClock } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface TestItemProps {
	test: {
		id: number;
		title: string;
		answerCount: number;
		minutesToAnswer: number;
	};
	onEdit: (testId: number) => void;
	onDelete: (testId: number) => void;
	onViewSubmissions: (testId: number) => void;
}

const TestItem: React.FC<TestItemProps> = ({ test, onEdit, onDelete, onViewSubmissions }) => {
	return (
		<div className="flex flex-col gap-4 rounded-lg p-6 border bg-primary-toned-50 border-primary items-between text-primary shadow-md">
			<div className="flex items-center gap-4">
				<div>
					<span
						className="text-primary font-semibold cursor-pointer"
						onClick={() => onViewSubmissions(test.id)}
					>
						View submissions ({test.answerCount})
					</span>
				</div>

				<div
					className="cursor-pointer ml-auto"
					onClick={() => onEdit(test.id)}
				>
					<FontAwesomeIcon className="h-5 w-5" icon={faPen} />
				</div>
				<div
					className="cursor-pointer text-secondary"
					onClick={() => onDelete(test.id)}
				>
					<FontAwesomeIcon className="h-5 w-5" icon={faTrash} />
				</div>
			</div>

			<hr className="border-primary-toned-300" />

			<h2 className="font-bold text-2xl">
				<span>{test.title}</span>
			</h2>

			<span>#description</span>

			<div className="flex justify-between">
				<div className="flex items-center">
					<div className="flex items-center">
						<FontAwesomeIcon className="h-4 w-4" icon={faClock} />
						<span className="ml-2  font-semibold">{test.minutesToAnswer} minutes</span>
					</div>
				</div>
				<span className="font-bold mb-2">
					{test.answerCount} Questions
				</span>
			</div>
		</div>
	);
};

export default TestItem;