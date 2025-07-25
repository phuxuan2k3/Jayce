import { InformationSection } from "./components/InformationSection";
import { AccessSection } from "./components/AccessSection";
import { ConfigurationSection } from "./components/ConfigurationSection";
import { ExamPersistCoreSchema } from "../../../../../../../features/tests/ui-items/test/types";
import { useLanguage } from "../../../../../../../LanguageProvider";

export default function ConfigTab({
	initialValue,
	examPersist,
	onExamPersistChange,
}: {
	initialValue: ExamPersistCoreSchema;
	examPersist: ExamPersistCoreSchema;
	onExamPersistChange: (configEdit: Partial<ExamPersistCoreSchema>) => void;
}) {
	const { t } = useLanguage();

	const handleDetailChange = (detailPatch: Partial<ExamPersistCoreSchema["detail"]>) => {
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
		<div className="flex flex-col gap-4 p-6 ">
			<h3 className="text-2xl font-semibold text-primary mb-4">
				{t("config_tab_section_info")}
			</h3>

			<InformationSection
				title={examPersist.title}
				description={examPersist.description}
				minutesToAnswer={examPersist.minutesToAnswer}
				language={examPersist.language}
				onChange={(patch) => onExamPersistChange(patch)}
			/>

			<hr className="border-primary-toned-300 w-full my-2" />
			<h3 className="text-2xl font-semibold text-primary mb-4">
				{t("config_tab_section_access")}
			</h3>

			<AccessSection
				initialValues={initialValue.detail}
				openDate={examPersist.detail.openDate}
				closeDate={examPersist.detail.closeDate}
				roomId={examPersist.detail.roomId}
				password={examPersist.detail.password}
				onChange={handleDetailChange}
				getDateValue={getDateValue}
				getTimeValue={getTimeValue}
			/>

			<hr className="border-primary-toned-300 w-full my-2" />
			<h3 className="text-2xl font-semibold text-primary mb-4">
				{t("config_tab_section_config")}
			</h3>

			<ConfigurationSection
				numberOfAttemptsAllowed={examPersist.detail.numberOfAttemptsAllowed}
				numberOfParticipants={examPersist.detail.numberOfParticipants}
				isAnswerVisible={examPersist.detail.isAnswerVisible}
				isAllowedToSeeOtherResults={examPersist.detail.isAllowedToSeeOtherResults}
				isPublic={examPersist.detail.isPublic}
				onChange={handleDetailChange}
			/>
		</div>
	);
}
