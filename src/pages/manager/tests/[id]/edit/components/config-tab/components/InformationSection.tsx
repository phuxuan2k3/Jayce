import { ExamPersistCoreSchema } from "../../../../../../../../features/tests/ui-items/test/types";
import MyDescription from "../../../../../../../../features/tests/ui/forms/MyDescription";
import MyFieldLayout from "../../../../../../../../features/tests/ui/forms/MyFieldLayout";
import MyInput from "../../../../../../../../features/tests/ui/forms/MyInput";
import MyLabel from "../../../../../../../../features/tests/ui/forms/MyLabel";
import MyNumberInput from "../../../../../../../../features/tests/ui/forms/MyNumberInput";
import MySelect from "../../../../../../../../features/tests/ui/forms/MySelect";
import MyTextArea from "../../../../../../../../features/tests/ui/forms/MyTextArea";
import { useLanguage } from "../../../../../../../../LanguageProvider";
import { LanguagesAsConst, LanguageType } from "../../../../../new/common/base-schema";

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
