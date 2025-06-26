import TextareaAutosize from "react-textarea-autosize";
import { ExamPersistCore } from "../../../../../../infra-test/ui-items/test/types";

export function TitleDescriptionSection({
	title,
	description,
	onChange,
}: {
	title: string;
	description: string;
	onChange: (patch: Partial<Pick<ExamPersistCore, "title" | "description">>) => void;
}) {
	return (
		<>
			<label htmlFor="test-title">Title:</label>
			<input
				id="test-title"
				type="text"
				placeholder="Title"
				className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
				value={title}
				onChange={e => onChange({ title: e.target.value })}
			/>
			<label htmlFor="test-description" className="self-start mt-2">Description:</label>
			<TextareaAutosize
				id="test-description"
				minRows={1}
				placeholder="Describe your test"
				className="w-full h-fit border border-primary rounded-md focus:outline-none focus:ring focus:ring-teal-300 px-4 py-2"
				value={description}
				onChange={e => onChange({ description: e.target.value })}
			/>
		</>
	);
}
