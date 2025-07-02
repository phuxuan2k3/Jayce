import { ExamPersistCoreSchema } from "../../../../ui-items/test/types";
import MyLabel from "../../../../ui/forms/MyLabel";
import MyInput from "../../../../ui/forms/MyInput";
import MyTextArea from "../../../../ui/forms/MyTextArea";
import MyFieldLayout from "../../../../ui/forms/MyFieldLayout";
import MyDescription from "../../../../ui/forms/MyDescription";

export function InformationSection({
	title,
	description,
	minutesToAnswer,
	language,
	onChange,
}: {
	title: string;
	description: string;
	minutesToAnswer: number;
	language: string;
	onChange: (patch: Partial<Pick<ExamPersistCoreSchema, "title" | "description" | "minutesToAnswer" | "language">>) => void;
}) {
	return (
		<div className="flex flex-col gap-y-4 w-full">
			<MyFieldLayout>
				<MyLabel htmlFor="test-title">Title:</MyLabel>
				<MyInput
					id="test-title"
					type="text"
					placeholder="Title"
					className=""
					value={title}
					onChange={e => onChange({ title: e.target.value })}
				/>
			</MyFieldLayout>
			<MyFieldLayout>
				<MyLabel htmlFor="test-description">Description:</MyLabel>
				<MyTextArea
					id="test-description"
					placeholder="Describe your test"
					value={description}
					onChange={e => onChange({ description: e.target.value })}
				/>
			</MyFieldLayout>
			<div className="flex items-start gap-8 mt-4">
				<MyFieldLayout className="flex-1">
					<MyLabel htmlFor="test-duration">Duration:</MyLabel>
					<MyInput
						id="test-duration"
						type="number"
						placeholder="Enter duration"
						value={minutesToAnswer}
						onChange={e => onChange({ minutesToAnswer: Number(e.target.value) || 1 })}
					/>
					<MyDescription text="Time in minutes" />
				</MyFieldLayout>
				<MyFieldLayout className="flex-1">
					<MyLabel htmlFor="test-language">Language:</MyLabel>
					<MyInput
						id="test-language"
						type="text"
						placeholder="Language"
						value={language}
						onChange={e => onChange({ language: e.target.value })}
					/>
					<MyDescription text="Language of the exam" />
				</MyFieldLayout>
			</div>
		</div>
	);
}
