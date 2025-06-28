import { ExamPersistCoreSchema } from "../../../../ui-items/test/types";

export function OpenCloseTimeSection({
	openDate,
	closeDate,
	onChange,
	getDateValue,
	getTimeValue,
}: {
	openDate: string | null;
	closeDate: string | null;
	onChange: (patch: Partial<ExamPersistCoreSchema["detail"]>) => void;
	getDateValue: (dateStr: string | null) => string;
	getTimeValue: (dateStr: string | null) => string;
}) {
	return (
		<>
			<label>Open time:</label>
			<div className="flex flex-col gap-y-4 w-full">
				<div className="flex items-center gap-x-2">
					<label htmlFor="test-open-date" className="text-sm text-primary-toned-500 min-w-fit">From Date:</label>
					<input
						id="test-open-date"
						type="date"
						className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
						value={getDateValue(openDate)}
						onChange={e => {
							const prev = openDate ? new Date(openDate) : new Date();
							const [year, month, day] = e.target.value.split("-");
							prev.setFullYear(Number(year), Number(month) - 1, Number(day));
							onChange({ openDate: prev.toISOString() });
						}}
					/>
					<label htmlFor="test-open-time" className="text-sm text-primary-toned-500 min-w-fit">Time:</label>
					<input
						id="test-open-time"
						type="time"
						className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
						value={getTimeValue(openDate)}
						onChange={e => {
							const prev = openDate ? new Date(openDate) : new Date();
							const [hours, minutes] = e.target.value.split(":");
							prev.setHours(Number(hours), Number(minutes));
							onChange({ openDate: prev.toISOString() });
						}}
					/>
				</div>
				<div className="flex items-center gap-x-2">
					<label htmlFor="test-close-date" className="text-sm text-primary-toned-500 min-w-fit">To Date:</label>
					<input
						id="test-close-date"
						type="date"
						className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
						value={getDateValue(closeDate)}
						onChange={e => {
							const prev = closeDate ? new Date(closeDate) : new Date();
							const [year, month, day] = e.target.value.split("-");
							prev.setFullYear(Number(year), Number(month) - 1, Number(day));
							onChange({ closeDate: prev.toISOString() });
						}}
					/>
					<label htmlFor="test-close-time" className="text-sm text-primary-toned-500 min-w-fit">Time:</label>
					<input
						id="test-close-time"
						type="time"
						className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
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
		</>
	);
}
