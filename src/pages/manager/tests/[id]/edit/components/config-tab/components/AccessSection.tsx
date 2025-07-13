import { useState } from "react";
import { ExamPersistCoreSchema } from "../../../../../../../../features/tests/ui-items/test/types";
import MyDateInput from "../../../../../../../../features/tests/ui/forms/MyDateInput";
import MyDescription from "../../../../../../../../features/tests/ui/forms/MyDescription";
import MyFieldLayout from "../../../../../../../../features/tests/ui/forms/MyFieldLayout";
import MyInput from "../../../../../../../../features/tests/ui/forms/MyInput";
import MyLabel from "../../../../../../../../features/tests/ui/forms/MyLabel";
import MySwitch from "../../../../../../../../features/tests/ui/forms/MySwitch";
import MyTimeInput from "../../../../../../../../features/tests/ui/forms/MyTimeInput";
import { InfoIcon } from "lucide-react";
import { useLanguage } from "../../../../../../../../LanguageProvider";

export function AccessSection({
	initialValues,
	roomId,
	password,
	openDate,
	closeDate,
	onChange,
	getDateValue,
	getTimeValue,
}: {
	initialValues?: Partial<ExamPersistCoreSchema["detail"]>;
	roomId: string;
	password?: string | null;
	openDate: string | null;
	closeDate: string | null;
	onChange: (patch: Partial<ExamPersistCoreSchema["detail"]>) => void;
	getDateValue: (dateStr: string | null) => string;
	getTimeValue: (dateStr: string | null) => string;
}) {
	const { t } = useLanguage();

	const [passwordDraft, setPasswordDraft] = useState<string>(password || "");

	return (
		<div className="flex flex-col gap-y-4 w-full">
			<div className="flex items-start gap-8 w-full">
				<MyFieldLayout className="flex-1">
					<MyLabel htmlFor="test-room-id">{t("access_section_room_id_label")}:</MyLabel>
					<MyInput
						id="test-room-id"
						type="text"
						placeholder={t("access_section_room_id_placeholder")}
						disabled
						value={roomId}
						onChange={e => onChange({ roomId: e.target.value })}
					/>
					<MyDescription text={t("access_section_room_id_description")} />
				</MyFieldLayout>

				<MyFieldLayout className="flex-1">
					<MyLabel htmlFor="test-password">{t("access_section_password_label")}:</MyLabel>
					<div className="flex items-center gap-x-2 w-full">
						<MyInput
							id="test-password"
							type="text"
							disabled={password == null}
							placeholder={t("access_section_password_placeholder")}
							className={`${(password == null) && "bg-gray-200 cursor-not-allowed"}`}
							value={password || ""}
							onChange={e => {
								if (password != null) {
									onChange({ password: e.target.value });
									setPasswordDraft(e.target.value);
								}
							}}
						/>
						<MySwitch
							id="test-password-required"
							checked={password != null}
							onChange={checked => onChange({
								password: checked
									? passwordDraft
									: null
							})}
							label={
								<MyLabel htmlFor="test-password-required" className="text-sm text-primary flex-shrink-0 cursor-pointer">
									{t("access_section_password_required")}
								</MyLabel>
							}
						/>
					</div>
					<MyDescription text={t("access_section_password_description")} />
				</MyFieldLayout>
			</div>

			<div className="flex p-4 bg-primary-toned-50 rounded-md mt-4">
				<div className="flex items-center gap-2 w-full">
					<InfoIcon className="text-primary w-5 h-5" />
					<span className="text-primary-toned-700 text-sm">{t("access_section_date_warning")}</span>
				</div>
			</div>

			<div className="grid grid-cols-[auto_1fr_auto_1fr] gap-x-8 gap-y-4 items-center w-full mt-4">
				<MyLabel htmlFor="test-open-date">{t("access_section_from_date")}:</MyLabel>
				<MyDateInput
					id="test-open-date"
					value={getDateValue(openDate)}
					onChange={(date) => {
						const prev = openDate ? new Date(openDate) : new Date();
						const [year, month, day] = date.split("-");
						prev.setFullYear(Number(year), Number(month) - 1, Number(day));
						onChange({ openDate: prev.toISOString() });
					}}
					max={initialValues?.openDate ? getDateValue(initialValues.openDate) : undefined}
				/>
				<MyLabel htmlFor="test-open-time">{t("access_section_from_time")}:</MyLabel>
				<MyTimeInput
					id="test-open-time"
					value={getTimeValue(openDate)}
					onChange={e => {
						const prev = openDate ? new Date(openDate) : new Date();
						const [hours, minutes] = e.split(":");
						prev.setHours(Number(hours), Number(minutes));
						onChange({ openDate: prev.toISOString() });
					}}
					format="12"
					max={initialValues?.openDate
						? getDateValue(initialValues.openDate) === getDateValue(openDate)
							? getTimeValue(initialValues.openDate)
							: undefined
						: undefined
					}
				/>
				<MyLabel htmlFor="test-close-date">{t("access_section_to_date")}:</MyLabel>
				<MyDateInput
					id="test-close-date"
					value={getDateValue(closeDate)}
					onChange={(date) => {
						const prev = closeDate ? new Date(closeDate) : new Date();
						const [year, month, day] = date.split("-");
						prev.setFullYear(Number(year), Number(month) - 1, Number(day));
						onChange({ closeDate: prev.toISOString() });
					}}
					min={initialValues?.closeDate ? getDateValue(initialValues.closeDate) : undefined}
				/>
				<MyLabel htmlFor="test-close-time">{t("access_section_to_time")}:</MyLabel>
				<MyTimeInput
					id="test-close-time"
					value={getTimeValue(closeDate)}
					onChange={e => {
						const prev = closeDate ? new Date(closeDate) : new Date();
						const [hours, minutes] = e.split(":");
						prev.setHours(Number(hours), Number(minutes));
						onChange({ closeDate: prev.toISOString() });
					}}
					format="12"
					min={initialValues?.closeDate
						? getDateValue(initialValues.closeDate) === getDateValue(closeDate)
							? getTimeValue(initialValues.closeDate)
							: undefined
						: undefined
					}
				/>
			</div>
		</div>
	);
}
