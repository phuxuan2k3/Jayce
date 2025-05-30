import { ExamConfigPersist } from "../../../../../../../../infra-test/core/test.model";
import { ValidationErrors } from "../hooks/useStep1Validation";

interface SecurityFieldsProps {
	examConfigPersist: ExamConfigPersist;
	onFieldChange: (field: keyof ExamConfigPersist, value: any) => void;
	errors: ValidationErrors;
}

export default function SecurityFields({ examConfigPersist, onFieldChange, errors }: SecurityFieldsProps) {
	return (
		<>
			<label htmlFor="test-password">
				Password:
			</label>
			<div className="flex flex-col gap-2 w-full">
				<div className="flex items-center gap-x-4 w-full">
					<div className="flex items-center gap-x-2">
						<input
							type="checkbox"
							id="use-password"
							className="mr-2"
							checked={examConfigPersist.password !== null && examConfigPersist.password !== undefined}
							onChange={(e) => {
								onFieldChange('password', e.target.checked ? "" : null);
							}}
						/>
						<span className="text-sm text-primary-toned-500">Require password</span>
					</div>

					<input
						id="test-password"
						type="text"
						disabled={examConfigPersist.password === null || examConfigPersist.password === undefined}
						placeholder="Enter password"
						className={`w-1/3 h-fit border rounded-md focus:outline-none focus:ring px-4 py-2 ${examConfigPersist.password === null || examConfigPersist.password === undefined
							? "bg-gray-200 cursor-not-allowed border-gray-300"
							: errors.password
								? "border-red-500 focus:ring-red-300"
								: "border-primary focus:ring-teal-300"
							}`}
						value={examConfigPersist.password || ""}
						onChange={(e) => {
							if (examConfigPersist.password !== null && examConfigPersist.password !== undefined) {
								onFieldChange('password', e.target.value);
							}
						}}
					/>
				</div>
				{errors.password && (
					<p className="text-red-500 text-sm">{errors.password}</p>
				)}
			</div>
		</>
	);
}
