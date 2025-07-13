import { ExamPersistCoreSchema } from "../../../../ui-items/test/types";
import MyLabel from "../../../../ui/forms/MyLabel";
import MyInput from "../../../../ui/forms/MyInput";
import MyTextArea from "../../../../ui/forms/MyTextArea";
import MyFieldLayout from "../../../../ui/forms/MyFieldLayout";
import MyDescription from "../../../../ui/forms/MyDescription";
import MyNumberInput from "../../../../ui/forms/MyNumberInput";
import MySelect from "../../../../ui/forms/MySelect";
import { LanguagesAsConst, LanguageType } from "../../../../../../pages/manager/tests/new/common/base-schema";
import { useLanguage } from "../../../../../../LanguageProvider";

export function InformationSection({
	title,
	description,
	minutesToAnswer,
	language,
	onChange,
}: {
	title: string;
	description: string;
	minutesToAnswer: number;
	language: string;
	onChange: (patch: Partial<Pick<ExamPersistCoreSchema, "title" | "description" | "minutesToAnswer" | "language">>) => void;
}) {
	const { t } = useLanguage();

	return (
		<div className="flex flex-col gap-y-4 w-full">
			<MyFieldLayout>
				<MyLabel htmlFor="test-title">{t("info_section_title_label")}:</MyLabel>
				<MyInput
					id="test-title"
					type="text"
					placeholder={t("info_section_title_placeholder")}
					className=""
					value={title}
					onChange={e => onChange({ title: e.target.value })}
				/>
			</MyFieldLayout>
			<MyFieldLayout>
				<MyLabel htmlFor="test-description">{t("info_section_description_label")}:</MyLabel>
				<MyTextArea
					id="test-description"
					placeholder={t("info_section_description_placeholder")}
					value={description}
					onChange={e => onChange({ description: e.target.value })}
				/>
			</MyFieldLayout>
			<div className="flex items-start gap-8 mt-4">
				<MyFieldLayout className="flex-1">
					<MyLabel htmlFor="test-duration">{t("info_section_duration_label")}:</MyLabel>
					<MyNumberInput
						id="test-duration"
						placeholder={t("info_section_duration_placeholder")}
						value={minutesToAnswer}
						onChange={e => onChange({ minutesToAnswer: Number(e.target.value) || 1 })}
						min={1}
					/>
					<MyDescription text={t("info_section_duration_description")} />
				</MyFieldLayout>
				<MyFieldLayout className="flex-1">
					<MyLabel htmlFor="test-language">{t("info_section_language_label")}:</MyLabel>
					<MySelect
						id="test-language"
						placeholder={t("info_section_language_placeholder")}
						value={language}
						options={LanguagesAsConst.map(lang => ({
							value: lang,
							label: lang,
						}))}
						onChange={(value) => onChange({ language: value as LanguageType || "English" })}
					/>
					<MyDescription text={t("info_section_language_description")} />
				</MyFieldLayout>
			</div>
		</div>
	);
}
