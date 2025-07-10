import { ExamPersistCoreSchema } from "../../../../../../../../features/tests/ui-items/test/types";
import MyDescription from "../../../../../../../../features/tests/ui/forms/MyDescription";
import MyFieldLayout from "../../../../../../../../features/tests/ui/forms/MyFieldLayout";
import MyInput from "../../../../../../../../features/tests/ui/forms/MyInput";
import MyLabel from "../../../../../../../../features/tests/ui/forms/MyLabel";
import MyNumberInput from "../../../../../../../../features/tests/ui/forms/MyNumberInput";
import MySelect from "../../../../../../../../features/tests/ui/forms/MySelect";
import MyTextArea from "../../../../../../../../features/tests/ui/forms/MyTextArea";
import { LanguagesAsConst, LanguageType } from "../../../../../new/common/base-schema";

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
					<MyNumberInput
						id="test-duration"
						placeholder="Enter duration"
						value={minutesToAnswer}
						onChange={e => onChange({ minutesToAnswer: Number(e.target.value) || 1 })}
						min={1}
					/>
					<MyDescription text="Time in minutes" />
				</MyFieldLayout>
				<MyFieldLayout className="flex-1">
					<MyLabel htmlFor="test-language">Language:</MyLabel>
					<MySelect
						id="test-language"
						placeholder="Language"
						value={language}
						options={LanguagesAsConst.map(lang => ({
							value: lang,
							label: lang,
						}))}
						onChange={(value) => onChange({ language: value as LanguageType || "English" })}
					/>
					<MyDescription text="Language of the exam" />
				</MyFieldLayout>
			</div>
		</div>
	);
}
