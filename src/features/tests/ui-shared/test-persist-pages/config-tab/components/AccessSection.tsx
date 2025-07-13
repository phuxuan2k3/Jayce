import { useEffect, useState } from "react";
import { ExamPersistCoreSchema } from "../../../../ui-items/test/types";
import MyDescription from "../../../../ui/forms/MyDescription";
import MyFieldLayout from "../../../../ui/forms/MyFieldLayout";
import MyInput from "../../../../ui/forms/MyInput";
import MyLabel from "../../../../ui/forms/MyLabel";
import MySwitch from "../../../../ui/forms/MySwitch";
import MyDateInput from "../../../../ui/forms/MyDateInput";
import MyTimeInput from "../../../../ui/forms/MyTimeInput";
import { Dices } from "lucide-react";
import { useLazyGetTestsSuggestRoomidQuery } from "../../../../api/test.api-gen-v2";
import { cn } from "../../../../../../app/cn";
import { useLanguage } from "../../../../../../LanguageProvider";

export function AccessSection({
	roomId,
	password,
	openDate,
	closeDate,
	onChange,
	getDateValue,
	getTimeValue,
}: {
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
	const [genRoomId, { isFetching, isSuccess, error, data }] = useLazyGetTestsSuggestRoomidQuery();

	useEffect(() => {
		if (isSuccess && data) {
			onChange({ roomId: data.roomId });
		}
	}, [isSuccess, data]);

	return (
		<div className="flex flex-col gap-y-4 w-full">
			<div className="flex items-start gap-8 w-full">
				<MyFieldLayout className="flex-1">
					<div className="flex items-baseline justify-between w-full">
						<MyLabel htmlFor="test-room-id">{t("access_section_room_id_label")}:</MyLabel>
						{error == null ? (
							<MyDescription text={t("access_section_room_id_generate")} />
						) : (
							<MyDescription className="text-red-500" text="Error fetching room ID" />
						)}
					</div>
					<div className="flex items-center gap-x-2 w-full">
						<MyInput
							id="test-room-id"
							type="text"
							placeholder={t("access_section_room_id_placeholder")}
							value={roomId}
							onChange={e => onChange({ roomId: e.target.value })}
						/>
						<div className="rounded-lg bg-primary/10 p-2 cursor-pointer hover:bg-primary/20 transition-colors text-primary"
							onClick={() => {
								if (isFetching) return;
								genRoomId({
									endDate: closeDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
									startDate: openDate || new Date(Date.now()).toISOString(),
								});
							}}>
							<Dices className={cn(
								(isFetching) && "animate-spin text-primary/50",
							)} />
						</div>
					</div>
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
				/>
			</div>
		</div>
	);
}
