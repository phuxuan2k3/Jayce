import { ExamConfigPersist } from "../../../../../../../../infra-test/core/test.model";
import { ValidationErrors } from "../hooks/useStep1Validation";

interface DateTimeFieldsProps {
	examConfigPersist: ExamConfigPersist;
	onFieldChange: (field: keyof ExamConfigPersist, value: any) => void;
	errors: ValidationErrors;
}

export default function DateTimeFields({ examConfigPersist, onFieldChange, errors }: DateTimeFieldsProps) {
	return (
		<>
			<label htmlFor="test-open-at">
				Open time: <span className="text-red-500">*</span>
			</label>
			<div className="flex flex-col gap-2 w-full">
				<div className="flex items-center gap-x-4 w-full">
					<div className="flex items-center gap-x-2">
						<span className="text-sm text-primary-toned-500">From:</span>
						<input
							id="test-open-at"
							type="datetime-local"
							className={`w-full h-fit border rounded-md focus:outline-none focus:ring px-4 py-2 ${errors.openDate
								? 'border-red-500 focus:ring-red-300'
								: 'border-primary focus:ring-teal-300'
								}`}
							value={examConfigPersist.openDate.toISOString().slice(0, 16)}
							onChange={(e) => {
								const date = new Date(e.target.value);
								onFieldChange('openDate', date);
							}}
						/>
					</div>
					<div className="flex items-center gap-x-2">
						<span className="text-sm text-primary-toned-500">To:</span>
						<input
							id="test-close-at"
							type="datetime-local"
							className={`w-full h-fit border rounded-md focus:outline-none focus:ring px-4 py-2 ${errors.closeDate
								? 'border-red-500 focus:ring-red-300'
								: 'border-primary focus:ring-teal-300'
								}`}
							value={examConfigPersist.closeDate.toISOString().slice(0, 16)}
							onChange={(e) => {
								const date = new Date(e.target.value);
								onFieldChange('closeDate', date);
							}}
						/>
					</div>
				</div>
				{(errors.openDate || errors.closeDate) && (
					<div className="text-red-500 text-sm">
						{errors.openDate && <p>{errors.openDate}</p>}
						{errors.closeDate && <p>{errors.closeDate}</p>}
					</div>
				)}
			</div>
		</>
	);
}
