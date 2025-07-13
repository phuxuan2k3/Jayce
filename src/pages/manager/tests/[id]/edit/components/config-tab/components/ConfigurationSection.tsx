import { ExamPersistCoreSchema } from "../../../../../../../../features/tests/ui-items/test/types";
import MyCheckbox from "../../../../../../../../features/tests/ui/forms/MyCheckbox";
import MyDescription from "../../../../../../../../features/tests/ui/forms/MyDescription";
import MyFieldLayout from "../../../../../../../../features/tests/ui/forms/MyFieldLayout";
import MyInput from "../../../../../../../../features/tests/ui/forms/MyInput";
import MyLabel from "../../../../../../../../features/tests/ui/forms/MyLabel";
import { InfoIcon } from "lucide-react";
import { useLanguage } from "../../../../../../../../LanguageProvider";

export function ConfigurationSection({
	numberOfAttemptsAllowed,
	numberOfParticipants,
	isAnswerVisible,
	isAllowedToSeeOtherResults,
	isPublic,
	onChange,
}: {
	numberOfAttemptsAllowed?: number;
	numberOfParticipants?: number;
	isAnswerVisible: boolean;
	isAllowedToSeeOtherResults: boolean;
	isPublic?: boolean;
	onChange: (patch: Partial<ExamPersistCoreSchema["detail"]>) => void;
}) {
	const { t } = useLanguage();

	return (
		<div className="flex flex-col gap-y-4 w-full">
			<div className="flex p-4 bg-primary-toned-50 rounded-md mb-2">
				<div className="flex items-center gap-2 w-full">
					<InfoIcon className="text-primary w-5 h-5" />
					<span className="text-primary-toned-700 text-sm">{t("config_section_info")}</span>
				</div>
			</div>

			<div className="grid grid-cols-[2fr_3fr] gap-x-8 gap-y-4 w-full">
				<MyFieldLayout className="order-1">
					<MyLabel htmlFor="max-attempts">{t("config_section_max_attempts_label")}:</MyLabel>
					<MyInput
						id="max-attempts"
						type="number"
						disabled
						min="1"
						placeholder={t("config_section_max_attempts_placeholder")}
						value={numberOfAttemptsAllowed || 'Unlimited'}
					/>
					<MyDescription text={t("config_section_max_attempts_description")} />
				</MyFieldLayout>

				<MyFieldLayout className="order-3">
					<MyLabel htmlFor="test-participants">{t("config_section_max_participants_label")}:</MyLabel>
					<MyInput
						id="test-participants"
						type="number"
						min="1"
						placeholder={t("config_section_max_participants_placeholder")}
						disabled
						value={numberOfParticipants || 'Unlimited'}
					/>
					<MyDescription text={t("config_section_max_participants_description")} />
				</MyFieldLayout>


				<div className="order-2 row-span-2 flex flex-col gap-4 w-full h-full items-start justify-center bg-primary-toned-50 px-8 py-8 rounded-lg text-wrap">
					<h3 className="text-xl font-semibold text-primary-toned-700 mb-2">{t("config_section_exam_options")}</h3>

					<MyCheckbox
						id="show-results"
						checked={isAnswerVisible}
						onChange={checked => onChange({ isAnswerVisible: checked })}
						label={
							<MyDescription
								flexShrink0={false}
								text={t("config_section_checkbox_see_result")}
							/>
						}
					/>
					<MyCheckbox
						id="show-results-others"
						checked={isAllowedToSeeOtherResults}
						onChange={checked => onChange({ isAllowedToSeeOtherResults: checked })}
						label={
							<MyDescription
								flexShrink0={false}
								text={t("config_section_checkbox_see_others")}
							/>
						}
					/>
					<MyCheckbox
						id="is-public"
						checked={!!isPublic}
						onChange={checked => onChange({ isPublic: checked })}
						label={
							<MyDescription
								flexShrink0={false}
								text={t("config_section_checkbox_is_public")}
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
}
