import { ExamConfigPersist } from "../../../../../../../../infra-test/core/test.model";

interface SettingsFieldsProps {
	examConfigPersist: ExamConfigPersist;
	onExamConfigChange: (config: Partial<ExamConfigPersist>) => void;
}

export default function SettingsFields({ examConfigPersist, onExamConfigChange }: SettingsFieldsProps) {
	return (
		<>
			<label htmlFor="max-attempts">
				Attempts:
			</label>
			<div className="flex items-center gap-x-4 w-full">
				<input
					id="max-attempts"
					type="number"
					min="1"
					placeholder="Number of attempts"
					className="w-1/2 h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
					value={examConfigPersist.numberOfAttemptsAllowed || ""}
					onChange={(e) => onExamConfigChange({
						numberOfAttemptsAllowed: e.target.value ? Number(e.target.value) : null,
					})}
				/>
				<span className="text-sm text-primary-toned-500 text-ellipsis">
					Maximum attempts allowed per participant (leave empty for unlimited)
				</span>
			</div>

			<div className="col-start-2 flex flex-col gap-2 w-full">
				<div className="flex items-center gap-x-2">
					<input
						type="checkbox"
						id="show-results"
						className="mr-2"
						checked={examConfigPersist.isAnswerVisible}
						onChange={(e) => onExamConfigChange({
							isAnswerVisible: e.target.checked,
						})}
					/>
					<span className="text-sm text-primary-toned-500">Allow participants to see their results after completion</span>
				</div>
				<div className="flex items-center gap-x-2">
					<input
						type="checkbox"
						id="show-results-others"
						className="mr-2"
						checked={examConfigPersist.isAllowedToSeeOtherResults}
						onChange={(e) => onExamConfigChange({
							isAllowedToSeeOtherResults: e.target.checked,
						})}
					/>
					<span className="text-sm text-primary-toned-500">Allow participants to see results of other participants</span>
				</div>
			</div>
		</>
	);
}
