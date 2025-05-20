import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faClock, faCalendarAlt, faTasks, faKey, faGlobe } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ExamCore } from "../../../../../features/tests/model/test.model";

interface Props {
	test: ExamCore;
	onEdit: (testId: string) => void;
	onDelete: (testId: string) => void;
	onTestClick: (testId: string) => void;
}

const TestExamCard: React.FC<Props> = ({
	test,
	onEdit,
	onDelete,
	onTestClick,
}) => {
	return (
		<div
			className="flex flex-col gap-4 rounded-lg p-6 border bg-primary-toned-50 border-primary text-primary shadow-md cursor-pointer hover:shadow-lg transition-shadow"
			onClick={() => onTestClick(test.id)}
		>
			<div className="flex justify-between items-start">
				<h3 className="text-xl font-semibold text-primary-emphasis">{test.title}</h3>
				<div className="flex gap-3">
					<button
						onClick={(e) => {
							e.stopPropagation();
							onEdit(test.id);
						}}
						className="text-blue-600 hover:text-blue-800 transition-colors"
						aria-label="Edit test"
					>
						<FontAwesomeIcon icon={faPen} />
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							onDelete(test.id);
						}}
						className="text-red-600 hover:text-red-800 transition-colors"
						aria-label="Delete test"
					>
						<FontAwesomeIcon icon={faTrash} />
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2 text-sm">
					<FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
					<span>{test.language}</span>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<FontAwesomeIcon icon={faClock} className="w-4 h-4" />
					<span>{test.minutesToAnswer} minutes</span>
				</div>
			</div>

			<div className="border-t border-primary-toned-200 mt-2 pt-3 flex flex-col gap-2">
				<div className="flex items-center gap-2 text-sm">
					<FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
					<span>Open: {new Date(test.openDate).toLocaleDateString()}</span>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
					<span>Close: {new Date(test.closeDate).toLocaleDateString()}</span>
				</div>
				<div className="flex items-center gap-2 text-sm">
					<FontAwesomeIcon icon={faTasks} className="w-4 h-4" />
					<span>Attempts: {test.numberOfAttemptsAllowed}</span>
				</div>
				{test.hasPassword && (
					<div className="flex items-center gap-2 text-sm text-accent-A200">
						<FontAwesomeIcon icon={faKey} className="w-4 h-4" />
						<span>Password protected</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default TestExamCard;