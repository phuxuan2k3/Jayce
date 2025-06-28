import { ExamPersistCoreSchema } from "../../../../ui-items/test/types";

export function AttemptsParticipantsSection({
	numberOfAttemptsAllowed,
	numberOfParticipants,
	onChange,
}: {
	numberOfAttemptsAllowed?: number;
	numberOfParticipants?: number;
	onChange: (patch: Partial<ExamPersistCoreSchema["detail"]>) => void;
}) {
	return (
		<>
			<label htmlFor="max-attempts">Attempts:</label>
			<div className="flex items-center gap-x-4 w-full">
				<input
					id="max-attempts"
					type="number"
					defaultValue={1}
					min="1"
					placeholder="Number of attempts"
					className="w-1/2 h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
					value={numberOfAttemptsAllowed || 1}
					onChange={e => onChange({ numberOfAttemptsAllowed: Number(e.target.value) })}
				/>
				<span className="text-sm text-primary-toned-500 text-ellipsis">Maximum attempts allowed per participant</span>
			</div>
			<label htmlFor="test-participants" className="min-w-fit">Participants:</label>
			<div className="flex items-center gap-x-4 w-full">
				<input
					id="test-participants"
					type="number"
					min="1"
					placeholder="Number of participants"
					className="w-1/2 h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
					value={numberOfParticipants || ''}
					onChange={e => onChange({ numberOfParticipants: e.target.value ? Number(e.target.value) : undefined })}
				/>
				<span className="text-sm text-primary-toned-500 text-ellipsis">Maximum participants allowed</span>
			</div>
		</>
	);
}
