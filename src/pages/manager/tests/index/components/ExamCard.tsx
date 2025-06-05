import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt, faTasks, faKey, faGlobe, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ExamCore } from "../../../../../infra-test/core/test.model";
import { Trash2 } from "lucide-react";

interface Props {
	test: ExamCore;
	onDelete: () => void;
	onTestClick: (testId: string) => void;
}

const ExamCard: React.FC<Props> = ({
	test,
	onDelete,
	onTestClick,
}) => {

	return (
		<div
			className="flex flex-col gap-4 rounded-lg py-6 px-8 border bg-primary-toned-50 border-primary text-primary shadow-md cursor-pointer hover:shadow-lg hover:shadow-primary transition-shadow"
			onClick={() => onTestClick(test.id)}
		>
			<div className="flex items-start w-full justify-between">
				<h3 className="text-xl font-semibold text-primary-emphasis">{test.title}</h3>
				<button
					className={`text-white bg-red-500 p-2 rounded-full transition-opacity duration-300 opacity-50 hover:opacity-100 `}
					aria-label="Delete exam"
					onClick={(e) => {
						onDelete();
						e.stopPropagation();
					}}
				>
					<Trash2 size={18} />
				</button>
			</div>

			<InfoItem
				icon={<FontAwesomeIcon icon={faCircleInfo} className="w-4 h-4" />}
				text={test.description}
			/>

			<hr className="border-primary-toned-300" />

			<div className="grid grid-cols-2 gap-2">
				<InfoItem
					icon={<FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />}
					text={`Language: ${test.language}`}
				/>
				<InfoItem
					icon={<FontAwesomeIcon icon={faClock} className="w-4 h-4" />}
					text={`Time limit: ${test.minutesToAnswer} minutes`}
				/>
				<InfoItem
					icon={<FontAwesomeIcon icon={faTasks} className="w-4 h-4" />}
					text={`Attempts: ${test.numberOfAttemptsAllowed}`}
				/>
				<InfoItem
					icon={<FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />}
					text={`Open: ${new Date(test.openDate).toLocaleDateString()}`}
				/>
				<InfoItem
					icon={<FontAwesomeIcon icon={faKey} className="w-4 h-4" />}
					text={`Password: ${test.hasPassword ? "Protected" : "None"}`}
				/>
				<InfoItem
					icon={<FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />}
					text={`Close: ${new Date(test.closeDate).toLocaleDateString()}`}
				/>
			</div>
		</div>
	);
};

export default ExamCard;

const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
	<div className="flex items-center gap-2 text-sm">
		{icon}
		<span>{text}</span>
	</div>
);