import { ExamConfigPersist } from "../../../../../../../infra-test/core/test.model";
import { useStep1Validation } from "./hooks/useStep1Validation";
import BasicInfoFields from "./components/BasicInfoFields";
import DateTimeFields from "./components/DateTimeFields";
import SecurityFields from "./components/SecurityFields";
import SettingsFields from "./components/SettingsFields";

export default function Step1({
	examConfigPersist,
	onExamConfigChange,
	onValidationChange,
}: {
	examConfigPersist: ExamConfigPersist;
	onExamConfigChange: (config: Partial<ExamConfigPersist>) => void;
	onValidationChange?: (isValid: boolean) => void;
}) {
	const { errors, clearFieldError } = useStep1Validation(examConfigPersist, onValidationChange);

	const handleFieldChange = (field: keyof ExamConfigPersist, value: any) => {
		onExamConfigChange({ [field]: value });
		clearFieldError(field as keyof typeof errors);
	}; return (
		<div className="text-base [&>label]:text-primary [&>label]:font-semibold w-full h-full overflow-y-auto grid grid-cols-[auto_1fr] items-center place-items-end gap-y-6 gap-x-8 p-6">
			<div className="col-span-2 mb-4">
				<h2 className="text-2xl font-bold text-primary mb-2">Basic Configuration</h2>
				<p className="text-sm text-gray-600">
					Please fill in all required fields marked with <span className="text-red-500">*</span> to proceed to the next step.
				</p>
			</div>
			<div className="col-span-2 border-b border-primary-toned-300 w-full" />

			<BasicInfoFields
				examConfigPersist={examConfigPersist}
				onFieldChange={handleFieldChange}
				errors={errors}
			/>

			<div className="col-span-2 border-b border-primary-toned-300 w-full" />

			<DateTimeFields
				examConfigPersist={examConfigPersist}
				onFieldChange={handleFieldChange}
				errors={errors}
			/>

			<SecurityFields
				examConfigPersist={examConfigPersist}
				onFieldChange={handleFieldChange}
				errors={errors}
			/>

			<SettingsFields
				examConfigPersist={examConfigPersist}
				onExamConfigChange={onExamConfigChange}
			/>

			<div className="col-span-2 border-b border-primary-toned-300 w-full" />
		</div>
	)
}
