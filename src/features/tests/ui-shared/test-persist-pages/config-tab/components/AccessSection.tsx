import { ExamPersistCoreSchema } from "../../../../ui-items/test/types";
import MyDescription from "../../../../ui/forms/MyDescription";
import MyFieldLayout from "../../../../ui/forms/MyFieldLayout";
import MyInput from "../../../../ui/forms/MyInput";
import MyLabel from "../../../../ui/forms/MyLabel";
import MySwitch from "../../../../ui/forms/MySwitch";

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
	return (
		<div className="flex flex-col gap-y-4 w-full">
			<div className="flex items-start gap-8 w-full">
				<MyFieldLayout className="flex-1">
					<MyLabel htmlFor="test-room-id">Room ID:</MyLabel>
					<MyInput
						id="test-room-id"
						type="text"
						placeholder="Room ID"
						value={roomId}
						onChange={e => onChange({ roomId: e.target.value })}
					/>
					<MyDescription text="Used by candidate to join" />
				</MyFieldLayout>

				<MyFieldLayout className="flex-1">
					<MyLabel htmlFor="test-password">Password:</MyLabel>
					<div className="flex items-center gap-x-2 w-full">
						<MyInput
							id="test-password"
							type="text"
							disabled={password === null || password === undefined}
							placeholder="Enter password"
							className={`${(password === null || password === undefined) && "bg-gray-200 cursor-not-allowed"}`}
							value={password || ""}
							onChange={e => {
								if (password !== null && password !== undefined) {
									onChange({ password: e.target.value });
								}
							}}
						/>
						<MySwitch
							id="test-password-required"
							checked={password !== null && password !== undefined}
							onChange={checked => onChange({ password: checked ? "" : null })}
							label={
								<MyLabel htmlFor="test-password-required" className="text-sm text-primary flex-shrink-0 cursor-pointer">
									Required
								</MyLabel>
							}
						/>
					</div>
					<MyDescription text="Password for candidates to join the test. (Optional)" />
				</MyFieldLayout>
			</div>

			<div className="grid grid-cols-[auto_1fr_auto_1fr] gap-x-8 gap-y-4 items-center w-full mt-4">
				<MyLabel htmlFor="test-open-date">From Date:</MyLabel>
				<MyInput
					id="test-open-date"
					type="date"
					value={getDateValue(openDate)}
					onChange={e => {
						const prev = openDate ? new Date(openDate) : new Date();
						const [year, month, day] = e.target.value.split("-");
						prev.setFullYear(Number(year), Number(month) - 1, Number(day));
						onChange({ openDate: prev.toISOString() });
					}}
				/>
				<MyLabel htmlFor="test-open-time">Time:</MyLabel>
				<MyInput
					id="test-open-time"
					type="time"
					value={getTimeValue(openDate)}
					onChange={e => {
						const prev = openDate ? new Date(openDate) : new Date();
						const [hours, minutes] = e.target.value.split(":");
						prev.setHours(Number(hours), Number(minutes));
						onChange({ openDate: prev.toISOString() });
					}}
				/>
				<MyLabel htmlFor="test-close-date">To Date:</MyLabel>
				<MyInput
					id="test-close-date"
					type="date"
					value={getDateValue(closeDate)}
					onChange={e => {
						const prev = closeDate ? new Date(closeDate) : new Date();
						const [year, month, day] = e.target.value.split("-");
						prev.setFullYear(Number(year), Number(month) - 1, Number(day));
						onChange({ closeDate: prev.toISOString() });
					}}
				/>
				<MyLabel htmlFor="test-close-time">Time:</MyLabel>
				<MyInput
					id="test-close-time"
					type="time"
					value={getTimeValue(closeDate)}
					onChange={e => {
						const prev = closeDate ? new Date(closeDate) : new Date();
						const [hours, minutes] = e.target.value.split(":");
						prev.setHours(Number(hours), Number(minutes));
						onChange({ closeDate: prev.toISOString() });
					}}
				/>
			</div>
		</div>
	);
}
