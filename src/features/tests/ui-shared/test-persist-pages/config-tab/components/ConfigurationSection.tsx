import { ExamPersistCoreSchema } from "../../../../ui-items/test/types";
import MyDescription from "../../../../ui/forms/MyDescription";
import MyFieldLayout from "../../../../ui/forms/MyFieldLayout";
import MyInput from "../../../../ui/forms/MyInput";
import MyLabel from "../../../../ui/forms/MyLabel";
import MyCheckbox from "../../../../ui/forms/MyCheckbox";
import MySwitch from "../../../../ui/forms/MySwitch";
import { useState } from "react";
import { useLanguage } from "../../../../../../LanguageProvider";

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
	
	const [numberOfAttemptsAllowedDraft, setNumberOfAttemptsAllowedDraft] = useState<number>(numberOfAttemptsAllowed || 1);
	const [numberOfParticipantsDraft, setNumberOfParticipantsDraft] = useState<number>(numberOfParticipants || 1);

	return (
		<div className="flex flex-col gap-y-4 w-full">
			<div className="grid grid-cols-[2fr_3fr] gap-x-8 gap-y-4 w-full">
				<MyFieldLayout className="order-1">
					<MySwitch
						checked={numberOfAttemptsAllowed != null && numberOfAttemptsAllowed > 0}
						onChange={checked => onChange({
							numberOfAttemptsAllowed: checked
								? numberOfAttemptsAllowedDraft
								: undefined
						})}
						id="max-attempts-switch"
						label={
							<MyLabel htmlFor="max-attempts">{t("config_section_max_attempts_label")}:</MyLabel>
						}
						className="flex-row-reverse items-end justify-between w-full mb-1"
					/>
					<MyInput
						id="max-attempts"
						type="number"
						min="1"
						placeholder={t("config_section_max_attempts_placeholder")}
						disabled={numberOfAttemptsAllowed === undefined}
						value={numberOfAttemptsAllowed || ''}
						onChange={e => {
							onChange({ numberOfAttemptsAllowed: Number(e.target.value) })
							setNumberOfAttemptsAllowedDraft(Number(e.target.value));
						}}
					/>
					<MyDescription text={t("config_section_max_attempts_description")} />
				</MyFieldLayout>

				<MyFieldLayout className="order-3">
					<MySwitch
						checked={numberOfParticipants !== undefined && numberOfParticipants > 0}
						onChange={checked => onChange({
							numberOfParticipants: checked
								? numberOfParticipantsDraft
								: undefined
						})}
						id="test-participants-switch"
						label={
							<MyLabel htmlFor="test-participants">{t("config_section_max_participants_label")}:</MyLabel>
						}
						className="flex-row-reverse items-end justify-between w-full mb-1"
					/>

					<MyInput
						id="test-participants"
						type="number"
						min="1"
						placeholder={t("config_section_max_participants_placeholder")}
						disabled={numberOfParticipants === undefined}
						value={numberOfParticipants || ''}
						onChange={e => {
							onChange({ numberOfParticipants: Number(e.target.value) })
							setNumberOfParticipantsDraft(Number(e.target.value));
						}}
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
