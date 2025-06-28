import { ExamPersistCoreSchema } from "../../../ui-items/test/types";

export function LanguageSection({
	language,
	onChange,
}: {
	language: string;
	onChange: (patch: Partial<Pick<ExamPersistCoreSchema, "language">>) => void;
}) {
	return (
		<>
			<label htmlFor="test-language">Language:</label>
			<input
				id="test-language"
				type="text"
				placeholder="Language"
				className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
				value={language}
				onChange={e => onChange({ language: e.target.value })}
			/>
		</>
	);
}
