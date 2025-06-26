import { ExamPersistCore } from "../../../../../infra-test/ui-items/test/types";
import { TitleDescriptionSection } from "./components/TitleDescriptionSection";
import { DurationSection } from "./components/DurationSection";
import { OpenCloseTimeSection } from "./components/OpenCloseTimeSection";
import { RoomPasswordSection } from "./components/RoomPasswordSection";
import { AttemptsParticipantsSection } from "./components/AttemptsParticipantsSection";
import { VisibilitySection } from "./components/VisibilitySection";
import { LanguageSection } from "./components/LanguageSection";

export default function ConfigTab({
	examPersist,
	onExamPersistChange,
}: {
	examPersist: ExamPersistCore;
	onExamPersistChange: (configEdit: Partial<ExamPersistCore>) => void;
}) {
	const handleDetailChange = (detailPatch: Partial<ExamPersistCore["detail"]>) => {
		onExamPersistChange({
			detail: { ...examPersist.detail, ...detailPatch },
		});
	};

	const getDateValue = (dateStr: string | null) => {
		if (!dateStr) return "";
		const d = new Date(dateStr);
		return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
	};
	const getTimeValue = (dateStr: string | null) => {
		if (!dateStr) return "";
		const d = new Date(dateStr);
		return isNaN(d.getTime()) ? "" : d.toTimeString().slice(0, 5);
	};

	return (
		<div className="text-base [&>label]:text-primary [&>label]:font-semibold w-full h-full overflow-y-auto grid grid-cols-[auto_1fr] items-center place-items-end gap-y-6 gap-x-8 p-6 ">
			<div className="col-span-2 border-b border-primary-toned-300 w-full" />

			<TitleDescriptionSection
				title={examPersist.title}
				description={examPersist.description}
				onChange={(patch) => onExamPersistChange(patch)}
			/>

			<DurationSection
				minutesToAnswer={examPersist.minutesToAnswer}
				onChange={(patch) => onExamPersistChange(patch)}
			/>

			<div className="col-span-2 border-b border-primary-toned-300 w-full" />

			<OpenCloseTimeSection
				openDate={examPersist.detail.openDate}
				closeDate={examPersist.detail.closeDate}
				onChange={handleDetailChange}
				getDateValue={getDateValue}
				getTimeValue={getTimeValue}
			/>

			<RoomPasswordSection
				roomId={examPersist.detail.roomId}
				password={examPersist.detail.password}
				onChange={handleDetailChange}
			/>

			<AttemptsParticipantsSection
				numberOfAttemptsAllowed={examPersist.detail.numberOfAttemptsAllowed}
				numberOfParticipants={examPersist.detail.numberOfParticipants}
				onChange={handleDetailChange}
			/>

			<VisibilitySection
				isAnswerVisible={examPersist.detail.isAnswerVisible}
				isAllowedToSeeOtherResults={examPersist.detail.isAllowedToSeeOtherResults}
				isPublic={examPersist.detail.isPublic}
				onChange={handleDetailChange}
			/>

			<div className="col-span-2 border-b border-primary-toned-300 w-full" />

			<LanguageSection
				language={examPersist.language}
				onChange={(patch) => onExamPersistChange(patch)}
			/>
		</div>
	);
}
