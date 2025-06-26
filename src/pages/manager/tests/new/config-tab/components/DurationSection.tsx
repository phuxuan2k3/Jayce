import { ExamPersistCore } from "../../../../../../infra-test/ui-items/test/types";

export function DurationSection({
	minutesToAnswer,
	onChange,
}: {
	minutesToAnswer: number;
	onChange: (patch: Partial<Pick<ExamPersistCore, "minutesToAnswer">>) => void;
}) {
	return (
		<>
			<label htmlFor="test-duration">Duration:</label>
			<div className="flex items-center gap-x-4 w-full">
				<input
					id="test-duration"
					type="text"
					placeholder="Enter duration"
					className="w-1/6 h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
					value={minutesToAnswer}
					onChange={e => onChange({ minutesToAnswer: Number(e.target.value) || 1 })}
				/>
				<span className="text-sm text-primary-toned-500 text-ellipsis">Minutes</span>
			</div>
		</>
	);
}
