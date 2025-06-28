import { ExamPersistCoreSchema } from "../../../../ui-items/test/types";

export function RoomPasswordSection({
	roomId,
	password,
	onChange,
}: {
	roomId: string;
	password?: string | null;
	onChange: (patch: Partial<ExamPersistCoreSchema["detail"]>) => void;
}) {
	return (
		<>
			<label htmlFor="test-room-id">Room ID:</label>
			<input
				id="test-room-id"
				type="text"
				placeholder="Room ID"
				className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
				value={roomId}
				onChange={e => onChange({ roomId: e.target.value })}
			/>
			<label htmlFor="test-password">Password:</label>
			<div className="flex items-center gap-x-4 w-full">
				<div className="flex items-center gap-x-2">
					<input
						type="checkbox"
						id="use-password"
						className="mr-2"
						checked={password !== null && password !== undefined}
						onChange={e => onChange({ password: e.target.checked ? "" : null })}
					/>
					<label htmlFor="use-password" className="text-sm text-primary-toned-500">Require password</label>
				</div>
				<input
					id="test-password"
					type="text"
					disabled={password === null || password === undefined}
					placeholder="Enter password"
					className={`w-1/3 h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2 ${password === null || password === undefined ? "bg-gray-200 cursor-not-allowed" : ""}`}
					value={password || ""}
					onChange={e => {
						if (password !== null && password !== undefined) {
							onChange({ password: e.target.value });
						}
					}}
				/>
			</div>
		</>
	);
}
