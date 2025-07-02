import { cn } from "../../../../../../app/cn";
import TextareaAutosize from "react-textarea-autosize";
import { classNameInput } from "../../common/class-names";
import { BuilderStep1Type } from "../../common/step-schema";
import { LanguagesAsConst, LanguageType } from "../../common/base-schema";

export default function Step1({
	data,
	onDataChange,
}: {
	data: BuilderStep1Type;
	onDataChange: (data: BuilderStep1Type) => void;
}) {
	return (
		<div className="text-base w-full h-full flex flex-col gap-4">

			<div className="flex flex-col gap-2">
				<label htmlFor="test-title" className="font-semibold text-primary">
					Title: <span className="text-red-500">*</span>
				</label>
				<div className="w-full">
					<input
						id="test-title"
						name="title"
						aria-label="Test Title"
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
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="test-description" className="font-semibold text-primary">
					Description: <span className="text-red-500">*</span>
				</label>
				<div className="w-full">
					<TextareaAutosize
						id="test-description"
						name="description"
						aria-label="Test Description"
						rows={3}
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
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="test-language" className="font-semibold text-primary">
					Language: <span className="text-red-500">*</span>
				</label>
				<div className="w-full">
					<select
						id="test-language"
						name="language"
						aria-label="Test Language"
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
			</div>

		</div>
	);
}
