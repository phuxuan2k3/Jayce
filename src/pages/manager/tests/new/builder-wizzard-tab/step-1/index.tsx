import { BuilderStep1Type } from "../../common/step-schema";
import { LanguagesAsConst, LanguageType } from "../../common/base-schema";
import MyLabel from "../../../../../../features/tests/ui/forms/MyLabel";
import MyFieldLayout from "../../../../../../features/tests/ui/forms/MyFieldLayout";
import MyInput from "../../../../../../features/tests/ui/forms/MyInput";
import MyTextArea from "../../../../../../features/tests/ui/forms/MyTextArea";
import MySelect from "../../../../../../features/tests/ui/forms/MySelect";

export default function Step1({
	data,
	onDataChange,
}: {
	data: BuilderStep1Type;
	onDataChange: (data: BuilderStep1Type) => void;
}) {
	return (
		<div className="text-base w-full h-full flex flex-col gap-4">

			<MyFieldLayout>
				<MyLabel htmlFor="test-title">Title:</MyLabel>
				<MyInput
					id="test-title"
					name="title"
					aria-label="Test Title"
					value={data.title}
					onChange={(e) =>
						onDataChange({
							...data,
							title: e.target.value,
						})
					}
					placeholder="Title"
				/>
			</MyFieldLayout>

			<MyFieldLayout>
				<MyLabel htmlFor="test-description">
					Description:
				</MyLabel>
				<MyTextArea
					id="test-description"
					isAutoSized={false}
					name="description"
					aria-label="Test Description"
					rows={3}
					placeholder="Describe your test"
					value={data.description}
					onChange={(e) =>
						onDataChange({
							...data,
							description: e.target.value,
						})
					}
				/>
			</MyFieldLayout>

			<MyFieldLayout>
				<MyLabel htmlFor="test-language">Language:</MyLabel>
				<MySelect
					options={LanguagesAsConst.map((lang) => ({
						value: lang,
						label: lang,
					}))}
					id="test-language"
					aria-label="Test Language"
					name="language"
					value={data.language}
					onChange={(e) =>
						onDataChange({
							...data,
							language: e as LanguageType || "English",
						})
					}
				/>
			</MyFieldLayout>
		</div>
	);
}
