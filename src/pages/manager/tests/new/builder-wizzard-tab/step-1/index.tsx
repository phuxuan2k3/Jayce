import { BuilderStep1Type } from "../../common/step-schema";
import { LanguagesAsConst, LanguageType } from "../../common/base-schema";
import MyLabel from "../../../../../../features/tests/ui/forms/MyLabel";
import MyFieldLayout from "../../../../../../features/tests/ui/forms/MyFieldLayout";
import MyInput from "../../../../../../features/tests/ui/forms/MyInput";
import MyTextArea from "../../../../../../features/tests/ui/forms/MyTextArea";
import MySelect from "../../../../../../features/tests/ui/forms/MySelect";
import { useLanguage } from "../../../../../../LanguageProvider";

export default function Step1({
	data,
	onDataChange,
}: {
	data: BuilderStep1Type;
	onDataChange: (data: BuilderStep1Type) => void;
}) {
	const { t } = useLanguage();

	return (
		<div className="text-base w-full h-full flex flex-col gap-4">

			<MyFieldLayout>
				<MyLabel htmlFor="test-title">{t("step1_title_label")}:</MyLabel>
				<MyInput
					id="test-title"
					name="title"
					aria-label={t("step1_title_aria")}
					value={data.title}
					onChange={(e) =>
						onDataChange({
							...data,
							title: e.target.value,
						})
					}
					placeholder={t("step1_title_placeholder")}
				/>
			</MyFieldLayout>

			<MyFieldLayout>
				<MyLabel htmlFor="test-description">
					{t("step1_description_label")}:
				</MyLabel>
				<MyTextArea
					id="test-description"
					isAutoSized={false}
					name="description"
					aria-label={t("step1_description_aria")}
					rows={3}
					placeholder={t("step1_description_placeholder")}
					value={data.description}
					onChange={(e) =>
						onDataChange({
							...data,
							description: e.target.value,
						})
					}
				/>
			</MyFieldLayout>

			<MyFieldLayout>
				<MyLabel htmlFor="test-language">{t("step1_language_label")}:</MyLabel>
				<MySelect
					options={LanguagesAsConst.map((lang) => ({
						value: lang,
						label: lang,
					}))}
					id="test-language"
					aria-label={t("step1_language_aria")}
					name="language"
					value={data.language}
					onChange={(e) =>
						onDataChange({
							...data,
							language: e as LanguageType || "English",
						})
					}
				/>
			</MyFieldLayout>
		</div>
	);
}
