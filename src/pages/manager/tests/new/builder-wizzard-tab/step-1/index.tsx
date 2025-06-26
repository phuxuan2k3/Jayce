import { cn } from "../../../../../../app/cn";
import TextareaAutosize from "react-textarea-autosize";
import { classNameInput } from "../../common/classname";
import { BuilderStep1Type } from "../utils/step-schema";
import { LanguagesAsConst, LanguageType } from "../utils/base-schema";

export default function Step1({
	data,
	onDataChange,
}: {
	data: BuilderStep1Type;
	onDataChange: (data: BuilderStep1Type) => void;
}) {
	return (
		<div className="text-base [&>label]:text-primary [&>label]:font-semibold w-full h-full overflow-y-auto grid grid-cols-[auto_1fr] items-center place-items-end gap-y-6 gap-x-8 p-6">
			<label htmlFor="test-title">
				Title: <span className="text-red-500">*</span>
			</label>
			<div className="w-full">
				<input
					id="test-title"
					type="text"
					placeholder="Title"
					className={cn(classNameInput)}
					value={data.title}
					onChange={(e) =>
						onDataChange({
							...data,
							title: e.target.value,
						})
					}
				/>
			</div>
			<label htmlFor="test-description" className="self-start mt-2">
				Description: <span className="text-red-500">*</span>
			</label>
			<div className="w-full">
				<TextareaAutosize
					id="test-description"
					minRows={1}
					placeholder="Describe your test"
					className={cn(classNameInput)}
					value={data.description}
					onChange={(e) =>
						onDataChange({
							...data,
							description: e.target.value,
						})
					}
				/>
			</div>

			<label htmlFor="test-language">
				Language: <span className="text-red-500">*</span>
			</label>
			<div className="w-full">
				<select
					id="test-language"
					className={cn(classNameInput)}
					value={data.language}
					onChange={(e) =>
						onDataChange({
							...data,
							language: e.target.value as LanguageType,
						})
					}
				>
					{LanguagesAsConst.map((lang) => (
						<option key={lang} value={lang}>
							{lang}
						</option>
					))}
				</select>
			</div>

			<div className="px-6">
				<div className="mt-8 p-4 bg-primary-toned-50 border border-primary-toned-200 rounded-lg">
					<h4 className="text-sm font-semibold text-primary-toned-800 mb-2">Tips:</h4>
					<ul className="text-sm text-primary-toned-700 space-y-1">
						<li>• Choose a clear, descriptive title that reflects the purpose of your test</li>
						<li>• Provide a detailed description to help candidates understand what the test covers</li>
						<li>• Select the appropriate language and seniority level to match your target audience</li>
						<li>• Consider the experience level you're testing for when setting the seniority level</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
